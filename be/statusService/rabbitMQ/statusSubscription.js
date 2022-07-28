// import amqp from 'amqplib/callback_api.js'
import amqp from 'amqplib'

// working on port 8082
// connecting to RabbitMQ
// amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/', function connectRabbit(err0, connection) {
//     if (err0) {
//         console.log('error at connection: ', err0);
//         connectRabbit(err, connection)
//         // throw err;
//     }
//     connection.createChannel(function connect(err1, channel) {
//         if (err1) {
//             console.log('fail to connect to chanel: ', err1);
//             connect(err, channel)
//         }
//         else {
//             let status = 'Status'

//             // subscribing to Status  exchange
//             channel.assertExchange(status, 'direct', {
//                 durable: false
//             })
//             // Status lisening queue
//             channel.assertQueue('StatusQueue', {
//                 exclusive: true
//             }, function (error2, q) {
//                 if (error2) {
//                     throw error2;
//                 }
//                 console.log(`Status Waiting for messages in ${q.queue}`);

//                 channel.bindQueue(q.queue, status, '')

//                 channel.consume(q.queue, function (msg) {

//                     if (msg.content) {
//                         let status = JSON.parse(msg.content.toString())
//                         // console.log('recieved mesege from status');
//                         // console.log(status.Payload);
//                         global.io.emit("statusEmiter", JSON.parse(status.Payload))
//                         // console.log(JSON.parse(status.Payload));
//                     }
//                 }, {
//                     noAck: true
//                 });

//             })
//         }
//     });
// });



async function consumeStatus() {
    const status = 'Status'

    const connection = await amqp.connect('amqp://admin:Aa123456@10.0.0.92:5672/');

    const channel = await connection.createChannel()

    connection.on('error', (err) => {
        console.log("Generated event 'error': " + err);
    })

    connection.on('close', function () {
        console.log("Connection closed.");
        // process.exit();
        process.disconnect()
        // consumeStatus()
        return
    });


    await channel.assertExchange(status, 'direct', {
        durable: false
    })

    const q = await channel.assertQueue('StatusQueue', {
        exclusive: true
    });
    console.log(`EventsReport Waiting for messages in ${q.queue}`);

    await channel.bindQueue(q.queue, status, "");

    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            let event = JSON.parse(msg.content.toString());
            global.io.emit("statusEmiter", JSON.parse(event.Payload))
            // console.log(event);
            channel.ack(msg);
        }
    });
}

consumeStatus();