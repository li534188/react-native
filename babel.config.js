module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@icons': './src/components/icons',
          '@img': './src/image',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@hooks': './src/contexts/hooks',
          '@components': './src/components',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
