const amqplib = require('amqplib/callback_api');
const queue = 'letter-box';

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;

    // Sender
    conn.createChannel((err, ch1) => {
        if (err) throw err;

        console.log('Start push message to exchange')

        ch1.assertQueue(queue);

        setInterval(() => {
            const numberRan = Math.ceil(Math.random() * 10);
            ch1.sendToQueue(queue, Buffer.from('Something to do ' + numberRan));
        }, 1000);
    });
});