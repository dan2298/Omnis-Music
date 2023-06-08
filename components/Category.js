import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Category = (props) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.image} source={{ uri: props.item.image }}></Image>
          <Text style={{...styles.subtext, color: 'rgb(210,210,210)', fontSize : props.item.type === 'album' ? 12 : 16 }} numberOfLines={1}>{props.item.name}</Text>
          <Text style={{...styles.subtext, marginTop: 0}}>{props.item.artist}</Text>
        </TouchableOpacity>
      </View>
    )
};

export default Category;


const styles = StyleSheet.create({
  container: {
    flex:1, 
    margin: 10, 
    marginTop: 5, 
    width: 125
  },
  image: {
    height: 125,
    width: 125
  },
  subtext: {
    textAlign: 'center',
    color: 'rgb(150,150,150)', 
    fontSize: 12,
    fontWeight: '600',
    marginTop: '4 %'
  }
})