"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const getFile =
/* GraphQL */
exports.getFile = `
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
const listFiles =
/* GraphQL */
exports.listFiles = `
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
const filesByS3Path =
/* GraphQL */
exports.filesByS3Path = `
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