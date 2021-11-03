import React, {useRef, useEffect, useState} from 'react';
import {FlatList, Dimensions, ViewToken} from 'react-native';
import {UpdateMarketType} from '..';
import {HEADERDATA, MarketType} from '../mock';
import Me from './Me';
const harfWidth = Dimensions.get('window').width * 0.45;

const Main: React.FC<{
  market: UpdateMarketType;
  setMarket: {(market: UpdateMarketType): void};
  setPosition: {(position: number): void};
}> = ({market, setMarket, setPosition}) => {
  const scrolllWidth = useRef(0);
  const setActiveItem = useRef(
    (item: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const {viewableItems} = item;
      const changedItem = viewableItems.length > 0 && viewableItems[0];
      if (changedItem && (changedItem.index || changedItem.index == 0)) {
        // if (changedItem.index != market.index) {
        setMarket({index: changedItem.index, type: 'bottom'});
        console.log('firsttime');
        // }
      }
    },
  );
  const [scrollViewStartOffsetX, setScrollViewStartOffsetX] = useState(1);
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  //开始拖拽
  const onScrollBeginDrag = (e: {
    nativeEvent: {contentOffset: {x: any}; contentSize: {width: number}};
  }) => {
    const offsetX = e.nativeEvent.contentOffset.x; //记录拖拽前的X偏移量 0
    scrolllWidth.current = e.nativeEvent.contentSize.width;
    setScrollViewStartOffsetX(offsetX);
    setBeginTime(new Date());
    console.log('开始拖拽', offsetX);
  };

  //拖拽同步
  const onScroll = (e: {nativeEvent: {contentOffset: {x: any}}}) => {
    // console.log(e.nativeEvent);
    const offsetX = e.nativeEvent.contentOffset.x;
    const difference = offsetX - scrollViewStartOffsetX;
    const percent = difference / scrolllWidth.current;
    // console.log(percent);
    setPosition(percent);
  };

  //拖拽结束
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onScrollEndDrag = (e: {nativeEvent: {contentOffset: {x: any}}}) => {
    //event.nativeEvent.contentOffset.y表示Y轴滚动的偏移量
    console.log(e.nativeEvent);
    const offsetX = e.nativeEvent.contentOffset.x; //记录拖拽前的X偏移量
    const itemWidth = scrolllWidth.current / (HEADERDATA.length - 1);
    console.log('拖拽结束：', offsetX, scrollViewStartOffsetX);
    const diff = Math.abs(scrollViewStartOffsetX - offsetX);
    const endTime = new Date();
    const diffTime = (endTime.getTime() - beginTime.getTime()) / 1000;
    console.log(diffTime);
    const flag =
      (diff > 50 && (diffTime < 0.2 || diffTime == 0.2)) ||
      (diffTime > 0.2 && diff > harfWidth);
    const {index} = market;
    const _market = {...market, type: 'bottom'};
    console.log(_market);
    const ref = childRef.current as unknown as FlatList;
    if (scrollViewStartOffsetX > offsetX && flag) {
      //往前翻页
      if (index > 0) {
        setMarket({..._market, index: index - 1});
        ref.scrollToOffset({offset: itemWidth * (index - 1)});
        console.log('向前翻页');
      }
    } else if (scrollViewStartOffsetX < offsetX && flag) {
      if (index < HEADERDATA.length - 1) {
        ref.scrollToOffset({offset: itemWidth * (index + 1)});
        console.log('向后翻页');
      }
    }
  };
  // 相当于声明全局变量
  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
    minimumViewTime: 500,
  });
  const childRef = useRef(null);
  useEffect(() => {
    const ref = childRef.current as unknown as FlatList;
    const {index, type} = market;
    if (type === 'top') {
      ref.scrollToIndex({index});
    }
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
      // onScrollEndDrag={onScrollEndDrag}
      viewabilityConfig={viewConfigRef.current}
      onScroll={onScroll}
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
