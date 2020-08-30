/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const readFile = /* GraphQL */ `
  query ReadFile($input: FileData) {
    readFile(input: $input)
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      name
      description
      url
      s3Path
      owner
      viewers
      createdAt
      updatedAt
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        url
        s3Path
        owner
        viewers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
