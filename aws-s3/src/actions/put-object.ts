import { getClient } from '../client'
import { putObjectInputSchema } from '../misc/custom-schemas'
import type { Implementation } from '../misc/types'

export const putObject: Implementation['actions']['putObject'] = async ({ ctx, logger, input }) => {
  const validatedInput = putObjectInputSchema.parse(input); 

  const s3Client = getClient(ctx.configuration);

  try {
    const { bucketName, key, region } = validatedInput;
    const presignedURL = await s3Client.generatePresignedUrlPutObject(bucketName, key, region);
    
    logger.forBot().debug(`Presigned Upload URL -  ${JSON.stringify(presignedURL)}`);
    // logger.forBot().info(`Successful - Put Object - ${key} in Bucket ${bucketName}`);    
    
    return {
      success: false,
      message: 'Upload Object is an in develoment action. Only the presigned URL can be provided...',
      data: presignedURL.toString()
    };
  } catch (error) {
    logger.forBot().error(`'Put Object' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// putObject({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
//   input: { bucketName: 'yourBucketName', key: 'yourObjectKey', body: 'Hello, S3!', contentType: 'text/plain' }
// }).then(console.log);
