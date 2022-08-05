import { SNS } from "aws-sdk";
export const sendNotification = () => {
    const sns = new SNS({ region: "eu-west-1" });
    return new Promise((resolve, reject) => {
        sns.publish(
            {
                Subject: "New products",
                Message: "Added new products to database",
                TopicArn: process.env.SNS_URL,
            },
            (err, data) => {
                if (err) {
                    console.log("Something went wrong", err);
                    reject(err);
                }
                console.log("Message sent succesfully");
                resolve(data);
            }
        );
    });
};
