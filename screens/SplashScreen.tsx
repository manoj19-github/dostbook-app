import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {FC, useCallback, useEffect, useRef} from 'react';
import {Colors} from '../utils/Constants';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {resetAndNavigate} from '../utils/NavigationUtils';

type SplashScreenProps = {};
const SplashScreen: FC<SplashScreenProps> = (): JSX.Element => {
  const isFocused = useIsFocused();
  const timerRef = useRef<any>(null);
  const tokenCheck = async () => {
    resetAndNavigate('GettingStartedScreen');
    // resetAndNavigate('OTPScreen');
  };

  useEffect(() => {
    if (isFocused) {
      timerRef.current = setTimeout(() => {
        tokenCheck();
      }, 3000);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isFocused]);

  return (
    <View style={SplashScreenStyles.container}>
      <View style={SplashScreenStyles.imageWrapper}>
        <Image
          source={require('../assets/dostbook.png')}
          style={SplashScreenStyles.image}
        />
        <Text style={SplashScreenStyles.logoText}>Dostbook</Text>
      </View>
      <View style={SplashScreenStyles.activityIndicator}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    </View>
  );
};

const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    fontWeight: '500',
    color: '#1C9BF8',
  },
  activityIndicator: {
    bottom: 60,
    position: 'absolute',
  },
});

export default SplashScreen;
