import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognito } from "@/aws/cognito";

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body);
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: body.email,
        PASSWORD: body.password,
      },
    });

    const result = await cognito.send(command);
    res.status(200).json({ token: result.AuthenticationResult });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
