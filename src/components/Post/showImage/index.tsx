import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import DoubleClick from 'react-native-double-tap';

type ImageProps = {
  album: {url: string; formats: any}[];
  likePost: boolean;
  setLikePost: Function;
};

const PhotoShower = ({album, likePost, setLikePost}: ImageProps) => {
  return (
    <View
      style={[
        styles.container,
        {height: album[0]['formats']['small']['height']},
      ]}>
      <DoubleClick
        doubleTap={() => {
          setLikePost(!likePost);
        }}
        delay={200}>
        <FastImage
          style={[
            styles.photo,
            {height: album[0]['formats']['small']['height']},
          ]}
          source={{uri: album[0].url}}
          resizeMode="contain"
        />
      </DoubleClick>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  photo: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default PhotoShower;
