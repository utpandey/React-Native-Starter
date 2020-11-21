import 'react-native-gesture-handler';
// other imports
import {NavigationContainer} from '@react-navigation/native';
import AddNewPalette from './screens/AddNewPalette';
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

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({route}) => ({title: route.params.paletteName})}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  // console.warn('hiiii CLone here!');
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen name="AddNewPalette" component={AddNewPalette} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
