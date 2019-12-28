import Search from './screens/Search';
import Downloads from './screens/Downloads';
import CurrentSong from './screens/CurrentSong';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

const DownloadsStack = createStackNavigator(
    {
        Downloads,
        CurrentSong,
        // SongQueue
    },
    {
        mode: "modal"
    }
)

const SearchStack = createStackNavigator({
    Search,
    CurrentSong
})

const TabNavigator = createBottomTabNavigator({
    Search: SearchStack,
    Downloads: DownloadsStack
},
    {
        tabBarOptions: {
            activeBackgroundColor: 'black',
            style: {
                backgroundColor: 'black',
                height: 50,
                borderTopColor: '#302f2f'
            }
        }
    }
);

export default createAppContainer(TabNavigator);