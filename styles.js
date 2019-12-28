import { StyleSheet, Dimensions } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: '100%'
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
    searchResults: {
        flex: 1
    },
    downloadContainer: {
        flex: 1
    },
});

export default styles;