# AWS S3 Integration for Botpress

Harness the power of AWS S3 directly from your Botpress chatbot. This integration allows you to manage S3 buckets and objects, performing operations such as creating and deleting buckets, uploading and retrieving files, and more.

## Table of Contents
- [Introduction](#introduction)
- [AWS S3 Setup & Configuration](#aws-s3-setup--configuration)
  - [Prerequisites](#prerequisites)
  - [Enable Integration](#enable-integration)
- [Actions](#actions)
  - [Create Bucket](#create-bucket)
  - [Delete Bucket](#delete-bucket)
  - [Copy Object](#copy-object)
  - [Delete Bucket Policy](#delete-bucket-policy)
  - [Delete Bucket Website](#delete-bucket-website)
  - [Delete Object](#delete-object)
  - [Delete Multiple Objects](#delete-multiple-objects)
  - [Get Object](#get-object)
  - [List Objects V2](#list-objects-v2)
  - [Upload Object](#upload-object)
  - [List Buckets](#list-buckets)
- [Use Cases](#use-cases)
- [Supported Events](#supported-events)

## Introduction
The AWS S3 integration for Botpress empowers your chatbot to manage cloud storage. Create, list, and delete S3 buckets, and handle files directly through your chatbot. This integration is ideal for automating cloud workflows.

## AWS S3 Setup & Configuration
### Prerequisites
Before enabling the Botpress AWS S3 Integration, please ensure that you have the following:

- A Botpress server instance set up either locally or in the cloud.
- AWS credentials with permissions to access S3 services.

### Enable Integration
To enable the AWS S3 integration in Botpress, follow these steps:

1. Access your Botpress admin panel.
2. Navigate to the “Integrations” section.
3. Locate the AWS S3 integration and click on “Enable” or “Configure.”
4. Provide the required `accessKeyId`, `secretAccessKey`, and `region`.
5. Save the configuration.

## Actions
Here are the actions supported by the AWS S3 integration:

### Create Bucket
Create a new S3 bucket.

### Delete Bucket
Delete an existing S3 bucket.

### Copy Object
Copy an object from one S3 bucket to another.

### Delete Bucket Policy
Delete the policy associated with an S3 bucket.

### Delete Bucket Website
Delete the website configuration of an S3 bucket.

### Delete Object
Delete a specific object from an S3 bucket.

### Delete Multiple Objects
Bulk delete multiple objects from an S3 bucket.

### Get Object
Retrieve a specific object from an S3 bucket.

### List Objects V2
List objects in an S3 bucket (version 2 of the list operation).

### Upload Object
Upload a file/object to an S3 bucket. *Note: Currently, this feature is in development. We can return a pre-signed URL that the user can use with a curl command to send a file to AWS S3. We are waiting for Botpress to allow file uploads, and once implemented, this feature will be fully usable.*

### List Buckets
List all available S3 buckets.

## Use Cases
Here are some common use cases for the AWS S3 integration:

1. Data Retrieval
   - Allow users to retrieve specific files stored in an S3 bucket.
   - Use the Get Object action to retrieve files based on user input.
   - Use the List Objects V2 action to display available files for users to choose from.

2. Bucket Management
   - Enable users to create and delete buckets through the chatbot interface.
   - Use the Create Bucket action to create new storage locations.
   - Use the Delete Bucket action to remove unused or empty buckets.
   - Use the List Buckets action to display all available buckets for management.

3. Object Deletion
   - Manage and delete specific or multiple objects from an S3 bucket.
   - Use the Delete Object action to delete individual files based on user input.
   - Use the Delete Multiple Objects action to perform bulk deletions for cleanup operations.

4. Data Migration
   - Copy objects from one bucket to another for data migration purposes.
   - Use the Copy Object action to copy files from a source bucket to a destination bucket.
   - Use the List Buckets and List Objects V2 actions to verify the migration.

5. Cleanup Operations
   - Regularly clean up specific objects or entire buckets.
   - Use the List Objects V2 action to identify objects for deletion.
   - Use the Delete Object or Delete Multiple Objects actions to remove unwanted files.
   - Use the Delete Bucket action to remove empty buckets.

## Supported Events
This integration does not currently include events that trigger based on AWS S3 activities. However, you can customize the integration to listen for specific S3 event notifications via AWS SNS (Simple Notification Service) or other AWS services that trigger workflows in Botpress.
