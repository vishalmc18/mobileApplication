
import React from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import styles from './styles/Loading.styles';

const Loading = () => {
    return <View style={styles.loadingStyles}><ActivityIndicator size="large" color="#00ff00" /></View>
};

export default Loading;