const { v4: uuidv4 } = require('uuid')

function uploadFile(fileLocation, options, filename, uuid, bucket, fieldName) {
  return new Promise((resolve, reject) => {
    bucket.upload(fileLocation, options, function(err, file) {
      if (err) reject(err)
      const bucketName = "fixed-72bee.appspot.com"
      const fileURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${uuid}`
      resolve({
        fileURL,
        fieldName
      })
    })
  })
}

async function uploadFiles(files, dirname, bucket) {
    const filesURL = []
    for (let file in files) {
      let filename = files[file][0].filename
      let fileLocation = `${dirname}/${filename}`
      let uuid = uuidv4()
      const options = {
        destination: filename,
        resumable: true,
        validation: 'crc32c',
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
        }
      }
      const fileURL = await uploadFile(fileLocation, options, filename, uuid, bucket, file)
      filesURL.push(fileURL)
    }
    return filesURL
}

module.exports = { uploadFile, uploadFiles}
