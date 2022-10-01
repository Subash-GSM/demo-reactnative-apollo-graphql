/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createContext, useState} from 'react';
import HomeScreen from './ui/HomeScreen';
// import SplashScreen from 'react-native-lottie-splash-screen';
import {BhApolloProvider} from './apollo';
export const MediaContext = createContext();
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraComponent from './components/Media/Camera';
import MediaUpload from './components/Media/MediaUpload';

const Stack = createStackNavigator();

const App = () => {
  // React.useEffect(() => {
  //   setTimeout(
  //     () => {
  //       SplashScreen.hide();
  //     },
  //     Platform.OS === 'android' ? 0 : 4000,
  //   );
  // }, []);
  const [mediaPlayId, setMediaPlayId] = useState(null);
  return (
    <NavigationContainer>
    <BhApolloProvider>
      <MediaContext.Provider value={{mediaPlayId, setMediaPlayId}}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="Camera" component={CameraComponent} options={{headerShown:false}} />
      <Stack.Screen name="Media-Upload" component={MediaUpload} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
        
      </MediaContext.Provider>
    </BhApolloProvider>
    </NavigationContainer>
  );
};

export default App;
