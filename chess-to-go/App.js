import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button  } from 'react-native';
import HomePage from './pages/HomePage';
import GameLanding from './pages/GameLanding';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="GameLanding" component={GameLanding} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}



