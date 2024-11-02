/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-500 text-2xl " style={{color: 'red'}}>
          app
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
