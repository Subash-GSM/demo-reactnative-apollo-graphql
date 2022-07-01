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
    <BhApolloProvider>
      <MediaContext.Provider value={{mediaPlayId, setMediaPlayId}}>
        <HomeScreen />
      </MediaContext.Provider>
    </BhApolloProvider>
  );
};

export default App;
