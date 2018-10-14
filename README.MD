# React Native and Mobile Code Examples

There are a few ways that we can get our React Native code to integrate with our iOS or Android code for better code re-use and productivity. This repo outlines the setup around 3 common situations that can be emulated and extended in a large application.

Before (or shortly after) venturing further, I think it is worth reading through [this guide page about how to think of the communication to and from React Native Apps](https://facebook.github.io/react-native/docs/communication-ios)

Below I've outlined the 3 strategies at play in this repo and I have included several resources along with each. Some of these resources extend what I've included, some are referrences, and some are purely supplemental.

## Using React Native _within_ an Existing iOS App
When your team already has a mobile app, but you want to start adding React Native too that app. You're in luck, as this is a fairly common goal of React Native users,and is fairly navigatable once set up.

In this repo you will find there is an `ios/` directory at the top level. This is where our existing mobile lives, and where our `react_native/` can be used. It is worth keeping in mind that tools like `expo` do not work in this configuration, but you will be able to use Xcode to build and debug your application.

React Native includes a `React` cocopod that needs to be included in your project,to provide your app with the needed libraries and modules.

Currently, there are a handful of bugs that _could_ occur during compilation of your React Native. I have found using a library like [cocopods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native), to be useful in patching the various combination of configurations I may be using that is causing the build to fail.

What happens in our iOS code is fairly straight forward. We create a new `RCTRootView` in our iOS code that can then be added to the current view as a subview or used in any other way that makes sense.

```swift
reactView = RCTRootView(
    bundleURL: URL(string: "http://localhost:8081/react_native/App.bundle?platform=ios"),
    moduleName: "RNView",
    initialProperties: [AnyHashable("title"): "I'm The Title in React!"],
    launchOptions: nil)
```

1) Keep in mind that the string's path comes from the path to the file you want to load relative to the root of the server running the project. Since we have our entire project in one directory, that makes this easy to locate.
2) The `moduleName` paramater needs to coorispond to a module registered with the `AppRegistry` in the JS side of things.
3) The `initialProperties` parameter lets you pass `props` into your loaded ReactNative component. Very helpful for starting your ReactNative code with some useful data or if you are planning on managing the state of your app on the iOS side.
4) You can load up multiple reactViews and register many React Native components on the JS side of things, but you will want to track on how that inpacts performance.

```js
import React from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <View >
          <Text>{this.props.title}</Text>
        </View>
    );
  }
}

AppRegistry.registerComponent('RNView', () => App);
```

This is all that is _required_ on the JS side to have a working React Native component that can be included in your iOS project. If you find you're running into errors, be sure that your node server is running and that you don't have any errors in your React Native code as the current set of error messages and accompanying stack traces are not very good.

### Resources

- [Official Guide](https://facebook.github.io/react-native/docs/integration-with-existing-apps)
- [First Setup Tutorial](https://apptillery.info/development/basic-setup-add-react-native-existing-ios-project/)
- [Hybrid App Examples](https://github.com/dsibiski/react-native-hybrid-app-examples)
- [Tips and Tricks Integrating RN and Native Apps](https://hashrocket.com/blog/posts/tips-and-tricks-from-integrating-react-native-with-existing-native-apps)

## Using Custom Components in React Native
Regardless of the size of your React Native application, at a certain point you're going to need to use a component in your React Native code that isn't currently available in the built-in libraries.

To add new functionality to React Native you need to create some bridge code to handle the translation between iOS/Android and the world of React Native. In this example, I decided to use the same example the official guides use and wrap the `MKMapView` and expose that to my React Native project as a Native Component.

```objc
#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

@interface RNMapManger : RCTViewManager
@end

@implementation RNMapManger

    RCT_EXPORT_MODULE(RNMap)
    RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

    - (UIView *)view
    {
        return [[MKMapView alloc] init];
    }
@end
```

Here I am implmenting React's `RCTViewManager` interface and using a few included macros to handle naming of the module and exposing props to the JS side.

```js
import React from 'react';
import { requireNativeComponent, View } from 'react-native';

const RNMap = requireNativeComponent('RNMap', NativeMap);
class NativeMap extends React.Component {
  render() {
    return (
      <View>
        <RNMap zoomEnabled={false} />;
      </View>
    );
  }
}
export default NativeMap;
```

Over on the JS side, I've created a new component called `NativeMap.js` that is going to be wrapping our NativeComponent that we are now exposing on the iOS side. The `requireNativeComponent` function call is what does the final binding between what we exported in iOS and what we're using here in React Native.

Naming conventions and implementation are totally up to your team, but my preference is to have a wrapper component around everything on the React Native side for additional flexibility in styling or functionality. This is also something you could leverage on the mobile side to exposing or remove some functionality from the RN side.

### Resources

- [Native Modules](https://facebook.github.io/react-native/docs/native-modules-ios)
- [Native Components](https://facebook.github.io/react-native/docs/native-components-ios)
- [Gradient](https://github.com/asamiller/react-native-gradient)
- [React Native UI (worth reading the source code too)](https://nativebase.io/)

## Sharing Library code between React Native and React (Web)
Since the advent of NodeJS, the promise of "JS Everywhere" has appealed to many teams, and with React Native its _closer_ to being possible.

Ultimatley, React and React Native are _UI Libraries_, focused on the presentation of a UI and reacting to interactions on that UI. Currently, standard React components and React Native components _cannot_ be shared seamlessly between projects. However, since both libraries are using Javascript, a ton of code is perfectly re-usable between the two with just a little work.

In this project there is a `shared/` folder that contains our `logger.js` file.
```js
const Logger = (props) => {
  const name = props.name || props.children.type.name;
  console.debug('Component[' + name + '] rendered');
  return props.children;
};
export default Logger;
```

I have written a very simplisic `Logger` component that logs the information about the children being rendered inside of it. This is useful for keeping an eye on re-renders, but could be further extended to only log on certain events, certain renders, or could be adapted to log to a 3rd party service.

Beyond this example, any higher order components can be used between React and React Native. Additionally, javascript packages can be wrapped and re-used across your teams and projects allowing for greater levels of code-reuse.

### Resources

- [Using NPM in React Native](https://www.thesmythgroup.com/in-development/how-to-use-npm-packages-in-native-ios-apps/)
- [Node Libs in React Native](https://github.com/parshap/node-libs-react-native)
- [Code Reuse in React and React Native](https://hackernoon.com/code-reuse-using-higher-order-hoc-and-stateless-functional-components-in-react-and-react-native-6eeb503c665)

## -

## Further Reading

- [Performance Guide](https://facebook.github.io/react-native/docs/performance)
- [On Being Performance Minded](https://logrocket-blog.ghost.io/death-by-a-thousand-cuts-a-checklist-for-eliminating-common-react-performance-issues/)
- [React-Native-Web (Looking Forward)](https://github.com/necolas/react-native-web)



## To Run Locally

 - `yarn install && yarn start` from root of project.
 - `pod install` from `ios/` dir (if needed).
 - `open ios-react-native.xcworkspace` from `ios/` dir.
 - Compile and run the code on the iOS simulator.
