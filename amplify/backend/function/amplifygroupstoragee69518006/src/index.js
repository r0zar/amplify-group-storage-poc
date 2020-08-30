/* Amplify Params - DO NOT EDIT
	API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIIDOUTPUT
	STORAGE_S325F98BC9_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const https = require("https");
const urlParse = require("url").URL;
// const { getFile } = require("./graphql/queries");

const REGION = process.env.REGION;
const GRAPHQL_API_ENDPOINT =
  process.env.API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIENDPOINTOUTPUT;
const BUCKET = process.env.STORAGE_S325F98BC9_BUCKETNAME;
const ENDPOINT = new urlParse(GRAPHQL_API_ENDPOINT).hostname.toString();
if (!GRAPHQL_API_ENDPOINT) {
  throw new Error(
    `Function requires environment variable: 'API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIENDPOINTOUTPUT'`
  );
}

const s3 = new AWS.S3();

const gql = async (query, operationName, variables) => {
  const req = new AWS.HttpRequest(GRAPHQL_API_ENDPOINT, REGION);
  req.method = "POST";
  req.headers.host = ENDPOINT;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({ query, operationName, variables });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  const { data, errors } = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: ENDPOINT }, (result) => {
      result.on("data", (data) => {
        resolve(JSON.parse(data.toString()));
      });
    });
    httpRequest.write(req.body);
    httpRequest.end();
  });
  return { data, errors };
};

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Mutation: {},
  Query: {},
};

exports.handler = async (event) => {
  // API GATEWAY
  // TODO: add path check to if logic
  if (event.httpMethod == "GET") {
    var params = {
      Bucket: BUCKET,
      Key: event.pathParameters.proxy,
    };
    // authorize the request
    // lookup file where proxy == s3Path
    // check if requester is a file owner/viewer
    var origimage = await s3.getObject(params).promise();

    var response = {
      headers: { "Content-Type": "blob" },
      statusCode: 200,
      body:
        "data:" +
        origimage.ContentType +
        ";base64," +
        origimage.Body.toString("base64"),
      isBase64Encoded: true,
    };
    return response;
  }

  // GRAPHQL
  // event
  // {
  //   "typeName": "Mutation", /* Filled dynamically based on @function usage location */
  //   "fieldName": "addUserToOrganization", /* Filled dynamically based on @function usage location */
  //   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
  //   "identity": { /* AppSync identity object via $ctx.identity */ },
  //   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
  //   "request": { /* AppSync request object. Contains things like headers. */ },
  //   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
  // }
  if (event.typeName) {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
      const resolver = typeHandler[event.fieldName];
      if (resolver) {
        return await resolver(event);
      }
    }
    throw new Error("Resolver not found.");
  }
};
