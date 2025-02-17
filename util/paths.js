import * as RNFS from 'react-native-fs';

export const songPath = fileName => `${RNFS.DocumentDirectoryPath}/songs/${fileName}`;

export const imagePath = fileName => `${RNFS.DocumentDirectoryPath}/images/${fileName}`;
