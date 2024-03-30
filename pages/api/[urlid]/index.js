import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

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
      // get link details
      const command = new QueryCommand(params);
      const result = await dynamodb.send(command);

      if (result.Count === 0) {
        return res.status(404).json({ error: "Link not found" });
      }

      const linkDetails = result?.Items;

      // check if link expired
      if (linkDetails.total_visits > linkDetails.expire_after_views) {
        return res.status(200).json({ message: "Link expired" });
      }

      // check if link is password protected
      if (linkDetails.password_protected) {
        return res.status(200).json({
          message:
            "Link password protected. Please enter password to continue to the site.",
        });
      }

      // all check passed now send the original url
      const originalUrl = result.Items[0].original_url.S;

      res.status(200).json({
        originalUrl: originalUrl,
        isPasswordProtected: linkDetails.password_protected,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
