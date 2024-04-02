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
      isPasswordProtected,
    } = req.body;

    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!linkID) {
      return res.status(400).json({ error: "Link ID is required" });
    }

    try {
      // build the query based on the input  parameters received
      let expressionAttributeValues = {},
        expressionAttributeNames = {};
      let query = [];

      if (name) {
        expressionAttributeNames["#name"] = "name";
        expressionAttributeValues[":name"] = { S: name };
        query.push("#name = :name");
      }
      if (originalUrl) {
        expressionAttributeNames["#originalUrl"] = "original_url";
        expressionAttributeValues[":originalUrl"] = { S: originalUrl };
        query.push("#originalUrl = :originalUrl");
      }
      if (expireAt) {
        expressionAttributeNames["#expireAt"] = "expire_at";
        expressionAttributeValues[":expireAt"] = { S: expireAt };
        query.push("#expireAt = :expireAt");
      }
      if (expireAfterView) {
        expressionAttributeNames["#expireAfterViews"] = "expire_after_views";
        expressionAttributeValues[":expireAfterViews"] = {
          N: expireAfterView,
        };
        query.push("#expireAfterViews = :expireAfterViews");
      }
      if (password) {
        expressionAttributeNames["#password"] = "password";
        expressionAttributeValues[":password"] = { S: password };
        query.push("#password = :password");
      }
      if (!!isPasswordProtected) {
        expressionAttributeNames["#isPasswordProtected"] =
          "is_password_protected";
        expressionAttributeValues[":isPasswordProtected"] = {
          BOOL: isPasswordProtected,
        };
        query.push("#isPasswordProtected = :isPasswordProtected");
      }

      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Key: {
          user_id: { S: userID },
          link_id: { S: linkID },
        },
        UpdateExpression: `set ${query.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
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
