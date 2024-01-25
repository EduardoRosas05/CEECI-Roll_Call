import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import StudentScreen from "../features/student/application/screens/studentScreen";

const Tab = createBottomTabNavigator();

const NavigationStudent = () => {
    return(
        <Tab.Navigator
        initialRouteName="StudentScreen"
        screenOptions={{
            tabBarActiveTintColor: 'purple',
            tabBarStyle: {
                height: 80,
            }
        }}
        >
            <Tab.Screen
                name="Asistencia actual"
                component={StudentScreen}
                options={{
                    tabBarLabelStyle:{
                        fontSize: 15,
                    },
                    tabBarIcon: () => (  
                        <AntDesign name="book" size={28} color="gray"/>
                    ),
                }}
            />

            <Tab.Screen
                name="Asistencia pasada"
                component={StudentScreen}
                options={{
                    tabBarLabelStyle:{
                        fontSize: 15,
                    },
                    tabBarIcon: () => (  
                        <AntDesign name="book" size={28} color="gray"/>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default NavigationStudent;