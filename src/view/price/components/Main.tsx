import React, {useRef, useEffect} from 'react';
import {FlatList, ViewToken} from 'react-native';
import {HEADERDATA, MarketType} from '../mock';
import Me from './Me';

const Main: React.FC<{
  market: number;
  setMarket: {(market: number): void};
}> = ({market, setMarket}) => {
  const setActiveItem = useRef(
    (item: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const {viewableItems} = item;
      console.log(market);

      const changedItem = viewableItems.length > 0 && viewableItems[0];
      if (changedItem && (changedItem.index || changedItem.index == 0)) {
        setMarket(changedItem.index);
      }
    },
  );
  // 相当于声明全局变量
  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  });
  const childRef = useRef(null);
  useEffect(() => {
    const ref = childRef.current as unknown as FlatList;
    ref.scrollToIndex({index: market});
  }, [market]);
  return (
    <FlatList
      data={HEADERDATA}
      horizontal={true}
      keyExtractor={item => item.id}
      renderItem={item => renderItem(item)}
      pagingEnabled={true}
      onViewableItemsChanged={setActiveItem.current}
      viewabilityConfig={viewConfigRef.current}
      ref={childRef}
    />
  );
};
const renderItem: React.FC<{item: {id: MarketType | string; title: string}}> =
  ({item}) => {
    switch (item.id) {
      case MarketType.ME:
        return <Me />;
      default:
        return <Me />;
    }
  };
export default Main;
