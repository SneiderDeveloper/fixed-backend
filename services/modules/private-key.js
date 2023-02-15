const config = require('../../config/config')

const keyPrivate = {
    type: config.type,
    projectId: config.projectId,
    privateKeyId: config.privateKeyId,
    privateKey: config.privateKey,
    clientEmail: config.clientEmail,
    clientId: config.clientId,
    authUri: config.AUTH_authUriURI,
    tokenUri: config.tokenUri,
    authProviderX509CertUrl: config.authProviderX509CertUrl,
    clientX509CertUrl: config.clientX509CertUrl
}

module.exports = { keyPrivate }