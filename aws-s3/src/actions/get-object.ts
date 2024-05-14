import { getClient } from '../client'
import { getObjectInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const getObject: Implementation['actions']['getObject'] = async ({ ctx, logger, input }) => {
  const validatedInput = getObjectInputSchema.parse(input);

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName, key } = validatedInput;
    const result = await s3Client.getObject(bucketName, key);
    const presignedURL = await s3Client.generatePresignedUrlGetObject(bucketName, key);

    logger.forBot().debug(`Presigned URL - ${JSON.stringify(presignedURL)}`);
    // logger.forBot().debug(`Response -  ${JSON.stringify(result.data)}`);
    logger.forBot().info(`Successful - Get Object - ${key} from ${bucketName}`);

    return {
      success: true,
      message: "Presigned URL generated",
      url: presignedURL,
    };

  } catch (error) {
    logger.forBot().error(`'Get Object' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// getObject({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName', key: 'yourObjectKey' }
// }).then(console.log);
