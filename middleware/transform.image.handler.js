const sharp = require('sharp')
const boom = require('@hapi/boom')

async function resize(originalPath, resizePath, filename, size, next) {
  const dirnameSlash = process.cwd().replace(/\\/g, "/")
  const input = dirnameSlash + originalPath + filename
  const output = dirnameSlash + resizePath + filename
  await sharp(input)
    .resize({ width: size })
    .toFile(output)
    .catch(err => next(boom.failedDependency(err)))
}

function transformImage(size) {
  return async (req, res, next) => {
    const files = req.files
    for (let file in files) {
      const filename = files[file][0].filename
      const originalPath = '/uploads/'
      const resizePath = '/resize/'
      const IMAGE_WIDTH = size
      await resize(originalPath, resizePath, filename, IMAGE_WIDTH, next)
    }
    next()
  }
}

module.exports = transformImage
