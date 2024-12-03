import React from "react";
import VehicleMutation from "./src/context/vehicleMutaionProvider";
import ShowModal from "./src/context/ModalProvider";
import NavigationThemeContainer from "./src/stack/NavigationContainer";



export default ()=> {
  return (
      <ShowModal>
    <VehicleMutation>
      
        <NavigationThemeContainer/>
      
    </VehicleMutation>
      </ShowModal>
  )
}
