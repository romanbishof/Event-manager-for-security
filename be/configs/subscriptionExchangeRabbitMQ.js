import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'
import amqp from 'amqplib/callback_api.js'


// connecting to RabbitMQ
amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function (err, connection) {
    if (err) {
        throw err;
    }
    connection.createChannel(function connect(err, channel) {
        if (err) {
            console.log('fail to connect to chanel ');
            connect(err, channel)
        }
        else {
            let devices = 'ComponentConfigurationAdd'
            let events = 'EventsReport'
            let status = 'Status'

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

            // subscribing to EventsReport exchange
            channel.assertExchange(events, 'direct', {
                durable: false
            })
            // EventsReport lisening queue
            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(`EventsReport Waiting for messages in ${q.queue}`);

                channel.bindQueue(q.queue, events, '')

                channel.consume(q.queue, function (msg) {
                    if (msg.content) {
                        let event = JSON.parse(msg.content.toString())
                        // console.log('recieved mesege from event');
                        // console.log(event.Payload);
                        global.io.emit("eventEmiter", JSON.parse(event.Payload))

                    }
                }, {
                    noAck: true
                });

            })

            // subscribing to Status  exchange
            channel.assertExchange(status, 'direct', {
                durable: false
            })
            // Status lisening queue
            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(`Status Waiting for messages in ${q.queue}`);

                channel.bindQueue(q.queue, status, '')

                channel.consume(q.queue, function (msg) {

                    if (msg.content) {
                        let status = JSON.parse(msg.content.toString())
                        // console.log('recieved mesege from status');
                        // console.log(status.Payload);
                        global.io.emit("statusEmiter", JSON.parse(status.Payload))
                        // console.log(JSON.parse(status.Payload));

                    }
                }, {
                    noAck: true
                });

            })
        }
    });
});