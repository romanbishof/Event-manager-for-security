import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'
import amqp from 'amqplib/callback_api.js'

// let DevicesInDB = await integrationDevicesBL.getAllIntegrationDevices()
// console.log(DevicesInDB);

amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function (err, connection) {
    if (err) {
        throw err;
    }
    connection.createChannel(function (err, channel) {
        if (err) {
            throw err;
        }

        let exchange = 'ComponentConfigurationAdd'

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });



        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, async function (msg) {

                if (msg.content) {
                    // console.log(" [x] %s", JSON.parse(msg.content.toString()));
                    let devicesFromRabbitMQ = JSON.parse(msg.content.toString())
                    console.log(devicesFromRabbitMQ);
                }
            }, {
                noAck: true
            });
        });
    });
});