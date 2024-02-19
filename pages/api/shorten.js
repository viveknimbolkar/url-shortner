import { dynamodb } from "@/aws/dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
import {
  uniqueNamesGenerator,
  animals,
  names,
  starWars,
} from "unique-names-generator";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.user_id || !req.body.url) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const randomName = uniqueNamesGenerator({
      dictionaries: [animals, names, starWars],
      separator: " ",
    });

    const id = nanoid(5);
    const shortUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${id}`;

    try {
      const command = new PutItemCommand({
        TableName: process.env.NEXT_PUBLIC_TABLE_NAME,
        Item: {
          user_id: { S: req.body.user_id },
          link_id: { S: id },
          original_url: { S: req.body.url },
          short_url: { S: shortUrl },
          total_visits: { N: `${0}` },
          created_at: { S: new Date().toISOString() },
          expire_at: { S: "" },
          qr_code: { S: "" },
          description: { S: "" },
          name: { S: randomName },
          expire_after_views: { N: `${0}` },
          password: { S: "" },
          is_password_protected: { BOOL: false },
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
      if (result["$metadata"].httpStatusCode === 200) {
        res.status(200).json({ shortUrl: shortUrl });
      } else {
        res
          .status(500)
          .json({ error: "Something went wrong! Try again later." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
