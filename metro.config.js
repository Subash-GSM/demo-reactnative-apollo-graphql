/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

/*
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
*/

const {getDefaultConfig} = require('metro-config');
// workaround for node-sass integration
// + @apollo/client integration
module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
          babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
      }),
      //babelTransformerPath: require.resolve('react-native-sass-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [
        ...sourceExts,
        'scss', // for node-sass
        'sass', // for node-sass
        'cjs', // for @apollo/client
        'svg',
      ],
    },
  };
})();
