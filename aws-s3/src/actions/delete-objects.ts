import { getClient } from '../client'
import { deleteObjectsInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const deleteObjects: Implementation['actions']['deleteObjects'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteObjectsInputSchema.parse(input); 

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName, keys } = validatedInput;
    const keysArray = validatedInput.keys.split(',');
    const result = await s3Client.deleteObjects(bucketName, keysArray);

    logger.forBot().info(`Successful - Delete Multiple Objects from ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);
    
    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Multiple Objects' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// deleteObjects({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName', keys: ['objectKey1', 'objectKey2'] }
// }).then(console.log);
