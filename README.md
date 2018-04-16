# go-get-stars-and-prs
go get Stars and PRs is a web application that displays the most popular (aka starred) repositories found on GitHub and the pull requests I have submitted. GitHub users can star repositories to keep track of projects they find interesting - stars function like browser bookmarks so it's easy to find them again later. This web application also shows pull requests I have submitted that have either been merged or closed. Pull requests tell others about changes (e.g. fixed a bug, fixed a typo, etc.) you want to make to a repository on GitHub. Sometimes the changes you make are accepted, and your pull request gets merged to the main repository. Other times, the changes you made don't really address an existing issue or aren't required at the time, so your pull request is kindly closed by the project maintainers. I recently started contributing to open-source projects and I wanted a way to show others the work that I've done!

![alt text](https://i.imgur.com/eyXsd06.jpg "Starred screenshot")

![alt text](https://i.imgur.com/hwAQMRV.png "Pull requests screenshot")

## GitHub API
You might need to create a personal access token to use the GitHub API if you haven't already. More information on creating a token can be found here: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

After creating an access token from GitHub, save it to the GITHUB\_ACCESS\_TOKEN variable in github.env file (found in `back-end`). Set this as an environment variable by running the following:
```
for line in $(cat github.env)
do
export $line
done
```

## Back-end
Navigate to the `back-end` directory and run one of the following commands:

Go backend
```
go run main.go
```

Ruby backend
```
ruby server.rb
```
The server is running at localhost:8081

## Front-end
From the root directory you can run the following commands:
```
npm install

npm run start
```
The app should open up on your browser and is running at localhost:8080

## Enhancements
- [ ] Implement caching to limit calls to GitHub API
- [ ] For popular route, call endpoint from Go/Ruby back-end
- [ ] Design UI for pull requests route similar to https://github.com/pulls
