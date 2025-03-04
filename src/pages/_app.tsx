import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Platform } from 'react-native';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (Platform.OS === 'web') {
      require('react-native-web');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
