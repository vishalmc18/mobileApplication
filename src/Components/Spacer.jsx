import React  from "react";
import { View,StyleSheet } from "react-native";
import styles from './styles/Spacer.styles'

const Spacer = ({children}) => {
    return <View style={styles.spacer}>{children}</View>
}


export default Spacer

