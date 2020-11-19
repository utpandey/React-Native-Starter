import 'react-native-gesture-handler';
// other imports
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import ColorBox from './components/ColorBox';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  // console.warn('hiiii CLone here!');
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ColorPalette"
            component={ColorPalette}
            options={({route}) => ({title: route.params.paletteName})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
