# go-get-stars-and-prs
Web application displaying the most popular GitHub repositories and my pull requests.

You might need to install Go if you haven't already. More information on installation can be found here: https://golang.org/doc/install

You might need to create a personal access token to use the GitHub API if you haven't already. More information on creating one can be found here: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

After creating an access token from GitHub, save it to the GITHUB\_ACCESS\_TOKEN variable in github.env file (found in `back-end`). Set this as an environment variable by running the following:
```
for line in $(cat github.env)
do
export $line
done
```

## Back-end
### Navigate to the `back-end` directory and run the following command:
```
go run main.go
```
The server is running at localhost:8081

## Front-end
### From the root directory you can run the following commands:
```
npm install

npm run start
```
The app should open up on your browser and is running at localhost:8080