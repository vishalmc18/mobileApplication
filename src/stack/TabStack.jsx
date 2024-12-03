import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStackVehicle from './MainStackVehicle'
import MainStackTestCode from "./MainStackTestCode";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      options={{
      headerShown: false, 
      headerShadowVisible : false,
      headerBackTitleVisible: false,
      headerStyle:{
        backgroundColor: '#00A900',
      },
      tabBarIcon: ({focused}) => (
        // <FontAwesome5  name="car" size={42} color="#00A900" />
        <MaterialCommunityIcons name="car-multiple" size={42} color={focused?"#000000":'grey'} />
      ),
      }}
        name="Vehicles"
       component={MainStackVehicle} />

      <Tab.Screen 
      options={{
      headerShown: false,
      headerShadowVisible : false,
      headerBackTitleVisible: false,
      headerStyle:{
        backgroundColor: '#00A900',
      },
      tabBarIcon: ({ focused }) => (

        <MaterialCommunityIcons name="file-document-multiple" size={30} color={focused?"#000000":'grey'}/>
      ),
      }}
      name="Test Code" 
      component={MainStackTestCode} />
    </Tab.Navigator>
  );
}
