import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export default async function handler(req, res) {
  // fetch original url if link is not expired and not password protected
  if (req.method === "GET") {
    if (!req.query.urlid) {
      return res.status(400).json({ error: "URL ID is required" });
    }

    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
      IndexName: process.env.NEXT_PUBLIC_INDEX_NAME,
      KeyConditionExpression: "link_id = :link_id",
      ExpressionAttributeValues: {
        ":link_id": { S: req.query.urlid },
      },
    };

    try {
      // get link details
      const command = new QueryCommand(params);
      const result = await dynamodb.send(command);
      const link = unmarshall(result?.Items[0]);

      if (result.Count === 0) {
        return res.status(404).json({ error: "Link not found" });
      }

      // check if link expired
      if (link.total_visits > link.expire_after_views) {
        return res.status(200).json({ message: "Link expired" });
      }

      // generate payload based on payload to conver abstraction
      let payload = {};

      if (link.is_password_protected) {
        payload.isPasswordProtected = link.is_password_protected;
      } else {
        payload.originalUrl = link.original_url;
      }
      console.log("payload", payload);
      res.status(200).json(payload);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    // check if password is correct and send the original url if correct
    if (!req.query.urlid) {
      return res.status(400).json({ error: "URL ID is required" });
    }

    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
      IndexName: process.env.NEXT_PUBLIC_INDEX_NAME,
      KeyConditionExpression: "link_id = :link_id",
      ExpressionAttributeValues: {
        ":link_id": { S: req.query.urlid },
      },
    };

    try {
      // get link details
      const command = new QueryCommand(params);
      const result = await dynamodb.send(command);

      if (result.Count === 0) {
        return res.status(404).json({ error: "Link not found" });
      }

      const linkDetails = result?.Items[0];

      // check if link expired
      if (linkDetails.total_visits > linkDetails.expire_after_views) {
        return res.status(200).json({ message: "Link expired" });
      }

      // check if link has passwornd and it is correct
      if (!linkDetails.is_password_protected.BOOL) {
        return res.status(200).json({
          message: "Link is not password protected",
          originalUrl: linkDetails.original_url.S,
        });
      }

      if (req.body.password !== linkDetails.password.S) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // all check passed now send the original url
      const originalUrl = result.Items[0].original_url.S;
      res.status(200).json({ originalUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
