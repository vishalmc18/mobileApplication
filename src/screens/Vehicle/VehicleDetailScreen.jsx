import React,{useEffect,useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {Button} from 'react-native-elements';
import { CallApi } from '../../../graphQL/callApi';
import {VehicleDetailQuery} from '../../../graphQL/query/vehicleQuery';
import styles from './styles/Vehicledetails.styles';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

let vehStat=3;
const TrackDetailScreen = ({route,navigation}) => {
  const [vehicleDetails, setVehicleDetails] = useState([{}]);

  const {vehicleId} = route.params;

  useEffect(() => {
    getVehicleDetails();
  }, []);

  const getVehicleDetails = async () => {
    try{
      const variables = { vehicleId: vehicleId };
      console.log(variables)
    CallApi("query", VehicleDetailQuery, variables)
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res) {
          setVehicleDetails(res.data.GetVehicleDetail.vehicleDetail);
          vehStat=(res.data.GetVehicleDetail.vehicleDetail.vehicleStatusId)
        } else {
          console
        }
      });
  }
  catch(err){
    console.log(err)
  }}
const onPressEditHandler = ()=>{
  navigation.navigate("Edit Vehicle",{vehicleDetails:vehicleDetails})
}

  return (
    <View style={styles.containerStyles}>
      <View style={{flexDirection:"row"}}>
      <View style={{flex:1, marginTop:2}}>
      {vehicleDetails.vehicleStatusId===3 ? 
      <View style={styles.iconContainerStyle}><View style={styles.iconStyles}><FontAwesome5  name="car" size={30} color="#00A900" /></View></View>:
      <View style={styles.iconContainerStyle}><View style={styles.iconStyles}><MaterialIcons name="car-repair" size={30} color="#FFC200" /></View></View>}
 
        </View>
        <View style={{flex:1}}>
      {vehicleDetails.vehicleStatusId===3 ? <Button title='Edit' disabled/>:<Button title='Edit' onPress={onPressEditHandler} />}
        </View>
      </View>
      {vehicleDetails.poId!=="" ? <Text style={styles.HeaderStyles}>Po Id : <Text style ={ styles.valueStyles}></Text>{vehicleDetails.poId}</Text>:null}
      {vehicleDetails.regNumber!=="" ? <Text style={styles.textStyles}>Registration Number : <Text style={styles.valueStyles}> {vehicleDetails.regNumber}</Text></Text>:null}
      {vehicleDetails.projectNumber!=="" ? <Text style={styles.textStyles}>Project Number : <Text style={styles.valueStyles}>{vehicleDetails.projectNumber}</Text></Text>:null}
      {vehicleDetails.model!=="" ? <Text style={styles.textStyles}>Model : <Text style={styles.valueStyles}>{vehicleDetails.model}</Text> </Text>:null}
      {vehicleDetails.engine!=="" ? <Text style={styles.textStyles}>Engine : <Text style={styles.valueStyles}>{vehicleDetails.engine}</Text></Text>:null}
      {vehicleDetails.fuel!=="" ? <Text style={styles.textStyles}>Fuel : <Text style={styles.valueStyles}>{vehicleDetails.fuel}</Text></Text>:null}
      {vehicleDetails.keyNumber!=="" ? <Text style={styles.textStyles}>Key Number : <Text style={styles.valueStyles}>{vehicleDetails.keyNumber}</Text></Text>:null}
      {vehicleDetails.mileage!=="" ? <Text style={styles.textStyles}>Mileage : <Text style={styles.valueStyles}>{vehicleDetails.mileage}</Text></Text>:null}

    </View>
  );
};



export default TrackDetailScreen;
