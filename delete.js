import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (err) {
    console.log('err: ', err);
    return failure({ status: false });
  }
}
