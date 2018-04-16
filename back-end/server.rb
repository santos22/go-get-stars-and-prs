require 'json'
require 'octokit'
require 'sinatra'

ACCESS_TOKEN = ENV['GITHUB_ACCESS_TOKEN']
set :port, 8081

class PullRequest
    attr_accessor :title, :html_url, :closed_at, :comments
  
    def initialize(title, html_url, closed_at, comments)
        @title = title
        @html_url = html_url
        @closed_at = closed_at
        @comments = comments
    end

    def to_json(*pr)
        {
          "title" => @title,
          "html_url" => @html_url,
          "closed_at" => @closed_at,
          "comments" => @comments
        }.to_json(*pr)
    end
end

# method to get closed pull requests
def get_closed_prs(client)
    # search for GitHub issues and sort search results
    pull_requests = client.search_issues("state:closed author:santos22 type:pr", options = {sort: "created", order: "asc"})

    result = pull_requests.to_h
    pr_info = result.to_json
    pr_arr = JSON.parse(pr_info)
    data = pr_arr['items'].map { |pr| PullRequest.new(pr['title'], pr['html_url'], format_date(pr['closed_at']) , pr['comments']) }

    # return response
    headers['Access-Control-Allow-Origin'] = '*'
    content_type :json
    data.to_json
end

def format_date(date)
    Date.parse(date).strftime("%b %d, %Y")
end

# provide authentication credentials
client = Octokit::Client.new(:access_token => ACCESS_TOKEN)

# http://localhost:8081/closed
get '/closed' do
    get_closed_prs(client)
end