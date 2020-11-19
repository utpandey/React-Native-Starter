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

const Home = ({navigation}) => {
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
              navigation.navigate('ColorPaletteModal');
            }}>
            <Text>launch Modal</Text>
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
});
export default Home;
