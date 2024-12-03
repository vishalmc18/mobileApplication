import React from "react";
import { Text, View, TouchableOpacity,Image } from "react-native";
import styles from './styles/ListComponent.styles';
import {ListItem} from 'react-native-elements';
import SwipeableItem, {
  useSwipeableItemParams
} from "react-native-swipeable-item";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useModal } from "../../context/ModalProvider";
import { CallApi } from "../../graphQL/callApi";




const List = ({navigation,title,purpose,updatedBy,updatedByImage,mimeType,testCodeId,canBeDeleted, isArchived}) => {
    // console.log("title")

    const {setModalVisible, setModalText, setModalTitle} = useModal();

    const RemoveHtmlFromString = (text) => {
        if(text && text !== undefined && text !== "") {
           return text.replace(/<[^>]*>?|&nbsp;|&auml;|\n;/g, '');
        }
    }

    const GetShortenString = (text) =>{
        if(text && text !== undefined && text !== "") {
             return (text.length > 120) ? text.substring(0,90).concat('...') : text;
        }    
   }

   function UnderlayLeft(){
    const { close, percentOpen } = useSwipeableItemParams();
    return (
      <View style={[styles.underlay, styles.underlayLeft]}>
        <TouchableOpacity onPress={()=>handleDeletePressed(close)}>
        <MaterialIcons name="delete" size={42} color="red" />
        </TouchableOpacity>
      </View>
    );
   }

   function UnderlayRight(){
    const { close, percentOpen } = useSwipeableItemParams();
    return (
      <View style={[styles.underlay]}>
        <TouchableOpacity onPress={()=>handleStatusChangePressed(close)}>
        <FontAwesome name="file-text" size={42} color={isArchived === 1 ?"#009933":"#FFC200"} />
        </TouchableOpacity>
      </View>
    );
   }
   
   const handleStatusChangePressed = (close) => {
    
    console.log("status change pressed")
    close()
}

const handleDeletePressed = (close) => {

  if(canBeDeleted === false){
        setModalVisible(true);
        setModalTitle("Test Code Delete Failed");
        setModalText("Test Code can not be deleted as it is associated with some other entity");
    }
    else{

        
        // setModalVisible(true);
        // setModalTitle("Test Code Deleted Successfully");
        // setModalText("Test Code has been deleted successfully");
    }
    close()
}
    


return (
  <SwipeableItem
  // item={List}
  overSwipe={0}
  renderUnderlayLeft={() => <UnderlayLeft />}
  renderUnderlayRight={() =><UnderlayRight/>}
  snapPointsLeft={[60]}
  snapPointsRight={[60]}
>
  <View style={styles.containerStyles}>
    
    <ListItem 
         onPress={()=>{navigation.navigate("TestCode Details", {testCodeId:testCodeId})}}> 
  <ListItem.Content >
    <ListItem.Title style={{fontSize:18}}><Text>TestCode Name : {title}</Text></ListItem.Title>
    <ListItem.Subtitle style={{fontSize:18}}>Purpose : { GetShortenString( RemoveHtmlFromString(purpose))}</ListItem.Subtitle>
    <ListItem.Subtitle ><View style={{flex:1, flexDirection:'row'}}><Text style={{fontSize:18}}>Updated By : </Text><View style={styles.imageContainerStyle}><Image
            style={styles.imageStyle}
            source={{ uri: "data:image/" + mimeType + ";base64," + updatedByImage }}
            /></View><Text style={{fontSize:18}}> {updatedBy}</Text></View></ListItem.Subtitle>
  </ListItem.Content>
</ListItem>
</View>
</SwipeableItem>
  
);
    }

export default List;