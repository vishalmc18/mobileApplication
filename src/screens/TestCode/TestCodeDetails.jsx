import React,{useState, useEffect} from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { CallApi } from "../../../graphQL/callApi";
import { TestCodeDetailQuery } from "../../../graphQL/query/TestCodeQuery";
import styles from "./styles/TestCodeDetails.styles";
import { FontAwesome } from '@expo/vector-icons';


export default function TestCodeDetails({navigation,route}) {

    const {testCodeId} = route.params;
    const [testCodeDetails, setTestCodeDetails] = useState([{}]);


    useEffect(() => {
        getTestCodeDetails();
    }
    , []);

    const getTestCodeDetails = async () => {
            try{
                const variables = { testCodeId: testCodeId };
                CallApi("query", TestCodeDetailQuery, variables)
                .then((res) => {
                    return res;
                })  
                .then((res) => {
                    if (res) {
                        setTestCodeDetails(res.data.GetTestCodeDetail);
                        console.log(res.data.GetTestCodeDetail.isArchived)
                        
                    } else {
                        console.log("error")
                    }
                });
            }
            catch(err){
                console.log(err)
            }
        }
        
    const RemoveHtmlFromString = (text) => {
        if(text && text !== undefined && text !== "") {
           return text.replace(/<[^>]*>?|&nbsp;|&auml;|\n;/g, '');
        }
    }
    

    return (
        <>
        <View style={styles.containerStyles}>
            <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}>
                <View style={styles.iconContainerStyle}>
                    <View> 
                <FontAwesome name="file-text" size={30} color={testCodeDetails.isArchived === 1?"#FFC200":"#009933"} />
                    </View>
                </View>
            </View>
            
            
            <View style={{flex:1, alignContent:'center', justifyContent:'center', alignItems:'center'}}>

                <TouchableOpacity onPress={()=> navigation.navigate("Edit TestCode")} disabled = {testCodeDetails.isArchived === 0 ? true : false}>
                    <View style={styles.touchableButtonStyle}>
                        <Text style={{color: testCodeDetails.isArchived === 0 ? "grey" : "black"}}>Edit</Text>
                    </View>
                </TouchableOpacity>
                {/* {testCodeDetails.isArchived === 0 ? 
            <TouchableOpacity  disabled={true}><Text>Edit</Text></TouchableOpacity> : 
            <TouchableOpacity  onPress={()=> navigation.navigate("Edit TestCode")} ><Text>Edit</Text></TouchableOpacity>} */}
            
        </View>
            
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false} >
            {testCodeDetails.testCodeName ? <Text style={styles.textStyles}>Test Code Details : <Text style={styles.valueStyles}>{testCodeDetails.testCodeName}</Text></Text>:null}
            {testCodeDetails.testCodePurpose ? <Text style={styles.textStyles}>Test Code Purpose : <Text style={styles.valueStyles}>{RemoveHtmlFromString(testCodeDetails.testCodePurpose)}</Text></Text>:null}
            </ScrollView>
        </View>
        </>
    );
    }