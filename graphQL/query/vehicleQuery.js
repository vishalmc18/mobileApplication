import { gql } from "@apollo/client";

export const VehicleListQuery = gql`
query GetVehicleListQry($provingGroundId: Int!) {
  GetVehicleList(provingGroundId: $provingGroundId) {
    defaultProvingGroundId
    vehicleDetail {
      vehicleId
      vehicleStatusId
      provingGroundId
      poId
      regNumber
      projectNumber
      model
      keyNumber
      engine
      fuel
      gearBox
      mileage
      orderNumber
      orderInfo
      createdOn
      createdBy
      lastUpdate
      updatedBy
      isActive
      canBeDeleted
    }
    provingGroundDetail {
      value:provingGroundId
      label:provingGroundName
    }
  }
}
`;

export const VehicleDetailQuery = gql` 
query GetVehicleDetailQry($vehicleId: Int!) {
  GetVehicleDetail(vehicleId: $vehicleId) {
    vehicleDetail {
      vehicleId
      vehicleStatusId
      provingGroundId
      poId
      regNumber
      projectNumber
      model
      keyNumber
      engine
      fuel
      gearBox
      mileage
      orderNumber
      orderInfo
      createdOn
      createdBy
      lastUpdate
      updatedBy
      isActive
      canBeDeleted
      canBeArchived
    }
    vehicleStatusDetail{
     vehicleStatusId
     vehicleStatusName
     vehicleStatusDescription
     vehicleStatusIsActive
     isSelected
    }
    vehicleDocumentDetailList{
     vehicleDocumentId
     isActive
     binaryData
     vehicleId
     fileName
     documentName
     fileType
     mimeType
    }
    vehicleDocumentEmptyResponse {
     vehicleDocumentId
     isActive
     binaryData
     vehicleId
     fileName
     documentName
     fileType
     mimeType
    }
  }
}
`;