// import amqp from 'amqplib/callback_api.js'
import amqp from 'amqplib'

// working on port 8081
// connecting to RabbitMQ
// amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function connectRabbit(err0, connection) {
//     if (err0) {
//         console.log('error at connection: ', err0);
//         connectRabbit(err, connection)
//         // throw err0;
//     }
//     connection.createChannel(function connect(err1, channel) {
//         if (err1) {
//             console.log('fail to connect to chanel: ', err1);
//             connect(err, channel)
//             // throw err1
//         }
//         else {
//             let events = 'EventsReport'

//             // subscribing to EventsReport exchange
//             channel.assertExchange(events, 'direct', {
//                 durable: false
//             })
//             // EventsReport lisening queue
//             channel.assertQueue('EventQueue', {
//                 exclusive: true
//             }, function (error2, q) {
//                 if (error2) {
//                     throw error2;
//                 }
//                 console.log(`EventsReport Waiting for messages in ${q.queue}`);

//                 channel.bindQueue(q.queue, events, '')

//                 channel.consume(q.queue, function (msg) {
//                     if (msg.content) {
//                         let event = JSON.parse(msg.content.toString())
//                         // console.log('recieved mesege from event');
//                         // console.log(event.Payload);
//                         global.io.emit("eventEmiter", JSON.parse(event.Payload))
//                         // console.log(JSON.parse(event.Payload));

//                     }
//                 }, {
//                     noAck: true
//                 });

//             })
//         }
//     });
// });

async function consumeEvent() {
    const events = 'EventsReport'

    const connection = await amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/');

    const channel = await connection.createChannel()

    connection.on('error', (err) => {
        console.log("Generated event 'error': " + err);
    })

    connection.on('close', function () {
        console.log("Connection closed.");
        process.exit();
    });


    await channel.assertExchange(events, 'direct', {
        durable: false
    })

    const q = await channel.assertQueue('EventQueue', {
        exclusive: true
    });
    console.log(`EventsReport Waiting for messages in ${q.queue}`);

    await channel.bindQueue(q.queue, events, "");

    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            let event = JSON.parse(msg.content.toString());
            global.io.emit("eventEmiter", JSON.parse(event.Payload))
            // console.log(event);
            channel.ack(msg);
        }
    });
}

consumeEvent();