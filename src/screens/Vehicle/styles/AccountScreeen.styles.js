import { StyleSheet } from "react-native";

export default StyleSheet.create({

    containerStyle: {    
        flex: 1,
        // alignItems: 'center',
        padding: 10,
        backgroundColor: '#F5FCFF',
    },
    headerStyle: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
    },
    imageContainerStyle: { width: 150,
        height: 150,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'},
    imageStyle: { width: 150, height: 150 },
    textLableStyle:{
        fontSize:18,
    },
    textContentStyle:{
        fontWeight:'bold',
    }    


})