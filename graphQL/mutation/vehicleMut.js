import { gql } from "@apollo/client";

export const CreateVehicleMutation = gql`
mutation    
vehicleCreate  (
    $vehicleId: Int!, 
    $poId: String!, 
    $projectNumber: String!, 
    $provingGroundId: Int!,
    $regNumber: String!, 
    $model: String!,
    $keyNumber: String!,
    $engine: String!,
    $fuel: String!,
    $gearBox: String!,
    $mileage: String!,
    $orderNumber: String!,
    $orderInfo: String!,
    $vehicleStatusId: Int!,
    $isActive: Int!, 
    $createdBy: Int!, 
    $updatedBy: Int!
        )
{
        CreateVehicle(vehicle: 
        {
            vehicleId: $vehicleId  
            poId: $poId, 
            projectNumber: $projectNumber, 
            provingGroundId: $provingGroundId, 
            regNumber: $regNumber,  
            model: $model, 
            keyNumber: $keyNumber, 
            engine: $engine, 
            fuel: $fuel, 
            gearBox: $gearBox, 
            mileage: $mileage, 
            orderNumber: $orderNumber, 
            orderInfo: $orderInfo, 
            vehicleStatusId: $vehicleStatusId, 
            isActive: $isActive, 
            createdBy: $createdBy, 
            updatedBy: $updatedBy
        })
      }
`;



export const DeleteVehicleMutation = gql`  
    mutation
    deleteVehicle(
        $vehicleId: Int!,
        $isActive: Int!,
        $updatedBy: Int!,
        )
        {
            DeleteVehicle(vehicle:  
        {
            vehicleId: $vehicleId,
            isActive: $isActive,
            updatedBy: $updatedBy,
            
        })
    }
`;