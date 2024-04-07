import { dynamodb } from "@/aws/dynamodb";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const command = new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          user_id: { S: req.body.user_id },
          link_id: { S: req.body.link_id },
        },
      });
      const result = await dynamodb.send(command);
      if (result) {
        res.status(200).json({ message: "Link deleted" });
      } else {
        res.status(200).json({ message: "Link not deleted" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(200).json({ message: "This is a delete request" });
  }
}
