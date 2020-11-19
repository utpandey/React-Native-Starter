import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const PalettePreview = ({handlePress, colorPalette}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{colorPalette.paletteName}</Text>
      <FlatList
        horizontal={true}
        data={colorPalette.colors.slice(0, 5)}
        keyExtractor={(item) => item.colorName}
        renderItem={({item}) => (
          <View style={[styles.box, {backgroundColor: item.hexCode}]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 3,
    borderRadius: 1,
  },
});
export default PalettePreview;
