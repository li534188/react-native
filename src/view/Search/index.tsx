import React, {useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import TextWrapper, {AllText} from '@components/TextWrapper';
import {useTheme} from '@hooks/use-theme';
import SearchHistory from './SearchHistory';
import {get} from '@utils/fetchUtils';
const Search: React.FC<{}> = ({}) => {
  const theme = useTheme();
  const [value, onChangeText] = useState('Useless Placeholder');
  return (
    <View style={[styles.container, {backgroundColor: theme.back}]}>
      <View style={styles.searchHeader}>
        <AllText.TextInputWrapper
          value={value}
          onChangeText={text => onChangeText(text)}
          style={{flex: 1}}
          returnKeyType="search"
          returnKeyLabel="搜索"
          onSubmitEditing={e => {
            console.log('123');
            console.log(e);
            console.log(value);
            const res = get(
              'https://facebook.github.io/react-native/movies.json',
            );
            console.log(res);
          }}
          prefixIcon={() => {
            return (
              <View>
                <Image
                  style={styles.searchIcon}
                  source={require('@img/search.png')}
                />
              </View>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Actions.pop();
          }}>
          <TextWrapper style={{height: 35, lineHeight: 35, marginLeft: 30}}>
            取消
          </TextWrapper>
        </TouchableOpacity>
      </View>
      <SearchHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchHeader: {
    height: 80,
    flexDirection: 'row',
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
});

export default Search;
