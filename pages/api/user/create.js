import { dynamodb } from "@/aws/dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("body", req.body);
      const { user_id } = req.body;

      //   init user in table
      const command = new PutItemCommand({
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Item: {
          user_id: { S: req.body.user_id },
          link_id: { S: "" },
          original_url: { S: "" },
          short_url: { S: "" },
          total_visits: { N: `${0}` },
          created_at: { S: "" },
          expire_at: { S: "" },
          qr_code: { S: "" },
          description: { S: "" },
          name: { S: "" },
          expire_after_views: { N: `${0}` },
          password: { S: "" },
          referer: { SS: [""] },
          location: { S: "" },
          qr_scans: { N: `${0}` },
          browsers: {
            M: {
              chrome: { N: `${0}` },
              firefox: { N: `${0}` },
              edge: { N: `${0}` },
              safari: { N: `${0}` },
            },
          },
        },
      });

      const result = await dynamodb.send(command);
      console.log(result);

      if (result)
        res.status(200).json({ message: "User created successfully!" });
      else
        res
          .status(500)
          .json({ message: "Something went wrong! Try again later." });

      //   res.status(200).json({ message: "create" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
