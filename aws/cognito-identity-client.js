import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
};
const cognitoPool = new CognitoUserPool(poolData);
export default cognitoPool;
