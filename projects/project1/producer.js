const { Kafka } = require('kafkajs');

createProducer();

async function createProducer() {
    try {
        // Admin stuffs
        const kafka = new Kafka({
            clientId: "client_project_1",
            brokers: ["192.168.1.124:9092"]
        })

        const producer = kafka.producer();
        console.log("Producer'a bağlanılıyor...");
        await producer.connect();
        console.log("Producer'a bağlantı başarılı bir şekilde gerçekleşti...");

        const messageResult = await producer.send({
            topic: "Logs",
            messages: [
                {
                    value: "Bu bir test Log mesajıdır",
                    partition: 0
                }
            ]
        });
        console.log("GÖnderim işlemi başarılı bir şekilde gerçekleşti :)", JSON.stringify(messageResult));
        await producer.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu: ", error);
    } finally {
        process.exit(0);
    }
}