import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerHandler, APIGatewayAuthorizerResult } from 'aws-lambda';

export const main: APIGatewayAuthorizerHandler = async (event: APIGatewayAuthorizerEvent, _context) => {
  try {
    if (event.type !== "TOKEN") {
      throw new Error('Bad event type');
    }
    const token = event.authorizationToken.split(' ')[1];
    const decodedToken = Buffer.from(token, 'base64').toString('utf8');
    const [username, password] = decodedToken.split(':');
    const policyEffect = process.env[username] && process.env[username] === password ? 'Allow': 'Deny';
    return generatePolicy(username, event.methodArn, policyEffect);
  } catch (err) {
    console.log(err)
    throw err;
  }
};

function generatePolicy(username: string, arn: string, effect: string) {
  return {
    principalId: username,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: arn
        }
      ]
    }
  } as APIGatewayAuthorizerResult;
}
