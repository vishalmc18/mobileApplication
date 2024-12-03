import React  from "react";
import { View,StyleSheet } from "react-native";
import styles from './styles/Spacer.styles'

const Spacer = ({children}) => {
    return <View style={{marginVertical:5}}>{children}</View>
}


export default Spacer

