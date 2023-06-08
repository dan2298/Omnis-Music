import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity, Dimensions,} from 'react-native';

const AlbumArt = ({image}) => (
  <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: image}}
      />
  </View>
);

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 72;

const styles = StyleSheet.create({
  container: {
    marginTop: '14%',
    paddingLeft: 36,
    paddingRight: 36,
    shadowColor: "rgb(10,10,10)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: .5,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})