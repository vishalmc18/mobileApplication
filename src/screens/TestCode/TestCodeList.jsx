import React,{useState,useEffect} from "react";
import { Text, View , FlatList, TouchableOpacity, RefreshControl } from "react-native";
import SearchBar from '../../Components/Searchbar'
import { CallApi } from "../../../graphQL/callApi";
import { TestCodeListQuery } from "../../../graphQL/query/TestCodeQuery";
import List from "./ListComponent";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles/TestCodeList.styles'


const TestCodeList = ({navigation}) => {
  const [testCodeList, setTestCodeList] = useState([])
  const [testCodeShowList, setTestCodeShowList] = useState([])
  const [active, setActive] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageNumber , setPageNumber] = useState(1)
  const [resultsToDisplay, setResultsToDisplay] = useState()
  const [refrehing, setRefrehing] = useState(false)


  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setActive(0)
    getTestCodeList();
    setRefreshing(false);
  }, []);

const pageitems = 5;
  useEffect(() => {
    getTestCodeList();
  }
  , []);

  const getTestCodeList = async () => {

    setLoading(true)
    try{
    CallApi("query", TestCodeListQuery)
    .then((res) => {
      return res;
    })
    .then((res) => {
      if (res) {
          // console.log(res.data.GetTestCodeList)
        const results = res.data.GetTestCodeList
        const resultsMore = results.filter((item)=>{
          console.log(typeof(item.isArchived))
          return item.isArchived=== active
        })
         setResultsToDisplay(resultsMore.slice(0,pageitems))
        setTestCodeShowList(resultsMore);
        console.log(resultsMore.length)
        
        setTestCodeList(results)
        setPageNumber(2)
      } else {
        
      }
    });}
    catch(err){
      console.log(err)
    }
    setLoading(false)

  }

  const onPressActiveHandler = () =>{
    setPageNumber(2)
    setLoading(true)
    setActive(0)
    const results =testCodeList.filter((item)=>{
      return item.isArchived === 0
    })
    setResultsToDisplay(results.slice(0, 1 * pageitems));
    setTestCodeShowList(results)
    setLoading(false)
  }

  const onPressArchiveHandler = () =>{
    setPageNumber(2)
    setLoading(true)
    setActive(0)
    const results =testCodeList.filter((item)=>{
      return item.isArchived === 1
    })
    setResultsToDisplay(results.slice(0, 1 * pageitems));
    setTestCodeShowList(results)
    setLoading(false)
  }

  const onEndReached = () =>{
    setPageNumber(pageNumber + 1)
    setResultsToDisplay(testCodeShowList.slice(0, pageNumber * pageitems));

  }
  
  const onTermSubmit = (newTerm)=>{
    setTerm(newTerm)
    const results = testCodeList.filter((item)=>{
      try{
        if(item.testCodeName !== null ){
          return item.testCodeName.toLowerCase().includes(newTerm.toLowerCase()) && item.isArchived===active
        }
      }
      catch(err){
        console.log(err)
      }
     })
     setResultsToDisplay(results.slice(0, 1 * pageitems));
     setTestCodeShowList(results)
     setPageNumber(2);
  }

  if(loading){
    return <Text>Loading...</Text>
  }
  return (
    <View>
      <View style={{ flexDirection:'row'}} >
        <View style={styles.iconContainerStyles} > 
        <TouchableOpacity onPress={onPressActiveHandler}>
      <FontAwesome name="file-text" size={42} color="#009933" />
        </TouchableOpacity>
        </View>
        <View style={styles.iconContainerStyles}>
          <TouchableOpacity onPress={onPressArchiveHandler}>
      <FontAwesome name="file-text" size={42} color="#FFC200" />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainerStyles}>
      <FontAwesome5 name="file-signature" size={42} color="black" />
        </View>
      </View>
      <View>
        <SearchBar  term={term} onTermChange={(newTerm)=>{onTermSubmit(newTerm)}}/>
      </View>


      <View>
        <FlatList
          data={resultsToDisplay}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
           onEndReached()
          }}
          keyExtractor={(item) => item.testCodeId.toString()}
          renderItem={({ item }) => {
            return <List title={item.testCodeName}isArchived={item.isArchived}canBeDeleted={item.canBeDeleted} testCodeId={item.test} purpose={item.testCodePurpose} mimeType={item.mimeType} updatedByImage={item.updatedByImage} updatedBy={item.updatedByName}  navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );


}

export default  TestCodeList