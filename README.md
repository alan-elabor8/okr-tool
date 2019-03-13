## About
This is a basic forms demo built using React. The application demonstrates how React components can be used to construct forms. The components in the demonstration are reusable.
To install the demo, you will need to
1. Clone the repo
2. Install the dependencies by running `yarn`.
3. Start the server: `yarn start`
4. Happy hacking!

## Start json DB server
```json-server --watch db.json --port 8080```

## Run Docker json DB server
```sudo docker run -d -p 80:80 -v /home/ec2-user/jsonserver/docker-json-server/data.json:/data/db.json clue/json-server```
