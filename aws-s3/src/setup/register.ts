import { getClient } from 'src/client';
import * as bpclient from "@botpress/client";
import type { RegisterFunction } from '../misc/types'


export const register: RegisterFunction = async ({ ctx, client, logger }) => {
  try {
    // Assuming there's an S3 client setup which can be imported and used to check access
    const s3Client = getClient(ctx.configuration);  // Ensure getClient is properly imported and setup
    const result = await s3Client.listBuckets();
    
    // If the listBuckets command does not throw, it means we have successfully accessed S3
    logger.forBot().info("Successfully accessed AWS S3: Integration can proceed");
    
    // Optionally, you can log the count of buckets or other details
    logger.forBot().info(`Found ${result} buckets in the account.`);
  } catch (error) {
    logger.forBot().error("Failed to access AWS S3: Check configuration", error);

    throw new bpclient.RuntimeError(
      "Configuration Error! Unknown error."
    );
  }
}
