import React from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
export interface ListItem {
  symbol: string;
  name: string;
  price: number;
  fluctuate: number;
  riseAndFall: number;
  type: string;
  sumName?: string;
  prePrice?: number;
  preRiseAndFall?: number;
}

import TextWrapper, {AllText} from '@components/TextWrapper';
import {DATA} from '../mock';

const windowWidth = Dimensions.get('window').width;

const renderItem: React.FC<{item: ListItem}> = ({item}) => {
  const getTypeStyle = (type: string) => {
    let style = {
      fontSize: 10,
      color: '#000',
      borderRadius: 2,
      paddingHorizontal: 2,
      marginRight: 3,
    };
    switch (type) {
      case 'sh':
        style = {...style, ...{backgroundColor: '#C1464B'}};
        break;
      case 'us':
        style = {...style, ...{backgroundColor: '#3C60B4'}};
        break;
      case 'hk':
        style = {...style, ...{backgroundColor: '#C65729'}};
        break;
      default:
        style = {...style, ...{backgroundColor: '#C1464B'}};
        break;
    }
    return style;
  };

  return (
    <View style={styles.item}>
      <View style={styles.view2}>
        <TextWrapper>{item.name}</TextWrapper>
        <View style={styles.subView}>
          <Text style={getTypeStyle(item.type)}>{item.type}</Text>
          <AllText.SubTextWrapper>{item.sumName}</AllText.SubTextWrapper>
        </View>
      </View>
      <View style={styles.view} />
      <View style={styles.view}>
        <TextWrapper style={{textAlign: 'right'}}>{item.price}</TextWrapper>
        <AllText.SubTextWrapper>{item.prePrice}</AllText.SubTextWrapper>
      </View>
      <View style={styles.view}>
        <TextWrapper style={{textAlign: 'right'}}>
          {item.riseAndFall}
        </TextWrapper>
        <AllText.SubTextWrapper>{item.preRiseAndFall}</AllText.SubTextWrapper>
      </View>
    </View>
  );
};

const Me: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <TextWrapper style={styles.view2}>名称代码</TextWrapper>
        <View style={styles.view} />
        <TextWrapper style={styles.view}>价格</TextWrapper>
        <TextWrapper style={styles.view}>涨跌幅</TextWrapper>
      </View>
      <FlatList
        data={DATA}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.symbol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  item: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
  },
  view: {
    flex: 1,
    padding: 0,
    textAlign: 'right',
  },
  view2: {
    flex: 2,
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 5,
  },
});

export default Me;
