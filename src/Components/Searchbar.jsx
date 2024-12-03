import React , {useState} from 'react';
import { View,TextInput,StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles/Searchbar.styles'

const SearchBar = ({term,onTermChange,onTermSubmit}) => {

    return (
        <View style={styles.backgroundStyle}>
            <FontAwesome style={styles.iconStyles} name="search"  color="black" />
            <TextInput style={styles.inputStyle} autoCapitalize='none' autoCorrect={false} value={term} onEndEditing={onTermSubmit} onChangeText={onTermChange} placeholder='Search'/>
        </View>
    );
};


export default SearchBar;