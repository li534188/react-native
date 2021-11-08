import React, {useCallback, useState} from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Me from './page/Me';
import MyLocation from './page/map';
import WebViewWrapper from './page/webView';
import Carema from '@components/Carema';
import {HEADERDATA} from './mock';
import {useTheme} from '@hooks/use-theme';
import {Actions} from 'react-native-router-flux';
import Pay from './page/pay';

const renderSceneData: {[key: string]: React.ComponentType<{}>} = {};
HEADERDATA.forEach(item => {
  renderSceneData[item.key] = Me;
  if (item.key === 'us') {
    renderSceneData[item.key] = MyLocation;
  }
  if (item.key === 'us1') {
    renderSceneData[item.key] = WebViewWrapper;
  }
  if (item.key === 'us2') {
    renderSceneData[item.key] = Pay;
  }
});
const renderScene = SceneMap(renderSceneData);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(HEADERDATA);
  const [show, setShow] = useState(false);

  const theme = useTheme();

  const gotoSearch = useCallback(() => {
    Actions.push('search');
  }, []);

  const _handleIndexChange = (index: number) => setIndex(index);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainerStyle}
      style={styles.tabbar}
      activeColor={theme.defaultColor}
      tabStyle={[styles.tab, {backgroundColor: theme.back}]}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.back}]}>
      <View style={styles.positionContioner}>
        <TouchableOpacity onPress={gotoSearch}>
          <Image
            style={styles.headerIcon}
            source={require('@img/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShow(true);
            // gotoCarema();
          }}>
          <Image
            style={styles.headerIcon2}
            source={require('@img/QRcode.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabbarContatiner}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={_handleIndexChange}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      {show ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setShow(false);
          }}>
          <Carema
            close={() => {
              setShow(false);
            }}
          />
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbarContatiner: {
    flex: 1,
  },
  tabbar: {
    height: 50,
    width: '80%',
  },
  tab: {
    width: 80,
  },
  indicator: {
    backgroundColor: '#C0A705',
    color: '#C0A705',
  },
  indicatorContainerStyle: {
    backgroundColor: 'black',
    // width: '80%',
  },
  label: {
    fontWeight: '400',
  },
  headerIcon: {
    height: 20,
    width: 20,
  },
  headerIcon2: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  positionContioner: {
    position: 'absolute',
    left: '80%',
    top: 15,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
