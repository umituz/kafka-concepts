const { Kafka } = require('kafkajs');
const topicName = process.argv[2] || "Logs"

createConsumer();

async function createConsumer() {
    try {
        // Admin stuffs
        const kafka = new Kafka({
            clientId: "client_project_1",
            brokers: ["192.168.1.124:9092"]
        })

        const consumer = kafka.consumer({
            groupId: "project_1_group"
        });
        console.log("Consumer'a bağlanılıyor...");
        await consumer.connect();
        console.log("Consumer'a bağlantı başarılı bir şekilde gerçekleşti...");

        // Consumer subscribe
        await consumer.subscribe({
            topic: topicName,
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