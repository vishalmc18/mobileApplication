import React from 'react';
import {Text, View} from 'react-native';


const Lable = ({labelShow}) => {
    return (
        <View>
            {labelShow && <Text style={{color:'red', fontWeight:'bold'}}>*</Text>}
        </View>
    )
}

export default Lable;