# weather-zylo

# Testing

1. Follow setup in [Running Everything](#running-everything)
2.
```
  echo 'BASE_URL=http://localhost:3001' > .env # for testing purposes
  yarn test
```


# Running everything

1. follow .env setup in node/README.md
2. install Docker and Node
3.
```
  echo 'GOOGLEMAPS_API_KEY=<YOUR_API_KEY>' > node/.env
  echo 'PORT=3001' >> node/.env
  docker run -p 6379:6379 -d redis
  npm i -g pm2
  pm2 start process.yml
  pm2 logs
```
