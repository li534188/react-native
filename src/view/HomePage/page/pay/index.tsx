import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  NativeModules,
  Text,
} from 'react-native';
import {useTheme} from '@hooks/use-theme';

const MyLocation: React.FC = () => {
  const theme = useTheme();
  const [sign, setSign] = useState(false);
  const nativeAndroid = () => {
    if (sign) {
      NativeModules.MyNativeModule.rnCallNative();
    }
  };
  return (
    <TouchableHighlight
      style={[styles.contionner, {backgroundColor: theme.back}]}
      underlayColor="#28780b"
      onPress={() => {
        setSign(true);
        nativeAndroid();
      }}>
      <View style={styles.wrapper}>
        <Text style={{color: 'white', fontSize: 17}}>确定</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  contionner: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#35a40c',
    borderRadius: 5,
  },
});

export default MyLocation;
