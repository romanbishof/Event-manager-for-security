import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'
import amqp from 'amqplib/callback_api.js'

amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function (err, connection) {
    if (err) {
        throw err;
    }
    connection.createChannel(function (err, channel) {
        if (err) {
            throw err;
        }

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
            console.log("ComponentConfigurationAdd Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, devices, '');

            // get data from queue
            channel.consume(q.queue, async function (msg) {

                if (msg.content) {
                    let devicesInDB = await integrationDevicesBL.getAllIntegrationDevices()
                    let queueFromRabbitMQ = JSON.parse(msg.content.toString())
                    let dataFromRabbitMQ = JSON.parse(queueFromRabbitMQ.Payload)
                    let newDevice = devicesInDB.concat(dataFromRabbitMQ.filter(deviceRMQ => devicesInDB.every(deviceDB => deviceDB.Id !== deviceRMQ.Id)))
                    newDevice.forEach(async (device) => {
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
                }
            }, {
                noAck: true
            });

        })

    });
});