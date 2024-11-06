import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {FC} from 'react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import {useAppState} from '../store/useAppState';
import LoaderKit from 'react-native-loader-kit';
import {RegistrationSchema} from '../formSchema/Registration.formSchema';
import CustomSafeAreaView from '../components/CustomSafeAreaView';

type GettingStartedScreenProps = {};
const GettingStartedScreen: FC<GettingStartedScreenProps> = () => {
  const appState = useAppState();
  const FormHandler = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    console.log('values: ', values);
    appState.setIsLoading(true);
    if (appState.isLoading) return;
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
      <View style={GettingStartedScreenStyles.emailInputContainer}>
        <Text style={GettingStartedScreenStyles.mobileLabelText}>
          Enter your email id
        </Text>
        <Controller
          name="email"
          control={FormHandler.control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              readOnly={appState.isLoading}
              value={value}
              keyboardType={'email-address'}
              style={GettingStartedScreenStyles.emailInput}
            />
          )}
        />
        {FormHandler.formState.errors.email?.message ? (
          <Text style={GettingStartedScreenStyles.emailInputHintText}>
            {FormHandler.formState.errors.email?.message}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={GettingStartedScreenStyles.nameInputContainer}>
        <Text style={GettingStartedScreenStyles.mobileLabelText}>
          Enter your name
        </Text>
        <Controller
          name="name"
          control={FormHandler.control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              readOnly={appState.isLoading}
              value={value}
              keyboardType={'name-phone-pad'}
              style={GettingStartedScreenStyles.emailInput}
            />
          )}
        />
        {FormHandler.formState.errors.name?.message ? (
          <Text style={GettingStartedScreenStyles.emailInputHintText}>
            {FormHandler.formState.errors.name?.message}
          </Text>
        ) : (
          <></>
        )}
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
  emailInputHintText: {
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
  emailInputContainer: {
    width: '85%',
    marginTop: 20,
  },
  nameInputContainer: {
    width: '85%',
    marginTop: 8,
  },
  emailInput: {
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
  emailInputText: {
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
