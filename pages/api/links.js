import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const command = new QueryCommand({
        TableName: process.env.TABLE_NAME,
        ExpressionAttributeNames: {
          "#user_id": "user_id",
        },
        ExpressionAttributeValues: {
          ":user_id": {
            S: req.body.user_id,
          },
        },
        KeyConditionExpression: "#user_id = :user_id",
      });
      // const result = await dynamodb.send(command);
      const data = [
        {
          expire_at: { S: "" },
          referer: { SS: [Array] },
          location: { S: "" },
          created_at: { S: "" },
          browsers: { M: [Object] },
          short_url: { S: "http://localhost:3000/0iv6l" },
          expire_after_views: { N: "0" },
          total_visits: { N: "0" },
          name: { S: "fish Danna Obi-Wan Kenobi" },
          link_id: { S: "0iv6l" },
          password: { S: "" },
          user_id: { S: "f1534dea-b091-702d-a472-aa41183ea732" },
          is_password_protected: { BOOL: false },
          original_url: { S: "https://t.ly/dashboard" },
          qr_scans: { N: "0" },
          qr_code: { S: "" },
          description: { S: "" },
        },
        {
          expire_at: { S: "" },
          referer: { SS: [Array] },
          location: { S: "" },
          created_at: { S: "" },
          browsers: { M: [Object] },
          short_url: { S: "http://localhost:3000/a_2ng" },
          expire_after_views: { N: "0" },
          total_visits: { N: "0" },
          name: { S: "" },
          link_id: { S: "a_2ng" },
          password: { S: "" },
          user_id: { S: "f1534dea-b091-702d-a472-aa41183ea732" },
          is_password_protected: { BOOL: false },
          original_url: {
            S: "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/PutItemCommand/",
          },
          qr_scans: { N: "0" },
          qr_code: { S: "" },
          description: { S: "" },
        },
      ];
      res.status(200).json({ links: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  } else {
    res.status(403).json({
      message: "Method not allowed!",
    });
  }
}
