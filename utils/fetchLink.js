import { dynamodb } from "@/aws/dynamodb";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export default async function fetchLink({ user_id, link_id }) {
  try {
    const command = new GetItemCommand({
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
      Key: {
        user_id: { S: user_id },
        link_id: { S: link_id },
      },
    });
    const response = await dynamodb.send(command);
    return {
      link: response.Item,
    };
  } catch (error) {
    console.log("error", error);
    return {
      error: error.message,
    };
  }
}
