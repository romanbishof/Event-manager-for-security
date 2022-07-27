import amqp from 'amqplib/callback_api.js'
// working on port 8081
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
            let events = 'EventsReport'

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
                        // console.log(JSON.parse(event.Payload));

                    }
                }, {
                    noAck: true
                });

            })
        }
    });
});