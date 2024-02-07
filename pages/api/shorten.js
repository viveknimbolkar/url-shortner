import { dynamodb } from "@/aws/dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const id = nanoid(5);
    const shortUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${id}`;

    console.log(shortUrl);

    const params = {
      TableName: "url-shortner",
      Item: {
        "url-id": { S: id },
        shortUrl: { S: shortUrl },
        originalUrl: { S: body.url },
      },
    };

    try {
      const command = new PutItemCommand(params);
      const result = await dynamodb.send(command);
      res.status(200).json({ shortUrl: shortUrl });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
