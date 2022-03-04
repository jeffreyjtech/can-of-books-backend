'use strict';

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

// jwks magic
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// copy-pasta'ed from https://www.npmjs.com/package/jsonwebtoken
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Verify the user on our route
// This callback function does it
function verifyUser (req, errorFirstOrUserCallbackFunction){
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    // from the jsonwebtokendocs:

    jwt.verify(
      token,
      getKey,
      /* empty object! */ {},
      errorFirstOrUserCallbackFunction
    );
  } catch (error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
