import React from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View } from 'react-native';

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
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header text={this.props.title} />
          <Text>I'm a react component</Text>
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('RNView', () => App);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#000',
  },
});
