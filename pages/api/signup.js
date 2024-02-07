import { cognito } from "@/aws/cognito";
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      const command = new SignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        Username: body.username,
        Password: body.password,
        UserAttributes: [
          {
            Name: "email",
            Value: body.email,
          },
          {
            Name: "name",
            Value: body.name,
          },
        ],
      });
      const result = await cognito.send(command);

      res.status(200).json({ sub: result.UserSub });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
