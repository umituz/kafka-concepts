const { Kafka } = require('kafkajs');

createConsumer();

async function createConsumer() {
    try {
        // Admin stuffs
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.124:9092"]
        })

        const consumer = kafka.consumer({
            groupId: "log_store_consumer_group"
        });
        console.log("Consumer'a bağlanılıyor...");
        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı bir şekilde gerçekleşti...");

        // Consumer subscribe
        await consumer.subscribe({
            topic: "LogStoreTopic",
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(`Gelen mesaj ${result.message.value}: partition : => ${result.partition}`);
            }
        });

    } catch (error) {
        console.log("Bir hata oluştu: ", error);
    }
}