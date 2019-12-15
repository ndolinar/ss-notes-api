import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    // Key: partition key + sort key of the item
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: 'Item not found.' });
    }
  } catch (err) {
    return failure({ status: false });
  }
}
