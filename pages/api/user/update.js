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
      let expressionAttributeValues = {},
        expressionAttributeNames = {};

      if (name) {
        expressionAttributeNames["#name"] = "name";
        expressionAttributeValues[":name"] = { S: name };
      }
      if (originalUrl) {
        expressionAttributeNames["#originalUrl"] = "original_url";
        expressionAttributeValues[":originalUrl"] = { S: originalUrl };
      }
      if (expireAt) {
        expressionAttributeNames["#expireAt"] = "expire_at";
        expressionAttributeValues[":expireAt"] = { S: expireAt };
      }
      if (expireAfterView) {
        expressionAttributeNames["#expireAfterViews"] = "expire_after_views";
        expressionAttributeValues[":expireAfterViews"] = { N: expireAfterView };
      }
      if (password) {
        expressionAttributeNames["#password"] = "password";
        expressionAttributeValues[":password"] = { S: password };
      }
      // if (isPasswordProtected || !isPasswordProtected) {
      expressionAttributeNames["#isPasswordProtected"] =
        "is_password_protected";
      expressionAttributeValues[":isPasswordProtected"] = {
        BOOL: isPasswordProtected,
      };
      // }

      console.log("expressionAttributeValues", expressionAttributeValues);
      console.log("expressionAttributeNames", expressionAttributeNames);

      const params = {
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Key: {
          user_id: { S: userID },
          link_id: { S: linkID },
        },
        UpdateExpression:
          "set #name = :name, #originalUrl = :originalUrl, #expireAt = :expireAt, #expireAfterViews = :expireAfterViews, #password = :password, #isPasswordProtected = :isPasswordProtected",
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      };

      const command = new UpdateItemCommand(params);
      console.log("command", command);
      const response = await dynamodb.send(command);

      console.log("server response", response);

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
