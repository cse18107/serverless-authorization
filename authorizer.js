var jwt = require('jsonwebtoken');

const secret = 'sdfwefsdnlksefiweufinbciwse';

const generatePolicy = (principleId, effect, resource, decoded) => {
    var authResponse = {};

    authResponse.principalId = principleId;
    if (effect && resource) {
        let policyDocument = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: effect,
                    Resource: resource,
                    Action: "execute-api:Invoke",
                }
            ]
        }
        authResponse.policyDocument = policyDocument;
    }

    authResponse.context = decoded

    console.log(JSON.stringify(authResponse))

    return authResponse;
}

exports.handler =async (event, context, callback) => {
    // lambda authorizer code
    var token = event.authorizationToken; // "allow" or "deny"

    var decoded = await jwt.verify(token, secret)
    console.log('decoded=============',decoded)
    if(token)
    callback(null, generatePolicy("user", "Allow", event.methodArn, decoded?.data));

    callback("Error: Invalid token");

}