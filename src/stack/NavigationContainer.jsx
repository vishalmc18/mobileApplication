import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import React from "react";  
import DrawerStack from "./DrawerStack";

export default function NavigationThemeContainer() {
    return (
        <NavigationContainer>
        <DrawerStack />
        </NavigationContainer>
    );
    }
