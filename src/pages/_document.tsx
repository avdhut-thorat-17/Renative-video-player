import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

// Force Next-generated DOM elements to fill their parent's height
const style = `
html, body, #__next {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}`;

class MyDocument extends Document {
  static async getInitialProps({ renderPage }: any) {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = await renderPage();
    const styles = [
      <style key="custom" dangerouslySetInnerHTML={{ __html: style }} />,
      getStyleElement(),
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
