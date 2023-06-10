import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const Controls = ({ playing, shuffleOn, repeatOn, play, playNext, playPrevious,
    onBack, onForward, onPressShuffle, onPressRepeat, forwardDisabled,}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <Ionicons name='ios-shuffle' size={24} style={{color:'white', paddingRight: '3%'}}></Ionicons>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity onPress={playPrevious}>
      <Image source={require('../img/ic_skip_previous_white_36pt.png')}/>
    </TouchableOpacity>
    <View style={{width: 20}} />
    {playing ?
      <TouchableOpacity onPress={play}>
        <View style={styles.playButton}>
          <Image source={require('../img/ic_pause_white_48pt.png')}/>
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={play}>
        <View style={styles.playButton}>
          <Image source={require('../img/ic_play_arrow_white_48pt.png')}/>
        </View>
      </TouchableOpacity>
    }
    <View style={{width: 20}} />
    <TouchableOpacity onPress={playNext}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3}]}
        source={require('../img/ic_skip_next_white_36pt.png')}/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
        <Icon name='repeat' size={18} style={{color:'white', paddingLeft: '3%'}}></Icon>
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})