import React, {useRef, useEffect, useState} from 'react';
import {FlatList, ViewToken, Dimensions} from 'react-native';
import {HEADERDATA, MarketType} from '../mock';
import Me from './Me';
const harfWidth = Dimensions.get('window').width * 0.45;

const Main: React.FC<{
  market: number;
  setMarket: {(market: number): void};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({market, setMarket}) => {
  const setActiveItem = useRef(
    (item: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const {viewableItems} = item;
      const changedItem = viewableItems.length > 0 && viewableItems[0];
      if (changedItem && (changedItem.index || changedItem.index == 0)) {
        // setMarket(changedItem.index);
        console.log(changedItem.index);
      }
    },
  );
  const [scrollViewStartOffsetX, setScrollViewStartOffsetX] = useState(1);
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  //开始拖拽
  const onScrollBeginDrag = (e: {nativeEvent: {contentOffset: {x: any}}}) => {
    const offsetX = e.nativeEvent.contentOffset.x; //记录拖拽前的X偏移量 0
    setScrollViewStartOffsetX(e.nativeEvent.contentOffset.x);
    setBeginTime(new Date());
    console.log('开始拖拽', offsetX);
  };

  //拖拽结束
  const onScrollEndDrag = (e: {nativeEvent: {contentOffset: {x: any}}}) => {
    //event.nativeEvent.contentOffset.y表示Y轴滚动的偏移量
    console.log(e);
    const offsetX = e.nativeEvent.contentOffset.x; //记录拖拽前的X偏移量 0
    console.log('拖拽结束：', offsetX, scrollViewStartOffsetX);
    const diff = Math.abs(scrollViewStartOffsetX - offsetX);
    const endTime = new Date();
    const diffTime = (endTime.getTime() - beginTime.getTime()) / 1000;
    console.log(diffTime);
    const flag =
      (diff > 50 && (diffTime < 0.5 || diffTime == 0.5)) ||
      (diffTime > 0.5 && diff > harfWidth);
    if (scrollViewStartOffsetX > offsetX && flag) {
      //往前翻页
      if (market > 0) {
        setMarket(market - 1);
        console.log('向前翻页');
      }
    } else if (scrollViewStartOffsetX < offsetX && flag) {
      if (market < HEADERDATA.length - 1) {
        setMarket(market + 1);
        console.log('向后翻页');
      }
    }
  };
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
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
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
