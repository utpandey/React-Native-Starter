import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import PalettePreview from '../components/PalettePreview';

const Home = ({navigation, route}) => {
  const [color, setColor] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const colorHandler = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (result.ok) {
      const colors = await result.json();
      setColor(colors);
    }
  });

  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;

  useEffect(() => {
    colorHandler();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await setColor();
    setTimeout(() => {
      setColor(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColor((palettes) => [newColorPalette, ...color]);
    }
  }, [newColorPalette]);

  return (
    <>
      <FlatList
        style={styles.list}
        data={color}
        // eslint-disable
        keyExtractor={(item) => item.paletteName}
        renderItem={({item}) => (
          <PalettePreview
            handlePress={() => navigation.navigate('ColorPalette', item)}
            colorPalette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddNewPalette');
            }}>
            <Text style={styles.modalText}> Add a Color Scheme </Text>
          </TouchableOpacity>
        }
        // refreshControl={
        //   <RefreshControl refreshing={true} onRefresh={() => {}} />
        // }
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  modalText: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});
export default Home;
