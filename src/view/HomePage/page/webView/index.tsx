import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useTheme} from '@hooks/use-theme';

const WebViewWrapper = () => {
  const theme = useTheme();
  return (
    <ScrollView style={[styles.contionner, {backgroundColor: theme.back}]}>
      <WebView
        source={{uri: 'https://liihuu.github.io/KLineChart'}}
        style={{marginTop: 20}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contionner: {
    flex: 1,
  },
});

export default WebViewWrapper;
