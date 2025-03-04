/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '/_next/static/fonts/',
        },
      },
    });
    return config;
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    '@react-navigation/native',
    '@react-navigation/drawer',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-safe-area-context',
    'react-native-screens',
  ],
};

module.exports = nextConfig;
