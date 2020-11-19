import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({route}) => {
  return (
    <FlatList
      style={styles.container}
      data={route.params.colors}
      keyExtractor={(item) => item.hexCode}
      renderItem={({item}) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
      // ListHeaderComponent={<Text style={styles.heading}>Solarized</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
