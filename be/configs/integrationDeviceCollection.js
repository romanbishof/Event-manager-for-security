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
    });
});