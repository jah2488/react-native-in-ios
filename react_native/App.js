import React from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View } from 'react-native';
import Header from './components/Header';
import NativeMap from './components/NativeMap';

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

//Make sure your names match correctly.
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
