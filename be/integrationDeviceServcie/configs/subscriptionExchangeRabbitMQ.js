import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'
import amqp from 'amqplib/callback_api.js'


// connecting to RabbitMQ
amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function connectRabbit(err0, connection) {
    if (err0) {
        console.log('error at connection: ', err0);
        connectRabbit(err, connection)
        // throw err;
    }
    connection.createChannel(function connect(err1, channel) {
        if (err1) {
            console.log('fail to connect to chanel: ', err1);
            connect(err, channel)
        }
        else {
            let devices = 'ComponentConfigurationAdd'

            // subscribing to ComponentsConfigurationAdd exchange
            channel.assertExchange(devices, 'direct', {
                durable: false
            });
            // ComponentsConfigurationAdd lisening queue
            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log("ComponentConfigurationAdd Waiting for messages in %s.", q.queue);
                channel.bindQueue(q.queue, devices, '');

                // get data from queue
                channel.consume(q.queue, async function (msg) {

                    if (msg.content) {
                        let queueFromRabbitMQ = JSON.parse(msg.content.toString())
                        let dataFromRabbitMQ = JSON.parse(queueFromRabbitMQ.Payload)
                        dataFromRabbitMQ.forEach(async (device) => {
                            let temp = await integrationDevicesBL.addIntegrationDevice(device)
                        })
                    }
                }, {
                    noAck: true
                });
            });
        }
    });
});