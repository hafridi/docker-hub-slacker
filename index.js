'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const Wreck = require('wreck');
const Config = require('./config');

const server= Hapi.server(
    {
        host: '0.0.0.0',
        port: 8080
    }
);

server.route({
    method:'POST',
    path:'/services/{variableT}/{variableB}/{variableX}',
    handler: async (request,h) => {

        try {

            const options = {
                json: true,
                payload: {
                    username: Config.get('/slack/username'),
                    icon_emoji: Config.get('/slack/icon'),
                    attachments: [
                        {
                            fallback: `${request.payload.repository.repo_name}`,
                            color: Config.get('/slack/color'),
                            title: `${request.payload.repository.repo_name}`,
                            title_link: request.payload.repository.repo_url,
                            text: `<!channel>`,
                            fields: [
                                {
                                    title: 'Tag',
                                    value: request.payload.push_data.tag,
                                    short: true
                                },
                                {
                                    title: 'Pusher',
                                    value: request.payload.push_data.pusher,
                                    short: true
                                }
                            ],
                            footer: 'Posted via Docker Hub Slack',
                            ts: new Date().getTime()/1000
                        }
                    ]
                }
            }

            const { res, payload } = await Wreck.post(`https://hooks.slack.com/services/${request.params.variableT}/${request.params.variableB}/${request.params.variableX}`, options);
            return payload;
        } catch (err) {
            throw Boom.boomify(err, { statusCode: err.statusCode, message: err.message });
        }
    }
});

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Docker Hub Slacker Online:', server.info.uri);
};

start();