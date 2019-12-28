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
    searchResults: {
        flex: 1
    },
    downloadContainer: {
        flex: 1
    },
});

export default styles;