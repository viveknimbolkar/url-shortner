import { dynamodb } from "@/aws/dynamodb";
import { GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
export default async function handler(req, res) {
  if (req.method === "GET") {
    if (!req.query.urlid || req.query.urlid === undefined) {
      return res.status(400).json({ error: "URL ID is required" });
    }
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
      IndexName: "link_id-index",
      KeyConditionExpression: "link_id = :link_id",
      ExpressionAttributeValues: {
        ":link_id": { S: req.query.urlid },
      },
    };
    try {
      const command = new QueryCommand(params);
      const result = await dynamodb.send(command);
      console.log(result.Items[0].original_url.S);
      const originalUrl = result.Items[0].original_url.S;
      res.status(200).json({ originalUrl: originalUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
