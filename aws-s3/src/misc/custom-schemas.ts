import {z} from '@botpress/sdk'

/*
Action Schemas
*/

// Input and Output Schemas for createBucket
export const createBucketInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket that will be created.').placeholder('unique-bucket-name'),
    region: z.string().describe('The region where the bucket will exist (default is us-east-1).').placeholder('us-east-1')
}) 

export const createBucketOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
      Location: z.string(),
    })
  });

// Input and Output Schemas for deleteBucket
export const deleteBucketInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket to delete. Ensure there are no objects in the bucket.').placeholder('your-bucket-name'),
});

export const deleteBucketOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
    }),
  });

// Input and Output Schemas for copyObject
export const copyObjectInputSchema = z.object({
    sourceBucket: z.string().describe('The source bucket name where the object is stored.'),
    sourceKey: z.string().describe('The key/name of the source object.'),
    destinationBucket: z.string().describe('The destination bucket name where the object will be copied to.'),
    destinationKey: z.string().describe('The key/name for the object in the destination bucket.')
});

export const copyObjectOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
      ServerSideEncryption: z.string(),
      CopyObjectResult: z.object({
        ETag: z.string(),
        LastModified: z.string(),
      }),
    }).optional(),
  });

// Input and Output Schemas for deleteBucketPolicy
export const deleteBucketPolicyInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket for which the policy will be deleted.')
});

export const deleteBucketPolicyOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        $metadata: z.object({
            httpStatusCode: z.number(),
            requestId: z.string(),
            extendedRequestId: z.string(),
            attempts: z.number(),
            totalRetryDelay: z.number(),
        }),
    }).optional(),
});

// Input and Output Schemas for deleteBucketWebsite
export const deleteBucketWebsiteInputSchema = z.object({
    bucketName: z.string().describe('Name of the bucket for which the website configuration will be deleted.')
});

export const deleteBucketWebsiteOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        $metadata: z.object({
            httpStatusCode: z.number(),
            requestId: z.string(),
            extendedRequestId: z.string(),
            attempts: z.number(),
            totalRetryDelay: z.number(),
        }),
    }),
});

// Input and Output Schemas for deleteObject
export const deleteObjectInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket that stores the object.'),
    key: z.string().describe('The key/name of the object to delete.')
});

export const deleteObjectOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        $metadata: z.object({
            httpStatusCode: z.number(),
            requestId: z.string(),
            extendedRequestId: z.string(),
            attempts: z.number(),
            totalRetryDelay: z.number(),
        }),
    }),
});

// Input and Output Schemas for deleteObjects
export const deleteObjectsInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket that stores the objects.'),
    keys: z.string().describe('A list of the objects that you want to delete. Ensure they are comma separated keys.').placeholder("object-one.txt,object-two.jpg,object-three.rtf")
});

export const deleteObjectsOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
      Deleted: z.array(z.object({
        Key: z.string(),
      })),
    }),
  });

// Input and Output Schemas for listBuckets
export const listBucketsInputSchema = z.object({
    accessKeyId: z.string().describe("Optional, you don't need to write anything here").optional()
});

export const listBucketsOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
      Buckets: z.array(z.object({
        Name: z.string(),
        CreationDate: z.string(),
      })),
      Owner: z.object({
        DisplayName: z.string(),
        ID: z.string(),
      }),
    }),
});

// Input and Output Schemas for getObject
export const getObjectInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket.'),
    key: z.string().describe('The key of the object in the bucket')
});

export const getObjectOutputSchema = z.object({
    success: z.boolean(),  
    message: z.string(),
    url: z.string()
    // data: z.string().optional() 
});

// Input and Output Schemas for listObjectsV2
export const listObjectsV2InputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket for which to list its objects.')
});

export const listObjectsV2OutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      $metadata: z.object({
        httpStatusCode: z.number(),
        requestId: z.string(),
        extendedRequestId: z.string(),
        attempts: z.number(),
        totalRetryDelay: z.number(),
      }),
      Contents: z.array(z.object({
        Key: z.string(),
        LastModified: z.string(),
        ETag: z.string(),
        Size: z.number(),
        StorageClass: z.string(),
      })),
      IsTruncated: z.boolean(),
      KeyCount: z.number(),
      MaxKeys: z.number(),
      Name: z.string(),
      Prefix: z.string(),
    }),
});

// Input and Output Schemas for putObject
export const putObjectInputSchema = z.object({
    bucketName: z.string().describe('The name of the bucket.'),
    key: z.string().describe('The key for the object to upload.'),
    region: z.string().describe('The region where the bucket exists.')
});

export const putObjectOutputSchema = z.object({
    success: z.boolean(),  
    message: z.string(),
    data: z.string().optional() 
});

/*
Event Schemas
*/
