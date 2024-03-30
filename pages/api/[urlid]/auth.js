import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.query.urlid) {
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

      if (result.Count === 0) {
        return res.status(404).json({ error: "Link not found" });
      }

      const linkDetails = result?.Items;

      res.json({ message: "lskdajlksjdf" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
