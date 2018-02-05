# go-get-stars-and-prs
Web application displaying the most popular GitHub repositories and my pull requests

After getting an access token from GitHub, save it to the GITHUB\_ACCESS\_TOKEN variable in github.env file (found in `back-end`) and you can set this as an environment variable by running the following:
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
### From the root directory you can run the following command:
```
npm run start
```
The app should open up on your browser and is running at localhost:8080