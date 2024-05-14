import { getClient } from '../client'
import { deleteBucketInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const deleteBucket: Implementation['actions']['deleteBucket'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteBucketInputSchema.parse(input);

  const s3Client = getClient(ctx.configuration);

  try {
    const bucketName = validatedInput.bucketName;
    const result = await s3Client.deleteBucket(bucketName);

    logger.forBot().info(`Successful - Delete Bucket - ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Bucket' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// deleteBucket({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName' }
// }).then(console.log);