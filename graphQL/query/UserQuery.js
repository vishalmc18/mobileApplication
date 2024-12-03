import { gql } from '@apollo/client';

export const LoggedInUserDetailQuery = gql ` 
query GetUserProfileDetailByEmail($emailId: String!) {
    GetUserProfileDetail(userProfileEmail: $emailId) {
        userProfileDetailDto {
            userProfileId
            name
            userName
            email
            phoneNumber
            provingGroundId
            photoFileName
            mimeType
            photoBinary
            photoData
            cdsid
          }
          provingGroundList{
            provingGroundId
            provingGroundAddress
            provingGroundName
            provingGroundCode
            isArchived
            createdOn
            createdBy
            lastUpdate
            updatedBy
            isActive
            canBeDeleted
            canBeDisabled
            value:provingGroundId
            label:provingGroundName
          }
    }
  }
`;