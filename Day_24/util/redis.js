const {createClient}=require('redis');

const RedisClient = createClient({
    username: 'default',
    password: 'J71q940owRCMgjOE4qYjPBJLWySICHqg',
    socket: {
        host: 'redis-10154.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 10154
    }
});

module.exports = RedisClient;