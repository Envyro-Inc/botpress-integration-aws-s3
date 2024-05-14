import { getClient } from '../client'
import { deleteObjectInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const deleteObject: Implementation['actions']['deleteObject'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteObjectInputSchema.parse(input); 

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName, key } = validatedInput;
    const result = await s3Client.deleteObject(bucketName, key);

    logger.forBot().info(`Successful - Delete Object - ${key} from ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Object' exception: ${JSON.stringify(error)}`);
    throw error;
  }
}

// Example usage
// deleteObject({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName', key: 'yourObjectKey' }
// }).then(console.log);
