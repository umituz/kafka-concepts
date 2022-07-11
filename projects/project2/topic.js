const { Kafka } = require('kafkajs');

createTopic();

async function createTopic() {
    try {
        // Admin stuffs
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.124:9092"]
        })

        const admin = kafka.admin();
        console.log("Kafka broker'a bağlanılıyor...");
        await admin.connect();
        console.log("Kafka broker'a bağlandı. Birazdan Topic üretilecek...");
        await admin.createTopics({
            topics: [
                {
                    topic: "LogStoreTopic",
                    numPartitions: 2
                }
            ]
        });
        console.log("Topic başarılı bir şekilde oluşturulmuştur :)");
        await admin.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu: ", error);
    } finally {
        process.exit(0);
    }
}