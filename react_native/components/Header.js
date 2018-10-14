import React from 'react';
import { View, Text } from 'react-native';
import Logger from '../../shared/logger';

const Header = ({ text }) => {
  const style = {
    container: {
      alignSelf: 'stretch',
      backgroundColor: 'orange',
      padding: 15,
    },
    text: {
      fontSize: 24,
    },
  };
  return (
    <Logger name="React Native Header">
      <View style={style.container}>
        <Text style={style.text}>{text}</Text>
      </View>
    </Logger>
  );
};

export default Header;
