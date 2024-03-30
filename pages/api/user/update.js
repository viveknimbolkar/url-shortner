import { dynamodb } from "@/aws/dynamodb";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// handler to update the link details in the database on the basic of user_id
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userID,
      linkID,
      name,
      originalUrl,
      expireAt,
      expireAfterView,
      password,
    } = req.body;

    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!linkID) {
      return res.status(400).json({ error: "Link ID is required" });
    }

    try {
      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Key: {
          user_id: { S: userID },
          link_id: { S: linkID },
        },
        UpdateExpression:
          "set #name = :name, #originalUrl = :originalUrl, #expireAt = :expireAt, #expireAfterViews = :expireAfterViews, #password = :password",
        ExpressionAttributeNames: {
          "#name": "name",
          "#originalUrl": "original_url",
          "#expireAt": "expire_at",
          "#expireAfterViews": "expire_after_views",
          "#password": "password",
        },
        ExpressionAttributeValues: {
          ":name": { S: name },
          ":originalUrl": { S: originalUrl ?? "" },
          ":expireAt": { S: expireAt ?? "" },
          ":expireAfterViews": { N: expireAfterView ?? 0 },
          ":password": { S: password ?? "" },
        },
      };

      const command = new UpdateItemCommand(params);

      const response = await dynamodb.send(command);
      if (response["$metadata"].httpStatusCode === 200) {
        res.status(200).json({ message: "Link Updated successfully" });
      } else {
        res.status(500).json({ error: "Failed to update link!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
