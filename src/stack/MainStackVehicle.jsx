import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditVehicleScreen from "../screens/Vehicle/EditVehicleScreen";
import VehicleCreateScreen from "../screens/Vehicle/VehicleCreateScreen";
import VehicleDetailScreen from "../screens/Vehicle/VehicleDetailScreen";
import VehicleListScreen from "../screens/Vehicle/VehicleListScreen";

const Stack  = createStackNavigator();

export default function MainStackVehicle() {
return (
    <Stack.Navigator>
        <Stack.Screen name="Vehicle List" component={VehicleListScreen} />
        <Stack.Screen name="Vehicle Details" component={VehicleDetailScreen} />
        <Stack.Screen name="Edit Vehicle" component={VehicleCreateScreen} />        
    </Stack.Navigator>
)


}