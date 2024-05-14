import { deleteBucketWebsite } from './delete-bucket-website'
import { copyObject } from './copy-object'
import { createBucket } from './create-bucket'
import { deleteBucket } from './delete-bucket'
import { deleteBucketPolicy } from './delete-bucket-policy'
import { deleteObject } from './delete-object'
import { deleteObjects } from './delete-objects'
import { getObject } from './get-object'
import { listObjectsV2 } from './list-objects-v2'
import { putObject } from './put-object'
import { listBuckets } from './list-buckets'

export default {
    createBucket,
    deleteBucket,
    copyObject,
    deleteBucketPolicy,
    deleteBucketWebsite,
    deleteObject,
    deleteObjects,
    getObject,
    listObjectsV2,
    putObject,
    listBuckets
}