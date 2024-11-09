import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import Toast from 'react-native-toast-message';
import {z} from 'zod';
import {GettingStartedSchema} from '../formSchema/GettingStarted.formSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {useAppState} from '../store/useAppState';
import LoaderKit from 'react-native-loader-kit';

import useGettingStartedService from '../services/useGettingStartedService';
import {useNavigation} from '@react-navigation/native';
import {useStoreManagement} from '../store/useStoreManagement';
import {resetAndNavigate} from '../utils/NavigationUtils';

type GettingStartedScreenProps = {};
const GettingStartedScreen: FC<GettingStartedScreenProps> = ({}) => {
  const appState = useAppState();
  const storeManagement = useStoreManagement();

  const gettingStartedService = useGettingStartedService();
  const FormHandler = useForm<z.infer<typeof GettingStartedSchema>>({
    resolver: zodResolver(GettingStartedSchema),
    defaultValues: {
      mobile: '',
    },
  });

  const onSubmit = (values: z.infer<typeof GettingStartedSchema>) => {
    console.log('values: ', values);

    if (appState.isLoading) return;
    appState.setIsLoading(true);
    gettingStartedService.mutate(
      {phoneNumber: values.mobile},
      {
        onSuccess(result: any) {
          storeManagement.setCurrMobile(values.mobile);
          if (result?.data?.message)
            Toast.show({
              type: 'success',
              text1: 'Hi, user',
              text2: result.data.message,
            });
          if (result?.data?.navigateTo) {
            resetAndNavigate(result.data.navigateTo);
          }
          console.log('====================================');
          console.log('result in success >>>>> ', result?.data);
          console.log('====================================');
        },
        onError(error: any) {
          console.log('====================================');
          console.log('error in success >>>>> ', error);
          console.log('====================================');
        },
        onSettled() {
          appState.setIsLoading(false);
        },
      },
    );
  };

  return (
    <SafeAreaView style={GettingStartedScreenStyles.container}>
      <View style={GettingStartedScreenStyles.imageWrapper}>
        <Image
          source={require('../assets/dostbook.png')}
          style={GettingStartedScreenStyles.image}
        />
        <Text style={GettingStartedScreenStyles.logoText}>Dostbook</Text>
      </View>
      <View style={GettingStartedScreenStyles.mobileInputContainer}>
        <Text style={GettingStartedScreenStyles.mobileLabelText}>
          Enter your mobile no.
        </Text>
        <Controller
          name="mobile"
          control={FormHandler.control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              readOnly={appState.isLoading}
              maxLength={10}
              value={value}
              keyboardType={'numeric'}
              style={GettingStartedScreenStyles.mobileInput}
            />
          )}
        />
        <Text style={GettingStartedScreenStyles.mobileInputHintText}>
          {FormHandler.formState.errors.mobile?.message}
        </Text>
      </View>
      <View style={GettingStartedScreenStyles.continueWrapper}>
        <TouchableOpacity
          style={GettingStartedScreenStyles.continueButton}
          onPress={FormHandler.handleSubmit(onSubmit)}
          disabled={appState.isLoading}>
          <View style={GettingStartedScreenStyles.continueBtnWrapper}>
            <Text style={GettingStartedScreenStyles.continueText}>
              Continue
            </Text>
            {appState.isLoading ? (
              <LoaderKit
                style={GettingStartedScreenStyles.loader}
                name={'BallSpinFadeLoader'} // Optional: see list of animations below
                color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const GettingStartedScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueWrapper: {
    marginTop: 20,
    width: '84%',
  },
  mobileInputHintText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 5,
  },
  continueBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1C9BF8',
    paddingVertical: 10,
    borderRadius: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  activityIndicator: {
    marginLeft: 30,
    color: 'white',
  },
  loader: {
    width: 25,
    height: 25,
    marginLeft: 8,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  imageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileInputContainer: {
    width: '85%',
    marginTop: 20,
  },
  mobileInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#1C9BF8',
  },
  mobileLabelText: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 5,
    marginVertical: 1,
  },
  mobileInputText: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoText: {
    fontSize: 35,
    fontWeight: '500',
    color: '#1C9BF8',
  },
});

export default GettingStartedScreen;
