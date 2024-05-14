import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  CopyObjectCommand,
  DeleteBucketPolicyCommand,
  DeleteBucketWebsiteCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListBucketsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Config } from './misc/types';

/**
 * S3Api Class: Provides methods to interact with AWS S3 service.
 *
 * Methods:
 * - createBucket: Creates a new S3 bucket.
 * - deleteBucket: Deletes an S3 bucket.
 * - copyObject: Copies an object from one bucket to another.
 * - deleteBucketPolicy: Deletes the policy of an S3 bucket.
 * - deleteBucketWebsite: Deletes the website configuration for an S3 bucket.
 * - deleteObject: Deletes a single object from an S3 bucket.
 * - deleteObjects: Deletes multiple objects from an S3 bucket.
 * - listBuckets: Lists all the S3 buckets owned by the authenticated sender.
 * - getObject: Retrieves an object from an S3 bucket.
 * - listObjectsV2: Lists objects in an S3 bucket with pagination.
 * - putObject: Uploads an object to an S3 bucket. (Coming soon...)
 */

export class S3Api {
  private s3Client: S3Client;

  constructor(region: string, accessKeyId: string, secretAccessKey: string) {
    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  /**
   * Creates a new S3 bucket.
   * @param {string} bucketName - The name of the bucket to create.
   * @param {string} region - The region where the bucket will be created.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async createBucket(bucketName: string, region: string) {
    const input = { Bucket: bucketName, Location: { Type: "AvailabilityZone", Name: region } };
    const command = new CreateBucketCommand(input);
    return this.executeCommand(command, "Bucket created successfully");
  }

  /**
   * Deletes an S3 bucket.
   * @param {string} bucketName - The name of the bucket to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteBucket(bucketName: string) {
    const command = new DeleteBucketCommand({ Bucket: bucketName });
    return this.executeCommand(command, "Bucket deleted successfully");
  }

  /**
   * Copies an object from one bucket to another.
   * @param {string} sourceBucket - The source bucket name.
   * @param {string} sourceKey - The key of the source object.
   * @param {string} destinationBucket - The destination bucket name.
   * @param {string} destinationKey - The key for the object in the destination bucket.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async copyObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string) {
    const command = new CopyObjectCommand({
      CopySource: `${sourceBucket}/${sourceKey}`,
      Bucket: destinationBucket,
      Key: destinationKey,
    });
    return this.executeCommand(command, "Object copied successfully");
  }

  /**
   * Deletes the policy of an S3 bucket.
   * @param {string} bucketName - The name of the bucket whose policy is to be deleted.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteBucketPolicy(bucketName: string) {
    const command = new DeleteBucketPolicyCommand({ Bucket: bucketName });
    return this.executeCommand(command, "Bucket policy deleted successfully");
  }

  /**
   * Deletes the website configuration for an S3 bucket.
   * @param {string} bucketName - The name of the bucket whose website configuration is to be deleted.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteBucketWebsite(bucketName: string) {
    const command = new DeleteBucketWebsiteCommand({ Bucket: bucketName });
    return this.executeCommand(command, "Bucket website deleted successfully");
  }

  /**
   * Deletes a single object from an S3 bucket.
   * @param {string} bucketName - The name of the bucket.
   * @param {string} key - The key of the object to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteObject(bucketName: string, key: string) {
    const command = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
    return this.executeCommand(command, "Object deleted successfully");
  }

  /**
   * Deletes multiple objects from an S3 bucket.
   * @param {string} bucketName - The name of the bucket.
   * @param {string[]} keys - An array of keys to delete.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async deleteObjects(bucketName: string, keys: string[]) {
    const command = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: { Objects: keys.map(key => ({ Key: key })) }
    });
    return this.executeCommand(command, "Objects deleted successfully");
  }

  /**
   * Lists all the S3 buckets owned by the authenticated sender of the request.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async listBuckets() {
    const command = new ListBucketsCommand({});
    return this.executeCommand(command, "Buckets listed successfully");
  }

  /**
   * Retrieves an object from an S3 bucket.
   * @param {string} bucketName - The name of the bucket.
   * @param {string} key - The key of the object to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async getObject(bucketName: string, key: string) {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    return this.executeCommand(command, "Object retrieved successfully");
  }

  /**
   * Lists objects in an S3 bucket with optional prefix filtering.
   * @param {string} bucketName - The name of the bucket to list objects from.
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.
   */
  async listObjectsV2(bucketName: string) {
    const command = new ListObjectsV2Command({ Bucket: bucketName, MaxKeys: 10 });
    return this.executeCommand(command, "Objects listed successfully");
  }

  /**********************************************************************************************************************
   * Uploads an object to an S3 bucket.                                                                                 *
   * @param {string} bucketName - The name of the bucket.                                                               *
   * @param {string} key - The key for the object to upload.                                                            *
   * @param {Buffer | Uint8Array | Blob | string} body - The content of the object to upload.                           *
   * @param {string} contentType - The MIME type of the file to upload.                                                 *
   * @returns {Promise<Object>} A promise that resolves to the result of the operation.                                 *
   **********************************************************************************************************************/
  async putObject(bucketName: string, key: string, body: Buffer | Uint8Array | Blob | string, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    });
    return this.executeCommand(command, "Object uploaded successfully");
  }

  /**
   * Executes a provided command and handles the response or error.
   * @param {Command} command - The command to execute.
   * @param {string} successMessage - The success message to return if command execution is successful.
   * @returns {Promise<Object>} A promise that resolves to the operation result or an error message.
   */
  private async executeCommand(command: any, successMessage: string) {
    try {
      const response = await this.s3Client.send(command);
      const plainResponse = JSON.parse(JSON.stringify(response));
      
      return { success: true, message: successMessage, data: plainResponse };
    } catch (error: unknown) {
      const message = (error instanceof Error) ? error.message : "An unknown error occurred";
      return { success: false, message };
    }
  }

  /**
   * Generates a presigned URL for downloading an S3 object.
   * @param {string} bucketName - The name of the S3 bucket.
   * @param {string} key - The key of the object for which to generate the URL.
   * @param {number} [expiresIn=3600] - The expiration time in seconds (default is 3600 seconds/1 hour).
   * @returns {Promise<string>} A promise that resolves to the presigned URL.
   */
  async generatePresignedUrlGetObject(bucketName: string, key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      console.error("Error generating presigned URL", error);
      throw error;
    }
  }

  /**
    * Generates a presigned URL for uploading an object to an S3 bucket.                                                                             
    * @param {string} region - The AWS region.                                                                            
    * @param {string} bucketName - The name of the S3 bucket.                                                             
    * @param {string} key - The key for the object to upload.                                                             
    * @returns {Promise<string>} A promise that resolves to the presigned URL.                                          
    */
  async generatePresignedUrlPutObject(bucketName: string, key: string, region: string ): Promise<string> {
    const client = new S3Client({ region });
    const command = new PutObjectCommand({ Bucket: bucketName, Key: key });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  };
}

export function getClient(config: Config) {
  return new S3Api(config.region, config.accessKeyId, config.secretAccessKey);
}
