import React from 'react';
import {
  StyleSheet,
  // Image,
  View,
  // TouchableOpacity
} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import TextWrapper from '@components/TextWrapper';
import {useTheme} from '@hooks/use-theme';
import {DATA} from './mock';

const SearchHistory: React.FC<{}> = ({}) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.back}]}>
      <View>
        <TextWrapper style={{fontSize: 25, marginVertical: 10}}>
          历史搜索
        </TextWrapper>
      </View>
      <View style={styles.historyWrapper}>{renderItem(DATA)}</View>
    </View>
  );
};

const renderItem = (data: string[]) => {
  return data.map(item => {
    return <TextWrapper style={styles.historyTag}>{item}</TextWrapper>;
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#22202B',
  },
  searchHeader: {
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  historyWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyTag: {
    paddingHorizontal: 5,
    fontSize: 10,
    marginRight: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#22202B',
    textAlign: 'center',
    borderRadius: 3,
    height: 25,
    lineHeight: 25,
    marginBottom: 15,
  },
});

export default SearchHistory;
