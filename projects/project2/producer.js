const { Kafka } = require('kafkajs');
const logData = require("./system_logs.json")

createProducer();

async function createProducer() {
    try {
        // Admin stuffs
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.124:9092"]
        })

        const producer = kafka.producer();
        console.log("Producer'a bağlanılıyor...");
        await producer.connect();
        console.log("Producer'a bağlantı başarılı bir şekilde gerçekleşti...");

        let messages = logData.map(item => {
            return {
                value: JSON.stringify(item),
                partition: item.type === "system" ? 0 : 1
            }
        });

        const messageResult = await producer.send({
            topic: "LogStoreTopic",
            messages: messages
        });

        console.log("GÖnderim işlemi başarılı bir şekilde gerçekleşti :)", JSON.stringify(messageResult));
        await producer.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu: ", error);
    } finally {
        process.exit(0);
    }
}