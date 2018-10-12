import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  requireNativeComponent,
} from 'react-native';
import Logger from './shared/logger';

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

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header text={this.props.title} />
          <Text>I'm a react component</Text>
        </View>
        <NativeMap />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('RNView', () => App);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#000',
  },
});
