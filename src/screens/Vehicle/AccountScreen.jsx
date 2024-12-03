import React,{useEffect,useState} from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles  from './styles/AccountScreeen.styles';
import Loading from '../../Components/Loading';
import { LoggedInUserDetailQuery } from '../../../graphQL/query/UserQuery';
import {userActivityQry} from '../../../graphQL/query/Activity';
import { CallApi } from '../../../graphQL/callApi';
import SpacerVertical from '../../Components/SpacerVerticle';
import ActivityCell from '../../Components/AcitvityCell'

const AccountScreen = () => {

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userActivity, setUserActivity] = useState(null)
  const [chunkIndex, setChunkIndex] = useState(1)  

  useEffect(() => {
    getUserDetails();
    getUserActivity();
  }, [])
  const getUserDetails = async () => {
    try{

      CallApi("query", LoggedInUserDetailQuery, {emailId:'vishal.chavan.2@volvocars.com'})
      .then((response) => {
          if(response){
            setUserDetails(response.data.GetUserProfileDetail.userProfileDetailDto)
            setLoading(false)
          }
      })
    }
    catch(e){
      console.log(e)
    }
  }

  const getUserActivity = async () => {
    try{
      const min = (10 * chunkIndex) - 10;
    const max = 10 * (chunkIndex + 1) - 10;
      const variables = { 
        testId:0,
        vehicleId:0,
        minSize:min,
        maxSize:max,
        userProfileId:10938
      }
      CallApi("query", userActivityQry, variables)
      .then((response) => {
          if(response){
            if(userActivity === null){
              setUserActivity(response.data.GetActivityListMobile)
            }
            else{
              setUserActivity(userActivity.concat(response.data.GetActivityListMobile))
            }
            setChunkIndex(chunkIndex + 1)
          }
          else{
            console.log("No data found")
          }
      })
    }
    catch(e){
      console.log(e)
    }
  }

  if(loading){
    return <Loading></Loading>
  }
  return (
    <View style={styles.containerStyle}>
      
    <FlatList  ListHeaderComponent={()=>
    <>
    <View style={styles.containerStyle}>
    <Text style={styles.headerStyle}>User Details</Text>
    <View style={styles.imageContainerStyle}
        >

    <Image
            style={styles.imageStyle}
            source={{ uri: "data:image/" + userDetails.mimeType + ";base64," + userDetails.photoData }}
            />
            </View>
    <SpacerVertical/>
    <Text> <Text style={styles.textLableStyle}>Name -  </Text> <Text style={[styles.textContentStyle,styles.textLableStyle]}>{userDetails.name}</Text></Text>
    <SpacerVertical/>
    <Text> <Text style={styles.textLableStyle}>CDSID -  </Text> <Text style={[styles.textContentStyle,styles.textLableStyle]}>{userDetails.cdsid}</Text></Text>
    <SpacerVertical/>
    <Text> <Text style={styles.textLableStyle}>Email -  </Text> <Text style={[styles.textContentStyle,styles.textLableStyle]}>{userDetails.email}</Text></Text>
    <SpacerVertical/>
    <Text> <Text style={styles.textLableStyle}>Phone Number -  </Text> <Text style={[styles.textContentStyle,styles.textLableStyle]}>{userDetails.phoneNumber}</Text></Text>
    <SpacerVertical/>
    <Text style={[styles.textContentStyle,styles.textLableStyle]}>Test Activity</Text>
    <SpacerVertical/>
    </View>
    </>
} 

data={userActivity}
renderItem={({item})=> <ActivityCell activityData={item}/>}
numColumns={1} 
nestedScrollEnabled={true}
          onEndReached={() => getUserActivity()}
          onEndReachedThreshold={0.1} 
    />
    </View>
  )

};


export default AccountScreen;
