import amqp from 'amqplib/callback_api.js'
// working on port 8082
// connecting to RabbitMQ
amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function (err, connection) {
    if (err) {
        console.log('error at connection');
        throw err;
    }
    connection.createChannel(function connect(err, channel) {
        if (err) {
            console.log('fail to connect to chanel ');
            connect(err, channel)
        }
        else {
            let status = 'Status'

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