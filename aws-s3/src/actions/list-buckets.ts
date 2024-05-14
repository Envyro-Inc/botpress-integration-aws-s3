import { getClient } from '../client'
import type { Implementation } from '../misc/types'

export const listBuckets: Implementation['actions']['listBuckets'] = async ({ ctx, logger }) => {
  logger.forBot().debug("Test");

  const s3Client = getClient(ctx.configuration);
  const result = await s3Client.listBuckets();


  try {
    logger.forBot().info(`Successful - List Buckets`);
    logger.forBot().debug(`Response -  ${JSON.stringify(result)}`);

    return {
      success: result.success,
      message: result.message,
      data: result.data
    };
  } catch (error) {
    logger.forBot().error(`'List Buckets' exception: ${JSON.stringify(error)}`);
    throw error; 
  }
}

// Example usage
// listBuckets({
//   ctx: { configuration: { region: 'us-east-1', accessKeyId: 'yourAccessKeyId', secretAccessKey: 'yourSecretAccessKey' }},
//   logger: console,
// }).then(console.log);
