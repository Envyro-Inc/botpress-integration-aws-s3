import { getClient } from '../client'
import { deleteBucketWebsiteInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const deleteBucketWebsite: Implementation['actions']['deleteBucketWebsite'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteBucketWebsiteInputSchema.parse(input);

  const s3Client = getClient(ctx.configuration);

  try {
    const bucketName = validatedInput.bucketName;
    const result = await s3Client.deleteBucketWebsite(bucketName);

    logger.forBot().info(`Successful - Delete Bucket Website - ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Bucket Website' exception: ${JSON.stringify(error)}`);
    throw error;
  }
}

// Example usage
// deleteBucketWebsite({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName' }
// }).then(console.log);
