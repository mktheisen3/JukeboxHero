import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import IndexScreen from './src/screens/IndexScreen';
import JoinRoomScreen from './src/screens/JoinRoomScreen';
import ActiveDeviceScreen from './src/screens/ActiveDeviceScreen';
import RoomSettingsScreen from './src/screens/RoomSettingsScreen';
import RoomDetailsScreen from './src/screens/RoomDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MembersScreen from './src/screens/MembersScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';
import SearchScreen from './src/screens/SearchScreen';
import QueueScreen from './src/screens/QueueScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as RoomProvider } from './src/context/RoomContext';
import { Provider as SpotfiyProvider } from './src/context/SpotifyContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Feather } from '@expo/vector-icons';

import { setNavigator } from './src/navigationRef';

const search = createStackNavigator({
  Search: SearchScreen
});

search.navigationOptions = {
  title: "Search",
  tabBarIcon: <Feather name="search" size={25} color='white' />
  // eventually change icon color to #228B22 when active
}

const queue = createStackNavigator({
  Queue: QueueScreen
});

queue.navigationOptions = {
  title: "Queue",
  tabBarIcon: <Feather name="list" size={25} color='white' />
  // eventually change icon color to #228B22 when active
}

const nowPlaying = createStackNavigator({
  NowPlaying: NowPlayingScreen
});

nowPlaying.navigationOptions = {
  title: "Playing",
  tabBarIcon: <Feather name="music" size={25} color='white' />
  // eventually change icon color to #228B22 when active
}

const settings = createStackNavigator({
  Settings: SettingsScreen,
  ActiveDevice: ActiveDeviceScreen,
  RoomDetails: RoomDetailsScreen,
  RoomSettings: RoomSettingsScreen,
  Members: MembersScreen
}, {
  navigationOptions: {
    header: null
  }
});

settings.navigationOptions = {
  title: "Settings",
  tabBarIcon: <Feather name="settings" size={22} color='white' />
  // eventually change icon color to #228B22 when active
}

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen
    }),
    initialFlow: createStackNavigator({
      Index: IndexScreen,
      JoinRoom: JoinRoomScreen,
      CreateRoom: CreateRoomScreen
    }),
    mainFlow: createStackNavigator({
      tabFlow: createBottomTabNavigator({
        nowPlaying,
        search,
        queue,
        settings
      }, {
        navigationOptions: {
          header: null
        },
        tabBarOptions: {
          activeTintColor: '#228B22',
          labelStyle: {
            padding: 10
          },
          style: {
            height: 70,
            paddingTop: 10,
            backgroundColor: '#202020' 
          }
        }
      })
    })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <SpotfiyProvider>
      <AuthProvider>
        <RoomProvider>
          <App ref={ navigator => {setNavigator(navigator); }}/>
        </RoomProvider>
      </AuthProvider>
    </SpotfiyProvider>
  );
};