/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      name
      description
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
export const filesByS3Path = /* GraphQL */ `
  query FilesByS3Path(
    $s3Path: String
    $sortDirection: ModelSortDirection
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    filesByS3Path(
      s3Path: $s3Path
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
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
