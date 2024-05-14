import { getClient } from '../client'
import { copyObjectInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const copyObject: Implementation['actions']['copyObject'] = async ({ ctx, logger, input }) => {
  const validatedInput = copyObjectInputSchema.parse(input);

  const s3Client = getClient(ctx.configuration);

  try {
    const { sourceBucket, sourceKey, destinationBucket, destinationKey } = validatedInput;
    const result = await s3Client.copyObject(sourceBucket, sourceKey, destinationBucket, destinationKey);

    logger.forBot().info(`Successful - Copy Object from '${sourceBucket}' to '${destinationBucket}'`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);
    
    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().debug(`'Copy Object' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// copyObject({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { sourceBucket: 'yourSourceBucketName', sourceKey: 'yourSourceObjectKey', destinationBucket: 'yourDestinationBucketName', destinationKey: 'yourDestinationObjectKey' }
// }).then(console.log);
