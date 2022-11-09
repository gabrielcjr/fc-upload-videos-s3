require('dotenv').config()
const AWS =require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

//   var bucketParams = {Bucket: process.env.AWS_BUCKET_NAME_READ};

//   s3.getBucketAcl(bucketParams, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else if (data) {
//       console.log("Success", data.Grants);
//     }
//   });

s3.putObjectAcl({
Bucket: process.env.AWS_BUCKET_NAME_READ,
Key: 'code/fullcycle/fc3/microsservico-catalogo-de-videos-com-typescript/5/3.1-Entendendo-a-primeira-linha.mp4/**',
AccessControlPolicy: {
    Grants: [
        {
            Grantee: {
                Type: 'CanonicalUser',
                DisplayName: 'wesleywillians',
                ID: 'a3edb89dc8762b1d543412e1b0999c8b17e8a1e94c3694bf2e35d4b61499419d',
                
            },
            Permission: 'FULL_CONTROL'
        },
        {
            Grantee: {
                Type: "Group",
                URI: 'http://acs.amazonaws.com/groups/global/AllUsers',
            },
            Permission: "READ",
        }
    ],
    Owner: {
        DisplayName: 'wesleywillians',
        ID: 'a3edb89dc8762b1d543412e1b0999c8b17e8a1e94c3694bf2e35d4b61499419d',
    }}
}).promise()

s3.