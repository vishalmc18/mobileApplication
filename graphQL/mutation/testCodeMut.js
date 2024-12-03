import { gql} from "@apollo/client";

import { gql } from "@apollo/client";

export const CreateTestCodeMutation = gql`
mutation    
testCodeCreate (
    $testCodeId: Int!, 
    $testCodeName: String!, 
    $testCodePurpose: String!, 
    $testCodeTypeId: Int!, 
    $isArchived: Int!, 
    $isActive: Int!, 
    $createdBy: Int!, 
    $updatedBy: Int!
    )
{
        CreateTestCode(testCode: {
            testCodeId:$testCodeId,
            testCodeName: $testCodeName,
            testCodePurpose: $testCodePurpose,
            testCodeTypeId: $testCodeTypeId,
            isArchived:$isArchived,
            isActive:$isActive,
            createdBy:$createdBy,
            updatedBy: $updatedBy
        })
      }
`;

export const DeleteTestCodeMutation = gql`  
    mutation
    deleteTestCode(
        $testCodeId: Int!,
        $isActive: Int!,
        $updatedBy: Int!,
        )
        {
            DeleteTestCode(testCode:  
        {
            testCodeId: $testCodeId,
            isActive: $isActive,
            updatedBy: $updatedBy,
            
        })
    }
`;

export const UpdateTestCodeMutation = gql`
    mutation
    updateTestCode(
        $testCodeId: Int!,
        $isArchived: Int!,
        $updatedBy: Int!,
        $testCodeName: String!,
        $testCodePurpose: String!,
        $testCodeTypeId: Int!
        )
        {
            CreateTestCode(testCode:  
        {
            testCodeId:$testCodeId,
            isArchived: $isArchived,
            updatedBy:$updatedBy,
            testCodeName:$testCodeName,
            testCodePurpose:$testCodePurpose,
            testCodeTypeId: $testCodeTypeId
        })
    }
`;
