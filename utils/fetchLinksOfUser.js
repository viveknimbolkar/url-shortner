import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

// fetch links of a specific user
export default async function fetchLinksOfUser(user_id) {
  if (!user_id) {
    return { error: "User ID is required" };
  }

  try {
    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      ExpressionAttributeNames: {
        "#user_id": "user_id",
      },
      ExpressionAttributeValues: {
        ":user_id": {
          S: user_id,
        },
      },
      KeyConditionExpression: "#user_id = :user_id",
    });
    const result = await dynamodb.send(command);

    if (result && result.$metadata.httpStatusCode === 200) {
      return result.Items;
    }
  } catch (error) {
    return { error: error.message };
  }
}
