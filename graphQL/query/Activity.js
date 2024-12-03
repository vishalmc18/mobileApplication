import {gql} from '@apollo/client';

export const userActivityQry = gql`

query GetActivityListMobile(
    $testId : Int!,
    $vehicleId : Int!,
    $minSize : Int!,
    $maxSize : Int!,
    $userProfileId : Int!,
    ){
    GetActivityListMobile(
        activityDto : { 
        testId : $testId,
        vehicleId : $vehicleId,
        minSize : $minSize,
        maxSize : $maxSize,
        userProfileId : $userProfileId
        }
    ){
        testActivityId 
        typeLable 
        description 
        cycleDescription 
        userName 
        activityTypeId 
        createdOn
        
    }
}

`