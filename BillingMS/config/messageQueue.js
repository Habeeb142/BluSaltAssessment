const amqp = require("amqplib");

var channel, connection;
exports.connectQueue = async() => {   
    try {
        connection = await amqp.connect(process.env.RABBIT_MQ_URL);
        channel    = await connection.createChannel()
        
        await channel.assertQueue("billing_worker_ms_queue")
        console.log('RABBIT_MQ CONNECTION ESTABLISHED')
    } catch (error) {
        console.log(error)
    }
}

exports.sendData = async(data) => {
    // send data to queue
    await channel.sendToQueue("billing_ms_queue", Buffer.from(JSON.stringify(data)));
        console.log('Billing Data Sent to Queue')
    // close the channel and connection
    await channel.close();
    await connection.close(); 
}

exports.consumeDataCustomer = async(ms) => {
    var data = '';
    // send data to queue
    await channel.consume(ms, dat => {
        data = `${Buffer.from(dat.content)}`
        channel.ack(dat);
    })
   
    await channel.close();
    await connection.close(); 
    this.connectQueue()
    return data
}

exports.consumeDataBilling = async(ms) => {
    var data = '';
    // send data to queue
    await channel.consume(ms, dat => {
        data = `${Buffer.from(dat.content)}`
        channel.ack(dat);
    })
   
    // await channel.close();
    // await connection.close(); 
    // this.connectQueue()
    return data
}