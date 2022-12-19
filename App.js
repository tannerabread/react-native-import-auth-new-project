/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {Auth, Hub} from 'aws-amplify';

const listener = data => {
  console.log('data from auth event listener', data);
  switch (data.payload.event) {
    case 'configured':
      console.log('the Auth module is configured');
      break;
    case 'signIn':
      console.log('user signed in');
      break;
    case 'signIn_failure':
      console.error('user sign in failed');
      break;
    case 'signUp':
      console.log('user signed up');
      break;
    case 'signUp_failure':
      console.error('user sign up failed');
      break;
    case 'confirmSignUp':
      console.log('user confirmation successful');
      break;
    case 'completeNewPassword_failure':
      console.error('user did not complete new password flow');
      break;
    case 'autoSignIn':
      console.log('auto sign in successful');
      break;
    case 'autoSignIn_failure':
      console.error('auto sign in failed');
      break;
    case 'forgotPassword':
      console.log('password recovery initiated');
      break;
    case 'forgotPassword_failure':
      console.error('password recovery failed');
      break;
    case 'forgotPasswordSubmit':
      console.log('password confirmation successful');
      break;
    case 'forgotPasswordSubmit_failure':
      console.error('password confirmation failed');
      break;
    case 'tokenRefresh':
      console.log('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      console.error('token refresh failed');
      break;
    case 'cognitoHostedUI':
      console.log('Cognito Hosted UI sign in successful');
      break;
    case 'cognitoHostedUI_failure':
      console.error('Cognito Hosted UI sign in failed');
      break;
    case 'customOAuthState':
      console.log('custom state returned from CognitoHosted UI');
      break;
    case 'customState_failure':
      console.error('custom state failure');
      break;
    case 'parsingCallbackUrl':
      console.log('Cognito Hosted UI OAuth url parsing initiated');
      break;
    case 'userDeleted':
      console.log('user deletion successful');
      break;
    case 'signOut':
      console.log('user signed out');
      break;
  }
};

Hub.listen('auth', listener);

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const goFederate = () => {
    console.log('go federate');
    Auth.federatedSignIn({provider: 'Google'});
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <Button title="Federated Auth" onPress={goFederate} />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
