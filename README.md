# docker-hub-slacker
A tiny app that takes payload from Docker Hub's web hook and passes it forward to a Slack Hook. 

Until docker hub allows for integration with slack natively, this tiny docker container can be a solution.

| Environment Variable | Default | Description |
| ------ | ------ | ------ |
| SLACK_USERNAME | 'Docker Hub' | What is the name for the notification |
| SLACK_COLOR | #0576b9 | What color to show in the slack notifcation |
| SLACK_ICON | :whale: | This overrides the icon for docker hub notifications |

* This application exposes port 8080 from the container.

```sh
docker run -e SLACK_ICON=:monkey_face: -d -p 4000:8080 docker-hub-slacker
```

### How it works
1. Generate an incoming webhook from slacks integration settings 
`https://hooks.slack.com/services/T00000000/B00000000/C00000000000000000000000`
2. Switch the domain from `hooks.slack.com` to `your.domain.com`
3. Create a new webhook on Docker Hub with pointing to this url. e.g. 
`https://your.domain.com/services/T00000000/B00000000/C00000000000000000000000`

* Alternatively you could host the code yourself.

### Inspiration
The inspiration of this project was `https://github.com/neonadventures/slack-docker-hub-integration`. 
This project was written in nodejs and has a very small footprint. 


License
----

MIT