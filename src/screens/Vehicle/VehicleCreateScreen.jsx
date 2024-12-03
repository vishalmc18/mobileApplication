import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from '../../Components/Spacer';
import Lable from '../../Components/Lable'
import { useVehicleMutation } from '../../context/vehicleMutaionProvider';
import { set } from 'react-native-reanimated';

const TrackCreateScreen = ({ navigation,route }) => {
    const [isCreate, setIsCreate] = useState(true)
    const [poId, setPoId] = useState('');
    const [ispoIdValid, setIsPoIdValid] = useState(false)
    const [carPlate, setCarPlate] = useState('');
    const [projectNumber, setProjectNumber] = useState('');
    const [isprojectNumberValid, setIsProjectNumberValid] = useState(false)
    const [model, setModel] = useState('');
    const [propellent, setPropellent] = useState('');
    const [engine, setEngine] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    const { CreateVehicle } = useVehicleMutation();


    useEffect (()=>{
        if(route.params ){
            const {vehicleDetails} = route.params;
            if(vehicleDetails){
                setPoId(vehicleDetails.poId)
                setCarPlate(vehicleDetails.regNumber)
                setProjectNumber(vehicleDetails.projectNumber)
                setModel(vehicleDetails.model)
                setPropellent(vehicleDetails.fuel)
                setEngine(vehicleDetails.engine)
                setOrderNumber(vehicleDetails.orderNumber)
                // setIsCreate(false)
            }
           
        }
        else{
            // setIsCreate(true)
        }

    },[route.params])
        
    

    const onPressSaveHandler = () => {
        if(poId === "" || projectNumber === "" ) {
            if(poId === ""){
                if(projectNumber === ""){
                    setIsPoIdValid(true)
                    setIsProjectNumberValid(true)
                }
                else{
                    setIsPoIdValid(true)
                    setIsProjectNumberValid(false)
                }
            }
            else{
                setIsProjectNumberValid(true)
                setIsPoIdValid(false)
            }
        }
        else{
            setIsPoIdValid(false)
            setIsProjectNumberValid(false)
            let deleteVehicles = {
                vehicleId:0 ,
                vehicleDocumentMultipleIds: "",
                updatedBy: 10938,
                isActive: 0
              };
              const variables = {
                engine: engine? engine : "",
                fuel: propellent ? propellent : "",
                gearBox:  "",
                keyNumber: "",
                mileage: "",
                model: model? model : "",
                orderInfo: "",
                orderNumber: orderNumber? orderNumber : "",
                poId: poId,
                projectNumber: projectNumber? projectNumber : "",
                provingGroundId: 2,
                regNumber: carPlate,
                vehicleId: route.params ? route.params.vehicleDetails.vehicleId : 0,
                vehicleStatusId: 3,
                isActive: 1,
                createdBy: 10938,
                updatedBy: 10938,
                vehicleDocumentDto: [],
                vehicleDocDeleteDto: deleteVehicles
            }
            CreateVehicle(variables,"create");
            {route.params ? navigation.goBack() : navigation.navigate('VehicleList')}
            //navigation.navigate('VehicleList');
        }}

    const onDiscardClick = () => {
        setPoId('');
        setCarPlate('');
        setProjectNumber('');
        setModel('');
        setPropellent('');
        setEngine('');
        setOrderNumber('');
        
        navigation.goBack();
    }        

    return (
        <>
        <View>
            <Spacer>
                <ScrollView>
                    <View >
                        <Lable labelShow={ispoIdValid} />
                        <Input label="Vehicle Po ID" value={poId} onChangeText={(input) => setPoId(input)} />
                        <Input label="Registration Number" value={carPlate} onChangeText={(input) => setCarPlate(input)} />
                        <Lable labelShow={isprojectNumberValid} />
                        <Input label="Project Number" value={projectNumber} onChangeText={(input) => setProjectNumber(input)} />
                        <Input label="Model" value={model} onChangeText={(input) => setModel(input)} />
                        <Input label="Propellent" value={propellent} onChangeText={(input) => setPropellent(input)} />
                        <Input label="Engine" value={engine} onChangeText={(input) => setEngine(input)} />
                        <Input label="Order Number" value={orderNumber} onChangeText={(input) => setOrderNumber(input)} />
                        <View style={{display:'flex', flexDirection:'row'}}>
                        <Button title={route.params ? "Save Car" : "Create New Car"} onPress={onPressSaveHandler} />
                        <Button title="Discard Car" color="#FF0000" onPress={onDiscardClick}/> 
                        </View>
                    </View>
                </ScrollView>
            </Spacer>
         </View>
        </>
    );
};

export default TrackCreateScreen;
   

   