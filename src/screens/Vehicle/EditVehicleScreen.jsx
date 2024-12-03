import React ,{useState}from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Input ,Button } from 'react-native-elements';
import Spacer from '../../Components/Spacer'
import Lable from '../../Components/Lable'
import { useVehicleMutation } from '../../context/vehicleMutaionProvider';

const EditVehicleScreen = ({navigation,route}) => {
   
    const {CreateVehicle} = useVehicleMutation();

    const {vehicleDetails} = route.params;
    
    const [poId, setPoId] = useState(vehicleDetails.poId)
    const [ispoIdValid, setIsPoIdValid] = useState(false)
    const [carPlate, setCarPlate] = useState(vehicleDetails.regNumber)
    const [projectNumber, setProjectNumber] = useState(vehicleDetails.projectNumber)
    const [isprojectNumberValid, setIsProjectNumberValid] = useState(false)
    const [model, setModel] = useState(vehicleDetails.model)
    const [propellent, setPropellent] = useState(vehicleDetails.propellent)
    const [engine, setEngine] = useState(vehicleDetails.engine)
    const [orderNumber, setOrderNumber] = useState(vehicleDetails.orderNumber)
   
    const onPressSaveHandler = async() => {
        if(poId === "" || projectNumber === "" ) {
            if(poId === ""){
                setIsPoIdValid(true)
            }
            else{
                setIsProjectNumberValid(true)
            }
        }
        else{
            setIsPoIdValid(false)
            setIsProjectNumberValid(false)
            let deleteVehicles = {
                vehicleId:vehicleDetails.vehicleId ,
                vehicleDocumentMultipleIds: "",
                updatedBy: 10938,
                isActive: 0
              };
              const variables = {
                engine: engine? engine : "",
                fuel: propellent ? propellent : "",
                gearBox: vehicleDetails.gearBox? vehicleDetails.gearBox : "",
                keyNumber: vehicleDetails.keyNumber? vehicleDetails.keyNumber : "",
                mileage: vehicleDetails.mileage? vehicleDetails.mileage : "",
                model: model? model : "",
                orderInfo:vehicleDetails.orderInfo? vehicleDetails.orderInfo : "",
                orderNumber: orderNumber? orderNumber : "",
                poId: poId,
                projectNumber: projectNumber? projectNumber : "",
                provingGroundId: 2,
                regNumber: carPlate,
                vehicleId: vehicleDetails.vehicleId,
                vehicleStatusId: 2,
                isActive: 1,
                createdBy: vehicleDetails.createdBy,
                updatedBy: 10938,
                vehicleDocumentDto: [],
                vehicleDocDeleteDto: deleteVehicles
            }
            await CreateVehicle(variables,"edit");
            navigation.navigate('VehicleList');
        }
    }
    return (
        <>
        <Spacer>
            <ScrollView>
                <View>
                    <Text style={{fontSize:20, paddingLeft:10, fontWeight:'bold'}}>Edit Vehicle</Text>
                    <Lable labelShow={ispoIdValid} />
                    <Input label="Vehicle Po ID" value={poId} onChangeText={(input) => setPoId(input)} />
                    <Input label="Registration Number" value={carPlate} onChangeText={(input) => setCarPlate(input)} />
                    <Lable labelShow={isprojectNumberValid} />
                    <Input label="Project Number" value={projectNumber} onChangeText={(input) => setProjectNumber(input)} />
                    <Input label="Model" value={model} onChangeText={(input) => setModel(input)} />
                    <Input label="Propellent" value={propellent} onChangeText={(input) => setPropellent(input)} />
                    <Input label="Engine" value={engine} onChangeText={(input) => setEngine(input)} />
                    <Input label="Order Number" value={orderNumber} onChangeText={(input) => setOrderNumber(input)} />
                    <Button title="Save" onPress={onPressSaveHandler}/>
                </View>
            </ScrollView>
            </Spacer>
            </>
            );
    }
export default EditVehicleScreen;
