const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const main = async () => {
  try {
    const command = new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id: {
          S: `https://github.com/${process.env.GITHUB_REPOSITORY}/pull/${process.env.PULL_REQUEST_NUMBER}`,
        },
        processed: {
          BOOL: false,
        },
        url: {
          S: `https://serverlessland.com/patterns/cdk-closed-loop-serverless-control`,
        },
      },
    });
    const response = await client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
    console.log('Failed to save PR into DDB');
  }

};

main();
