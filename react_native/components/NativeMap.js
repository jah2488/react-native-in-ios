import React from 'react';
import { requireNativeComponent, View, Text } from 'react-native';
import Logger from '../../shared/logger';

//Make sure all names match when using newly created native modules
const RNMap = requireNativeComponent('RNMap', NativeMap);
class NativeMap extends React.Component {
  render() {
    return (
      <View style={{ borderColor: 'blue', borderWidth: 2, padding: 5 }}>
        <Text>I'm a Native Component</Text>
        <Logger name="React Native Map Component">
          <RNMap style={{ flex: 1, alignSelf: 'stretch', height: 250 }} />;
        </Logger>
      </View>
    );
  }
}

export default NativeMap;
