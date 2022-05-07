const sharp = require('sharp')
const boom = require('@hapi/boom')

function resize(originalPath, resizePath, filename, size, next) {
  const dirnameSlash = __dirname.replace(/\\/g, "/")
  const input = dirnameSlash + originalPath + filename
  const output = dirnameSlash + resizePath + filename
  sharp(input)
    .resize({ width: size })
    .toFile(output)
    .catch(err => next(boom.failedDependency(err)))
}

function transformImage(size) {
  return (req, res, next) => {
    const files = req.files
    for (let file in files) {
      const filename = files[file][0].filename
      const originalPath = '/fixed/original/'
      const resizePath = '/fixed/resize/'
      const IMAGE_WIDTH = size
      resize(originalPath, resizePath, filename, IMAGE_WIDTH, next)
    }
    next()
  }
}

module.exports = transformImage
