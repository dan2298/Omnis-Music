import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        // height: 500
    },
    list: {
        width: '100%',
        height: 800,
        backgroundColor: '#121212'
    },
    searchBarContainer: {
        marginTop: 40,
        marginLeft: 12,
        padding: 2,
        width: '90%',
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBar: {
        width: '70%',
        color: 'white',
    },
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white'
    }
});

export default styles;