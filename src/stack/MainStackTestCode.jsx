import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TestCodeList from "../screens/TestCode/TestCodeList";
import TestCodeDetails from "../screens/TestCode/TestCodeDetails";
import EditTestCode from "../screens/TestCode/EditTestCode";

const Stack = createStackNavigator();

export default function MainStackTestCode() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="TestCode List" component={TestCodeList} />
        <Stack.Screen name="TestCode Details" component={TestCodeDetails} />
        <Stack.Screen name="Edit TestCode" component={EditTestCode} />
        </Stack.Navigator>
    );
    }
