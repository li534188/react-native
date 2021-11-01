import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useTheme} from '@hooks/use-theme';
import TextWrapper from '@components/TextWrapper';
import Carema from '@components/Carema';
import {HEADERDATA} from './mock';
import Main from './components/Main';

const Price: React.FC<{}> = () => {
  const theme = useTheme();
  const [market, setMarket] = useState<number>(0);
  useEffect(() => {
    console.log('price 获取');
  }, []);
  const setValue = useCallback((index: number) => {
    console.log(index);
    setMarket(index);
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: theme.back}]}>
      <PriceHeader market={market} setMarket={setValue} />
      <Main market={market} setMarket={setValue} />
    </View>
  );
};

export const PriceHeader: React.FC<{
  market: number;
  setMarket: {(market: number): void};
}> = ({market, setMarket}) => {
  const childRef = useRef(null);

  useEffect(() => {
    const ref = childRef.current as unknown as FlatList;
    ref.scrollToIndex({index: market});
  }, [market]);

  // 相当于声明全局变量
  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
    minimumViewTime: 5,
  });

  const gotoSearch = useCallback(() => {
    Actions.push('search');
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gotoCarema = useCallback(() => {
    Actions.push('carema');
  }, []);
  const [show, setShow] = useState(false);
  return (
    <View>
      <View>
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
      <FlatList
        data={HEADERDATA}
        style={[styles.pageHeder, styles.boxShadow]}
        horizontal={true}
        ref={childRef}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log(index);
                  setMarket(index);
                }}>
                <TextWrapper
                  style={[
                    styles.pageHeaderItem,
                    {color: index === market ? '#C7AA0E' : '#fff'},
                  ]}>
                  {item.title}
                </TextWrapper>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageHeder: {
    height: 40,
    paddingHorizontal: 5,
    width: '80%',
  },
  boxShadow: {
    elevation: 2, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: '#fff', //  阴影颜色
    shadowOffset: {width: 0, height: 0}, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
  },
  pageHeaderItem: {
    width: 80,
    height: '100%',
    lineHeight: 40,
  },
  headerIcon: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 12,
    right: '12%',
  },
  headerIcon2: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 12,
    right: '5%',
  },
});
export default Price;
