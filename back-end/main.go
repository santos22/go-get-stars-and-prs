package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// Access token variable used in the main function
var (
	accessToken = getenv("GITHUB_ACCESS_TOKEN")
)

// App struct to hold GitHub client fields
type App struct {
	client *github.Client
	ctx    context.Context
}

// PullRequest struct to hold information for pull requests
type PullRequest struct {
	Comments *int           `json:"comments"`
	ClosedAt string         `json:"closed_at"`
	HTMLURL  *string        `json:"html_url"`
	State    *string        `json:"state"`
	Title    *string        `json:"title"`
	Labels   []github.Label `json:"label"`
}

// Repository struct to hold information for popular repositories
type Repository struct {
	StargazerCount *int    `json:"stargazers_count"`
	AvatarURL      *string `json:"avatar_url"`
	HTMLURL        *string `json:"html_url"`
	Login          *string `json:"login"`
	Name           *string `json:"name"`
}

// Retrieve GitHub access token stored as environment variable
func getenv(name string) string {
	v := os.Getenv(name)
	if v == "" {
		panic("missing required environment variable " + name)
	}
	return v
}

// Root endpoint
func (app *App) handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Howdy! Visit one of the two routes: /popular or /closed")
}

// TODO Call this endpoint from React app
// Popular GitHub repositories endpoint
func (app *App) popularRepos(w http.ResponseWriter, r *http.Request) {
	// Sort search results
	opts := &github.SearchOptions{Sort: "stars", Order: "desc"}

	// Search for popular GitHub repositories
	repos, _, err := app.client.Search.Repositories(app.ctx, "stars:>1 language:go", opts)
	if err != nil {
		log.Fatal(err)
	}

	// Slice to store JSON array of Repository structs
	repositories := make([]Repository, 0)
	for _, repo := range repos.Repositories {
		repository := &Repository{
			StargazerCount: repo.StargazersCount,
			AvatarURL:      repo.Owner.AvatarURL,
			HTMLURL:        repo.HTMLURL,
			Login:          repo.Owner.Login,
			Name:           repo.Name,
		}
		repositories = append(repositories, *repository)
	}

	// Set headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	// Encode JSON data to send to requester
	data, _ := json.Marshal(repositories)
	w.Write(data)
}

// Closed pull requests endpoint
func (app *App) closedPullRequests(w http.ResponseWriter, r *http.Request) {
	// Sort search results
	opts := &github.SearchOptions{Sort: "created", Order: "asc"}

	// Search for GitHub issues
	issues, _, err := app.client.Search.Issues(app.ctx, "state:closed author:santos22 type:pr", opts)
	if err != nil {
		log.Fatal(err)
	}

	// Slice to store JSON array of PullRequest structs
	pullRequests := make([]PullRequest, 0)
	for _, issue := range issues.Issues {
		pullRequest := &PullRequest{
			Comments: issue.Comments,
			ClosedAt: issue.ClosedAt.Format("Jan 2, 2006"),
			HTMLURL:  issue.HTMLURL,
			State:    issue.State,
			Title:    issue.Title,
			Labels:   issue.Labels,
		}
		pullRequests = append(pullRequests, *pullRequest)
	}

	// Set headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)

	// Encode JSON data to send to requester
	data, _ := json.Marshal(pullRequests)
	w.Write(data)
}

func main() {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: accessToken},
	)
	// Authentication
	tc := oauth2.NewClient(ctx, ts)

	// Construct a new GitHub API client
	client := github.NewClient(tc)
	app := &App{ctx: ctx, client: client}

	// HandleFunc registers handler functions that serve requests
	http.HandleFunc("/", app.handler)
	http.HandleFunc("/closed", app.closedPullRequests)
	http.HandleFunc("/popular", app.popularRepos)

	// Listen on port 8081 for requests
	http.ListenAndServe(":8081", nil)
}
