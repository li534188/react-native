import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useTheme} from '../contexts/hooks/use-theme';
import Price from './price';

export const customTabList = [
  {
    key: 'price',
    title: '行情',
    img: require('@img/bottom/price.png'),
    activeImg: require('@img/bottom/price-active.png'),
    component: () => <Price />,
  },
  {
    key: 'community',
    title: '社区',
    img: require('@img/bottom/community.png'),
    activeImg: require('@img/bottom/community-active.png'),
    component: () => <Price />,
  },
  {
    key: 'find',
    title: '发现',
    img: require('@img/bottom/find.png'),
    activeImg: require('@img/bottom/find-active.png'),
    component: () => <Price />,
  },
  {
    key: 'deal',
    title: '交易',
    img: require('@img/bottom/deal.png'),
    activeImg: require('@img/bottom/deal-active.png'),
    component: () => <Price />,
  },
  {
    key: 'me',
    title: '我的',
    img: require('@img/bottom/me.png'),
    activeImg: require('@img/bottom/me-active.png'),
    component: () => <Price />,
  },
];
const CustomTabBar: React.FC<{navigation: any}> = (props: {
  navigation: any;
}) => {
  const {state} = props.navigation;
  const activeTabIndex = state.index;
  const theme = useTheme();
  return (
    <View style={[Styles.container, {backgroundColor: theme.back}]}>
      {customTabList.map((element, idnex) => (
        <TouchableOpacity
          style={Styles.children}
          key={element.key}
          onPress={() => Actions[element.key]()}>
          {activeTabIndex === idnex ? (
            <Image style={Styles.stretch} source={element.activeImg} />
          ) : (
            <Image style={Styles.stretch} source={element.img} />
          )}

          <Text style={{textAlign: 'center', color: theme.white}}>
            {element.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default CustomTabBar;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
  children: {
    flex: 1,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    color: '#fff',
  },
  stretch: {
    height: 30,
    width: 30,
  },
});
