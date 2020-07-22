import * as React from 'react';
import { Button, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { NotificationsScreen } from "./src/screen/notifyPage";
import { HomeScreen } from "./src/screen/mainPage";
import { ProfileScreen } from "./src/screen/addPage";

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='TODO' component={HomeScreen}/>
        <Stack.Screen name='Add Schedule' component={ProfileScreen}/>
        <Stack.Screen name='Notifications' component={NotificationsScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
