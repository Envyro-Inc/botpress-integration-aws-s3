import { getClient } from '../client'
import { listObjectsV2InputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const listObjectsV2: Implementation['actions']['listObjectsV2'] = async ({ ctx, logger, input }) => {
  const validatedInput = listObjectsV2InputSchema.parse(input); 

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName } = validatedInput;
    const result = await s3Client.listObjectsV2(bucketName);

    logger.forBot().info(`Successful - List Objects in Bucket - ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().error(`'List Objects V2' exception: ${JSON.stringify(error)}`);
    throw error;
  }
}

// Example usage
// listObjectsV2({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName' }
// }).then(console.log);
