import { gql } from '@apollo/client';

export const TestCodeListQuery = gql ` {
   GetTestCodeList {
            testCodeId
            testCodeName
            testCodePurpose
            testCodeType
            testCodeTypeId
            testCodeTypeDescription
            updatedBy
            updatedByName
            updatedByImage
            mimeType
            fileName
            lastUpdate
            isArchived
            canBeDeleted
      
  } }`;


  export const TestCodeDetailQuery = gql ` 
    query GetTestCodeDetailQry($testCodeId: Int!) {
        GetTestCodeDetail(testCodeId: $testCodeId) {
          testCodeId 
          testCodeName 
          testCodePurpose 
          testCodeType
          testCodeTypeId
          testCodeTypeDescription
          updatedBy 
          lastUpdate 
          isArchived 
          canBeDeleted 
        }
      }
    
  `;
  