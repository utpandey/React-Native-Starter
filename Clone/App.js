import 'react-native-gesture-handler';
// other imports
import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect, useCallback, useState} from 'react';
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
  const [color, setColor] = useState([]);
  const colorHandler = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (result.ok) {
      const colors = await result.json();
      setColor(colors);
    }
    console.warn(result.json);
  });

  useEffect(() => {
    colorHandler();
  }, []);
  return (
    <>
      <FlatList
        data={color}
        keyExtractor={(item) => item.hexCode}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ColorPalette"
            component={ColorPalette}
            options={({route}) => ({title: route.params.paletteName})}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
};

export default App;
