/* eslint-disable */
/* tslint:disable */
// This file is generated. Do not edit it manually.

export type Output = {
  success: boolean;
  message: string;
  data: {
    $metadata: {
      httpStatusCode: number;
      requestId: string;
      extendedRequestId: string;
      attempts: number;
      totalRetryDelay: number;
    };
    Contents: Array<{
      Key: string;
      LastModified: string;
      ETag: string;
      Size: number;
      StorageClass: string;
    }>;
    IsTruncated: boolean;
    KeyCount: number;
    MaxKeys: number;
    Name: string;
    Prefix: string;
  };
};
