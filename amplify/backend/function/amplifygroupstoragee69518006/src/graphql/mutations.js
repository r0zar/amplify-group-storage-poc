"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const createFile =
/* GraphQL */
exports.createFile = `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
const updateFile =
/* GraphQL */
exports.updateFile = `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
const deleteFile =
/* GraphQL */
exports.deleteFile = `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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