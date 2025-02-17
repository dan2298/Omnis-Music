import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';

const Header = ({ message, onDownPress, onQueuePress, onMessagePress, navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity style={{paddingRight: '12%'}} onPress={onDownPress}>
      <Image style={styles.button}
        source={require('../img/ic_keyboard_arrow_down_white.png')} />
    </TouchableOpacity>
    <Text onPress={onMessagePress}
      style={styles.message} ellipsizeMode='tail' numberOfLines={1}>{message}</Text>
      {onQueuePress ?
    <TouchableOpacity style={{paddingLeft:'12%'}} onPress={() => { onQueuePress('Queue') }}>
      <Image style={styles.button}
        source={require('../img/ic_queue_music_white.png')} />
    </TouchableOpacity> :
    <View style={{paddingLeft:'17%'}}></View>
    }
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    marginTop: '10%'
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.80)',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    opacity: 0.85
  }
});