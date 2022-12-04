const amqp = require("amqplib");

var channel, connection;
exports.connectQueue = async() => {   
    try {
        connection = await amqp.connect(process.env.RABBIT_MQ_URL);
        channel    = await connection.createChannel()
        
        await channel.assertQueue("customer_ms_queue")
        console.log('RABBIT_MQ CONNECTION ESTABLISHED')
    } catch (error) {
        console.log(error)
    }
}

exports.sendData = async(data) => {
    // send data to queue
    await channel.sendToQueue("customer_ms_queue", Buffer.from(JSON.stringify(data)));
        console.log('Customer Sent to Queue')
    // close the channel and connection
    await channel.close();
    await connection.close(); 
    this.connectQueue()
}