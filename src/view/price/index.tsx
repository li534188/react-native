import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useTheme} from '@hooks/use-theme';
import TextWrapper from '@components/TextWrapper';
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
  const gotoSearch = useCallback(() => {
    Actions.push('search');
  }, []);
  return (
    <View>
      <View>
        <TouchableOpacity onPress={gotoSearch}>
          <Image
            style={styles.headerIcon}
            source={require('@img/search.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={HEADERDATA}
        style={styles.pageHeder}
        horizontal={true}
        ref={childRef}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
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
    right: '15%',
  },
});
export default Price;
