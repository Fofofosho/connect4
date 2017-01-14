//rabbitMQ to talk to Dan's end
//https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
const amqp = require('amqplib/callback_api');


function sendInfo (packet) {
    console.log(packet);
}


module.exports = {
    sendInfo : sendInfo,
};