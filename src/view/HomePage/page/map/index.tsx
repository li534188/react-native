import React from 'react';
import {View, StyleSheet} from 'react-native';
import Map from '@components/Map';
import {useTheme} from '@hooks/use-theme';

const MyLocation = () => {
  const theme = useTheme();
  return (
    <View style={[styles.contionner, {backgroundColor: theme.back}]}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  contionner: {
    flex: 1,
  },
});

export default MyLocation;
