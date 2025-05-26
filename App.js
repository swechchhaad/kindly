import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Message from './pages/Message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{ title: 'Kindly 💛' }}
        />
        <Stack.Screen 
        name="Message"
        component={Message}
        options={{ title: 'Messages' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}