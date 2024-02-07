import { dynamodb } from "@/aws/dynamodb";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const params = {
      TableName: "url-shortner",
      Key: {
        "url-id": { S: req.query.urlid },
      },
    };
    try {
      const command = new GetItemCommand(params);
      const result = await dynamodb.send(command);
      res.status(200).json({ originalUrl: result.Item.originalUrl.S });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
