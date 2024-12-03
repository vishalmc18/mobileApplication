import {View, StyleSheet,Text,TouchableOpacity } from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import React,{useState,useEffect} from 'react';
import SwipeableItem, {
  useSwipeableItemParams
} from "react-native-swipeable-item";
import {useVehicleMutation} from '../context/vehicleMutaionProvider'
import { CallApi } from '../../graphQL/callApi';
import { VehicleDetailQuery } from '../../graphQL/query/vehicleQuery';
import {useModal} from '../context/ModalProvider';
import { set } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles/List.styles';

const List = ({navigation,vehicleDetail,refreshOnStatusChange}) => {

  const {setModalVisible, setModalText, setModalTitle} = useModal();
  const { CreateVehicle ,DeleteVehicle} = useVehicleMutation();

  const [vehicleDetailsToSend, setVehicleDetailsToSend] = useState([]);

  useEffect(() => {
    statusFetch();
  }, []);
  const statusFetch = async () => {
    try{
      const variables = { vehicleId: vehicleDetail.vehicleId };

    CallApi("query", VehicleDetailQuery, variables)
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res) {
          setVehicleDetailsToSend(res.data.GetVehicleDetail.vehicleDetail);
        } else {
        }
      });
  }
  catch(err){
    console.log(err)
  }
  }


const handleStatusChangePressed=async(close)=>{
  console.log(vehicleDetailsToSend.vehicleStatusId)
  if(vehicleDetailsToSend.vehicleStatusId===3){
    if(vehicleDetailsToSend.canBeArchived===false){
          setModalVisible(true);
          setModalTitle("Status Change Failed");
          setModalText("Vehicle can not be Archived as it is associated with some other entity");
        }
        else{
          vehicleDetailsToSend.vehicleStatusId=2;
       await  CreateVehicle(vehicleDetailsToSend, "status")

        }
      }
      else{
       vehicleDetailsToSend.vehicleStatusId=3;
       await  CreateVehicle(vehicleDetailsToSend, "status")
      }

      setTimeout(() => {
        close()
      }, 200);
      refreshOnStatusChange()
}

const handleDeletePressed=async(close)=>{
  if(vehicleDetailsToSend.canBeDeleted===false){
    setModalVisible(true);
    setModalTitle("Vehicle Delete Failed");
    setModalText("Vehicle can not be deleted as it is associated with some other entity");
  }
  else{
    setModalVisible(true);
    vehicleDetailsToSend.vehicleStatusId=4;
    const variables = { 
      vehicleId: vehicleDetail.vehicleId,
      isActive: 0,
      updatedBy: 10938, };
    await  DeleteVehicle(variables)
  }
  close()
}

  function UnderlayRight( ){
    const { close, percentOpen } = useSwipeableItemParams();
    return(
      <View style={[styles.underlay]}>
         <TouchableOpacity onPress={()=>handleStatusChangePressed(close)} style={{backgroundColor:'white',
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,}}>
        <View style={styles.textOnSwipeStyle}>{vehicleDetail.vehicleStatusId===3?<MaterialIcons name="car-repair" size={42} color="#FFC200" />:<FontAwesome5  name="car" size={42} color="#00A900" />}</View></TouchableOpacity>
      </View>
    )
      }

  function UnderlayLeft() {
    const { close, percentOpen } = useSwipeableItemParams();
    return(
      <View style={[styles.underlay, styles.underlayLeft]}>
        <TouchableOpacity onPress={()=>handleDeletePressed(close)} style={styles.swipeTouchableStyle}><View style={styles.textOnSwipeStyle}><MaterialIcons name="delete" size={42} color="red" /></View></TouchableOpacity>
      </View>
    )
      }
return (
  
  <SwipeableItem
  item={List}
  overSwipe={0}
  renderUnderlayLeft={() => <UnderlayLeft />}
  renderUnderlayRight={() => <UnderlayRight  />}
  snapPointsLeft={[60]}
  snapPointsRight={[60]}
>
  <View style={styles.containerStyles}>

    <ListItem onPress={()=>{navigation.navigate("Vehicle Details", {vehicleId:vehicleDetail.vehicleId})}}>
  <ListItem.Content >
    <ListItem.Title style={{fontSize:18}}>PoId : {vehicleDetail.poId}</ListItem.Title>
    {vehicleDetail.regNumber!=="" ?<ListItem.Subtitle style={{fontSize:18}}><Text>Registration Number : {vehicleDetail.regNumber}</Text></ListItem.Subtitle>: null}
    {vehicleDetail.projectNumber!==""?<ListItem.Subtitle style={{fontSize:18}}>Project Number : {vehicleDetail.projectNumber}</ListItem.Subtitle>:null}
  </ListItem.Content>
</ListItem>
</View>
</SwipeableItem>
)
}


export default List;
