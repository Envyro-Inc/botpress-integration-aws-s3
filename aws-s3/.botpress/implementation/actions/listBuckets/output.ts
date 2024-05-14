/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Output {
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
    Buckets: {
      Name: string;
      CreationDate: string;
    }[];
    Owner: {
      DisplayName: string;
      ID: string;
    };
  };
}
