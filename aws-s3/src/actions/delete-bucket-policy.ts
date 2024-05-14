import { getClient } from '../client'
import { deleteBucketPolicyInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const deleteBucketPolicy: Implementation['actions']['deleteBucketPolicy'] = async ({ ctx, logger, input }) => {
  const validatedInput = deleteBucketPolicyInputSchema.parse(input); 

  const s3Client = getClient(ctx.configuration);

  try {
    const bucketName = validatedInput.bucketName;
    const result = await s3Client.deleteBucketPolicy(bucketName);

    logger.forBot().info(`Successful - Delete Bucket Policy - ${bucketName}`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Delete Bucket Policy' exception: ${JSON.stringify(error)}`);
    throw error;
  }
}

// Example usage
// deleteBucketPolicy({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName' }
// }).then(console.log);
