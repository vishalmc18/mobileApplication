import React,{useEffect, useState} from 'react';
import { View,FlatList, RefreshControl,ScrollView, Text,TextInput,TouchableOpacity, ActivityIndicator } from 'react-native';
import {Button} from 'react-native-elements';
import {CallApi} from '../../../graphQL/callApi';
import { VehicleListQuery } from '../../../graphQL/query/vehicleQuery';
import List from '../../Components/ListVehicle';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles/VehicleListScreen.styles';
import { set } from 'react-native-reanimated';
import SearchBar from '../../Components/Searchbar';

const TrackListScreen = ({navigation}) => {

  const [VehicleList, setVehicleList] = useState([])
  const [vehicleShowList, setVehicleShowList] = useState([])
  const [active, setActive] = useState(3)
  const [refreshing, setRefreshing] = React.useState(false);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageNumber , setPageNumber] = useState(1)
  const [resultsToDisplay, setResultsToDisplay] = useState()

  const pageitems = 8;


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getVeicleList();
    setActive(3)
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getVeicleList();
  }, []);
  
  const statusChangeRefresh = ()=>{
    setLoading(true)
    console.log("refrehing");
    getVeicleList();
    setLoading(false)
  }

  const getVeicleList = async () => {
  const variables = { provingGroundId: 2 };
  setLoading(true)
  try{
  CallApi("query", VehicleListQuery, variables)
  .then((res) => {
    return res;
  })
  .then((res) => {
    if (res) {
      const results = res.data.GetVehicleList
      const resultsMore = results.vehicleDetail.filter((item)=>{
        return item.vehicleStatusId===active
      })
      setResultsToDisplay(resultsMore.slice(0,pageitems))
      setVehicleShowList(resultsMore);
      setVehicleList(results)
      setPageNumber(2)
      setLoading(false)
    } else {
      
    }
  });}
  catch(err){
    console.log(err)
  }
  
  }


  
  const loadMoreResults = () => {
    setResultsToDisplay(vehicleShowList.slice(0, pageNumber * pageitems));
    setPageNumber(pageNumber + 1);
  }
  const onPressActiveHandler = ()=>{
    setActive(3)
    setLoading(true)
    const results = VehicleList.vehicleDetail.filter((item)=>{
      return item.vehicleStatusId===3
     })
     setResultsToDisplay(results.slice(0, 1 * pageitems));
     setVehicleShowList(results)
     setPageNumber(2);
     setLoading(false)
    
  } 
  const onPressArchiveHandler = ()=>{
    setActive(2)
    setLoading(true)
    const results = VehicleList.vehicleDetail.filter((item)=>{
      return item.vehicleStatusId===2
     })
     setResultsToDisplay(results.slice(0, 1 * pageitems));
    setVehicleShowList(results)
    setPageNumber(2);
    setLoading(false)
  }

  const onTermSubmit = (newTerm)=>{
    setTerm(newTerm)
    const results = VehicleList.vehicleDetail.filter((item)=>{
      try{
        if(item.poId !== null ){
          return item.poId.toLowerCase().includes(newTerm.toLowerCase()) && item.vehicleStatusId===active
        }
      }
      catch(err){
        console.log(err)
      }
     })
     setResultsToDisplay(results.slice(0, 1 * pageitems));
     setVehicleShowList(results)
     setPageNumber(2);
  }

  const onCreateVehiclePressed = ()=>{
    navigation.navigate('Edit Vehicle')
  }
  
  if(loading){
    return <View style={styles.loadingStyles}><ActivityIndicator size="large" color="#00ff00" /></View>
  }
  return (
  <View>
    
   <View style={{flexDirection:"row"}}>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}><TouchableOpacity style={[styles.vehicleIconStyles,active===3?styles.underlineStyle:null]} onPress={onPressActiveHandler}><View style={styles.iconPaddingStyles}><FontAwesome5  name="car" size={42} color="#009933" /></View></TouchableOpacity></View>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}><TouchableOpacity style={[styles.vehicleIconStyles,active===2?styles.underlineStyle:null]} onPress={onPressArchiveHandler}><View style={styles.iconPaddingStyles}><MaterialIcons name="car-repair" size={42} color="#FFC200" /></View></TouchableOpacity></View>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}><TouchableOpacity style={styles.createVehicleButtonStyles} onPress={onCreateVehiclePressed}><Text style={styles.createVehicleButtonTextStyles}>Create New Car</Text></TouchableOpacity></View>
   </View>
   {/* <View style={styles.backgroundStyle}>
            <FontAwesome style={styles.iconStyles} name="search"  color="black" />
            <TextInput style={styles.inputStyle} value={term}  onChangeText={(newTerm)=>{onTermSubmit(newTerm)}} autoCapitalize='none' autoCorrect={false} placeholder='Search'/>
            
    </View> */}

    <SearchBar term={term} onTermChange={(newTerm)=>{onTermSubmit(newTerm)}} />  
 
  <FlatList
  data={resultsToDisplay}
  // keyExtractor={(item)=>item.vehicleId}
  numColumns={1} 
  nestedScrollEnabled={true}
  onEndReached={() => loadMoreResults()}
  onEndReachedThreshold={0.1} 
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  renderItem={({item})=>{
    return <List refreshOnStatusChange={statusChangeRefresh} vehicleDetail={item} poId={item.poId} statusId={item.vehicleStatusId} navigation={navigation}  />
  }}
  />

  </View>
  );
};


export default TrackListScreen;
