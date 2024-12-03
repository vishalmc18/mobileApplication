import React, { createContext, useContext, useEffect, useState } from "react";
import  { CallApi } from "../../graphQL/callApi";
import {CreateVehicleMutation,DeleteVehicleMutation} from '../../graphQL/mutation/vehicleMut';
import { useModal } from "./ModalProvider";
import { set } from "react-native-reanimated";
const VehicleContext = createContext();

export default function VehicleMutation({ children }) {
    const {setModalVisible, setModalText, setModalTitle} = useModal();

   const  CreateVehicle=(variables, showType)=> {
        try{
        CallApi("mutation", CreateVehicleMutation, variables).
        then((res) => {
            if(res){

                if(showType==="edit"){

                    setModalVisible(true);
                    setModalTitle("Vehicle Updated Successfully");
                }
                else if(showType==="create"){
                    setModalVisible(true);
                    setModalTitle("Vehicle Created Successfully");

                }
                else if(showType==="status"){
                    setModalVisible(true);
                    setModalTitle("Vehicle status changed successfully");
                
                }
            }
            else{
                setModalVisible(true);
                setModalTitle("Vehicle Update Failed");
                setModalText("Vehicle could not be updated due to some error");
                console.log("Error")}
        })
        }
        catch(err){
            console.log(err)
        }
    }

    const  DeleteVehicle=(variables)=> {
        try{
        CallApi("mutation", DeleteVehicleMutation, variables).
        then((res) => {
            if(res){
                setModalVisible(true);
                setModalTitle("Vehicle Deleted Successfully");

            }
            else{
                console.log("Error")}
                setModalVisible(true);
                setModalTitle("Vehicle Delete Failed");
        })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <VehicleContext.Provider value={{ CreateVehicle,DeleteVehicle }}>
            {children}
        </VehicleContext.Provider>
    )

}

export function useVehicleMutation() {
    return useContext(VehicleContext)
}