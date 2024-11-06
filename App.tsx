/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Fragment} from 'react';
import Toast from 'react-native-toast-message';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './navigations/Navigation';

function App(): React.JSX.Element {
  return (
    <Fragment>
      <Navigation />
      <Toast />
    </Fragment>
  );
}

export default App;
