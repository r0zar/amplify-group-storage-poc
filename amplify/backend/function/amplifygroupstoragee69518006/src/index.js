/* Amplify Params - DO NOT EDIT
	API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYGROUPSTORAGEE_GRAPHQLAPIIDOUTPUT
	STORAGE_S325F98BC9_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const https = require("https");
const urlParse = require("url").URL;
const { getFile } = require("./graphql/queries");
const { createFile } = require("./graphql/mutations");

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
        const a = data.toString();
        const b = JSON.parse(a);
        resolve(b);
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

  console.log(event);

  // identify requesting user
  const requestingUserID = event.requestContext.identity.cognitoAuthenticationProvider.split(
    ":CognitoSignIn:"
  )[1];

  if (event.resource == "/files/{proxy+}") {
    if (event.httpMethod == "GET") {
      var proxy = decodeURI(event.pathParameters.proxy);
      var params = {
        Bucket: BUCKET,
        Key: proxy,
      };

      // lookup file where proxy == id
      const { data, errors } = await gql(getFile, "GetFile", {
        id: proxy,
      });
      if (errors) throw Error(JSON.stringify(errors));

      const requestedFile = data.getFile;

      // check if requester is a file owner/viewer
      if (requestedFile.owner == requestingUserID) {
        console.log("Owner is requesting their own file");
      } else if (
        requestedFile.viewers &&
        requestedFile.viewers.some((id) => id == requestingUserID)
      ) {
        console.log("Viewer is requesting a file shared with them");
      } else {
        console.error("File access request failed authorization");
        return { statusCode: 401, body: "Not authorized" };
      }

      var origimage = await s3.getObject(params).promise();

      try {
        var response = {
          headers: {
            "Content-Type": origimage.ContentType,
          },
          statusCode: 200,
          body: origimage.Body.toString("base64"),
          isBase64Encoded: true,
        };
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (event.resource == "/files") {
    if (event.httpMethod == "POST") {
      const key = event.body;

      var params = {
        Bucket: BUCKET,
        Key: `private/${REGION}:${requestingUserID}/${key}`,
      };

      // const { data, errors } = await gql(createFile, "CreateFile", {
      //   input: {
      //     id: params.Key,
      //     name: "",
      //     description: "",
      //     owner: "",
      //     viewers: [],
      //   },
      // });

      // var origimage = await s3.putObject(params).promise();

      // console.log(origimage);

      try {
        var response = {
          statusCode: 200,
          body: "success",
        };
        return response;
      } catch (error) {
        console.error(error);
      }
    }
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
