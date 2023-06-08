import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SongBar from '../components/SongBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

class Settings extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const arr = [1,2,3,4,5,6,7,8,9,10]
        const { goBack, navigate } = this.props.navigation
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={goBack}>
                        <Entypo name='chevron-small-left' size={32} color={'rgba(255,255,255,0.75)'}></Entypo>
                    </TouchableOpacity>
                        <Text style={styles.headerTitle}>{'Settings'}</Text>
                    <View style={{ width: 32}}></View>
                </View>
                {/* <LinearGradient colors={['rgb(60,60,60)', 'rgb(20,20,20)']}>
                    <View style={styles.topContainer}>
                        <Text style={styles.titleText}>Settings</Text>
                        <Icon name='settings' size={250} style={styles.icon}></Icon>
                    </View>
                </LinearGradient> */}
                <View style={styles.bottom}>
                    {arr.map((el, idx) => {
                        return (
                            <TouchableOpacity key={idx} style={styles.optionContainer}>
                                <Text style={styles.options}>{`Option ${el}`}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity onPress={() => navigate('Song', {seek: this.seek})}>
                    <SongBar navigate={navigate}></SongBar>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Settings;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'rgb(20,20,20)',
    },
    headerContainer: {
        flexDirection: 'row',
        width:'100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: '9%',
        borderBottomColor: 'rgb(30,30,30)',
        borderBottomWidth: 0.25
    },
    headerTitle: {
        flex: 1,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.80)', 
        fontWeight: 'bold', 
        fontSize: 16,
    },
    topContainer: {
        flexDirection: 'row',
        borderBottomColor: 'rgb(20,20,20)',
        borderBottomWidth: 1
    },
    bottom: {
        flex: 1,
        height: 500,
        width: 500,
        backgroundColor: 'rgb(20,20,20)',  
    },
    titleText: {
        color: 'white',
        fontSize: 50, 
        padding: 10, 
        marginTop: '20%', 
        fontWeight: "bold",
        marginLeft: 5
    },
    icon: {
        color: 'rgb(60, 60, 60)',
        marginTop: '8%',
        marginLeft: '70%',
        position: 'absolute'
    },
    options: {
        color: 'white',
        fontSize: 20,
        marginTop: '2.5%',
        marginBottom: '2.5%',
        marginLeft: '2%'
    },
    optionContainer: {
        backgroundColor: 'rgb(20,20,20)',
        borderBottomColor: 'rgb(30,30,30)',
        borderBottomWidth: 1,
    }
})