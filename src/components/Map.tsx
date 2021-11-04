import React from 'react';
import {StyleSheet} from 'react-native';
import {MapView} from 'react-native-amap3d';

const MapComponents: React.FC<{}> = () => {
  return (
    <MapView
      center={{
        latitude: 39.91095,
        longitude: 116.37296,
      }}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default MapComponents;
