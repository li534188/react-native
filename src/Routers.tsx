/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {StackViewStyleInterpolator} from 'react-navigation-stack';
import {
  Scene,
  Router,
  //   Actions,
  //   ActionConst,
  Overlay,
  //   Tabs,
  Modal,
  //   Drawer,
  Stack,
  //   Lightbox,
  Tabs,
} from 'react-native-router-flux';
import Home from './view/Home';
import Search from './view/Search';
import CustomTabBar, {customTabList} from './view/CustomTabBar';

// import Launch from './components/Launch';
// import Register from './components/Register';
// import Login from './components/Login';
// import Login2 from './components/Login2';
// import Login3 from './components/Login3';
// import Home from './components/Home';
// import DrawerContent from './components/drawer/DrawerContent';
// import TabView from './components/TabView';
// import TabIcon from './components/TabIcon';
// import EchoView from './components/EchoView';
// import MessageBar from './components/MessageBar';
// import ErrorModal from './components/modal/ErrorModal';
// import DemoLightbox from './components/lightbox/DemoLightbox';
// import MenuIcon from './images/menu_burger.png';
// import CustomNavBarView from './components/CustomNavBarView';
// import CustomNavBar from './components/CustomNavBar';
// import CustomNavBar2 from './components/CustomNavBar2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#000',
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

// const stateHandler = (prevState: any, newState: any, action: any) => {
//   console.log('onStateChange: ACTION:', action);
// };

// on Android, the URI prefix typically contains a host in addition to scheme
// const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const transitionConfig = () => ({
//   screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
// });

const Root = () => (
  <Router
    sceneStyle={{backgroundColor: '#000000'}}
    uriPrefix={'thesocialnetwork.com'}>
    <Stack key="root">
      <Tabs key={'home'} hideNavBar tabBarComponent={CustomTabBar} tabs={true}>
        {customTabList.map(item => {
          return (
            <Scene
              hideNavBar
              key={item.key}
              component={item.component}
              title={item.title}
            />
          );
        })}
      </Tabs>
      <Scene
        hideNavBar
        key={'search'}
        path={'/search/'}
        component={() => {
          return <Search />;
        }}
      />
      <Scene
        key={'profileForm'}
        path={'/edit/profile/:id/'}
        component={() => {
          return <Text>666</Text>;
        }}
      />
    </Stack>
  </Router>
);

export default Root;
