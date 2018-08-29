const Confidence = require('confidence');

const criteria = {
    env: process.env.NODE_ENV || 'api'
};

const config = {
    slack: {
        username: process.env.SLACK_USERNAME || 'Docker Hub',
        color: process.env.SLACK_COLOR || '#0576b9',
        icon: process.env.SLACK_ICON || ':whale:',
    }
};

const store = new Confidence.Store(config);

exports.get = (key) => {

    return store.get(key, criteria);
};
