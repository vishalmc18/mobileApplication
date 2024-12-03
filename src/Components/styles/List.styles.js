import { StyleSheet } from "react-native";

export default StyleSheet.create( {
    containerStyles:{
      marginHorizontal:10,
      marginVertical:5,
      //borderWidth:3,
      borderRadius:10,
      backgroundColor:'grey',
      borderColor:"black",
    },
    swipeTouchableStyle:{
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,
    },
    textOnSwipeStyle:{
      fontWeight: 'bold',
       padding:6,
    },
    underlay: {
      position: 'absolute',
      flexDirection: "row",
      flex: 1,
      width: 75,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center"
  },
  underlayLeft: {
      right: 0,
  },
  }
 );