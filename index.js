import client from 'amqplib'

// send message to queue
const sendMessage = (channel) => {
    for (let i = 0; i < 10; i++) {
        channel.sendToQueue('myQueue', Buffer.from(`Hello World ${i}`))
    }
}

// consume message from queue
const consumeMessage = (channel) => {
    channel.consume('myQueue', (msg) => {
        console.log(msg.content.toString())
        channel.ack(msg)
    })
}

const main = async () => {
// Connect to RabbitMQ
const connection = await client.connect('amqp://username:password@localhost:5672');

// create a channel
const channel = await connection.createChannel();

// create a queue
await channel.assertQueue('myQueue');

// publish a message
// channel.sendToQueue('myQueue', Buffer.from('Hello World'));

// consume message from queue
// consumeMessage(channel)
sendMessage(channel)

await channel.consume('myQueue', consumeMessage(channel))
}

main()
