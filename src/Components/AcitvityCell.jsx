import React, { useEffect,useState } from 'react';
import {View,Text} from 'react-native'
import SpacerVerticle from '../Components/SpacerVerticle'

export default function ActivityCell ({activityData}) {
  
  const [formattedDate,setFormattedDate] = useState()
  const [formattedTime,setFormattedTime] = useState()
  const [formattedText,setFormattedText] = useState()


  useEffect(()=>{
    dataSet()
  },[])
  let date=""
  const dataSet= () =>{
    // console.log(activityData.description)
    try {
        date = new Date(activityData.createdOn);
        setFormattedDate (`${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear()}`)
        setFormattedTime (`${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`)
        setFormattedText (`${activityData.description.toLowerCase().includes("started") ? "Started at " : activityData.description.toLowerCase().includes("ended") ? "Ended at " : activityData.description.toLowerCase().includes("changed") ? "Changed at " : activityData.description.toLowerCase().includes("created") ? "Created at " : ""}${formattedDate}, ${formattedTime}`)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <View style={{marginVertical:2, alignContent:'center'}}>
      <View style={{backgroundColor:'#F0F0F0', alignContent:'center', borderRadius:8}}>
      <Text style={{fontSize:16, fontWeight:'bold', paddingHorizontal:5}}>{formattedText}</Text>
      <Text style={{fontSize:16,paddingHorizontal:5 }}>{activityData.cycleDescription ? activityData.description+": "+activityData.cycleDescription:activityData.description}</Text>
      <SpacerVerticle/>
      </View>
    </View>
  )
}

