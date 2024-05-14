import { getClient } from '../client'
import { createBucketInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const createBucket: Implementation['actions']['createBucket'] = async ({ ctx, logger, input }) => {
  const validatedInput = createBucketInputSchema.parse(input);

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName, region } = validatedInput;
    const result = await s3Client.createBucket(bucketName, region);

    logger.forBot().debug(`Successful - Create Bucket - ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Create Bucket' exception ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// createBucket({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName' }
// }).then(console.log);
