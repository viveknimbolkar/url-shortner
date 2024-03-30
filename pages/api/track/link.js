import { dynamodb } from "@/aws/dynamodb";
import { QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { link_id } = req.body;

    try {
      // get link based on link_id using gsi
      const getLinkDetails = new QueryCommand({
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        IndexName: "link_id-index",
        Key: {
          link_id: { S: link_id },
        },
        KeyConditionExpression: "#link_id = :link_id",
        ExpressionAttributeValues: {
          ":link_id": { S: link_id },
        },
        ExpressionAttributeNames: {
          "#link_id": "link_id",
        },
      });

      const fetchLinkDetails = await dynamodb.send(getLinkDetails);

      const linkDetails = fetchLinkDetails?.Items;

      // extract browser name from user-agent
      const userAgent = req["headers"]["user-agent"];

      let browserName = "";

      if (userAgent) {
        if (userAgent.includes("Firefox")) {
          browserName = "firefox";
        } else if (userAgent.includes("Chrome")) {
          browserName = "chrome";
        } else if (userAgent.includes("Safari")) {
          browserName = "safari";
        } else if (userAgent.includes("Edge")) {
          browserName = "edge";
        } else if (
          userAgent.includes("MSIE") ||
          userAgent.includes("Trident/")
        ) {
          browserName = "internet_explorer";
        } else {
          browserName = "unknown";
        }
      }

      const command = new UpdateItemCommand({
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Key: {
          user_id: { S: linkDetails[0].user_id.S },
          link_id: { S: link_id },
        },
        UpdateExpression: `SET #total_visits = #total_visits + :count, browsers.${browserName} = browsers.${browserName} + :count`,
        ExpressionAttributeValues: {
          ":count": { N: "1" },
        },
        ExpressionAttributeNames: {
          "#total_visits": "total_visits",
        },
        ReturnValues: "UPDATED_NEW",
      });

      const response = await dynamodb.send(command);

      if (response["$metadata"]?.httpStatusCode === 200) {
        return res.status(200).json({ message: "Link clicked" });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
