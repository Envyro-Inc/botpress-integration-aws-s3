import { IntegrationDefinition, Schema, z } from '@botpress/sdk'
import { name, integrationName } from './package.json'

import {
  createBucketInputSchema,
  createBucketOutputSchema,
  deleteBucketInputSchema,
  deleteBucketOutputSchema,
  copyObjectInputSchema,
  copyObjectOutputSchema,
  deleteBucketPolicyInputSchema,
  deleteBucketPolicyOutputSchema,
  deleteBucketWebsiteInputSchema,
  deleteBucketWebsiteOutputSchema,
  deleteObjectInputSchema,
  deleteObjectOutputSchema,
  deleteObjectsInputSchema,
  deleteObjectsOutputSchema,
  getObjectInputSchema,
  getObjectOutputSchema,
  listObjectsV2InputSchema,
  listObjectsV2OutputSchema,
  putObjectInputSchema,
  putObjectOutputSchema,
  listBucketsInputSchema,
  listBucketsOutputSchema
} from './src/misc/custom-schemas'

export default new IntegrationDefinition({
  name: integrationName ?? name,
  version: '24.11.1',
  title: 'AWS S3',
  readme: 'hub.md',
  icon: 'icon.svg',
  description: 
    'Empower your Botpress chatbot with AWS S3 to manage cloud storage. Create, list, and delete S3 buckets, and handle files directly through your chatbot. Ideal for automating cloud workflows.',
  configuration: {
    schema: z.object({
      accessKeyId: z.string(),                // AWS Access Key ID
      secretAccessKey: z.string(),   // AWS Secret Access Key
      region: z.string()                      // AWS Region
    })
  },
  events: {},
  user: {
    tags: {
      id: {
        title: "AWS Access Key ID",
      }
    }
  },
  channels: {},
  states: {},
  actions: {
    createBucket: {
      title: 'Create Bucket',
      input: {
        schema: createBucketInputSchema
      },
      output: {
        schema: createBucketOutputSchema
      }
    },
    deleteBucket: {
      title: 'Delete Bucket',
      input: {
        schema: deleteBucketInputSchema
      },
      output: {
        schema: deleteBucketOutputSchema
      }
    },
    copyObject: {
      title: 'Copy Object',
      input: {
        schema: copyObjectInputSchema
      },
      output: {
        schema: copyObjectOutputSchema
      }
    },
    deleteBucketPolicy: {
      title: 'Delete Bucket Policy',
      input: {
        schema: deleteBucketPolicyInputSchema
      },
      output: {
        schema: deleteBucketPolicyOutputSchema
      }
    },
    deleteBucketWebsite: {
      title: 'Delete Bucket Website',
      input: {
        schema: deleteBucketWebsiteInputSchema
      },
      output: {
        schema: deleteBucketWebsiteOutputSchema
      }
    },
    deleteObject: {
      title: 'Delete Object',
      input: {
        schema: deleteObjectInputSchema
      },
      output: {
        schema: deleteObjectOutputSchema
      }
    },
    deleteObjects: {
      title: 'Delete Multiple Objects',
      input: {
        schema: deleteObjectsInputSchema
      },
      output: {
        schema: deleteObjectsOutputSchema
      }
    },
    getObject: {
      title: 'Get Object',
      input: {
        schema: getObjectInputSchema
      },
      output: {
        schema: getObjectOutputSchema
      }
    },
    listObjectsV2: {
      title: 'List Objects V2',
      input: {
        schema: listObjectsV2InputSchema
      },
      output: {
        schema: listObjectsV2OutputSchema
      }
    },
    putObject: {
      title: 'Upload Object',
      input: {
        schema: putObjectInputSchema
      },
      output: {
        schema: putObjectOutputSchema
      }
    },
    listBuckets: {
      title: 'List Buckets',
      input: {
        schema: listBucketsInputSchema
      },
      output: {
        schema: listBucketsOutputSchema
      }
    }
  }
})
