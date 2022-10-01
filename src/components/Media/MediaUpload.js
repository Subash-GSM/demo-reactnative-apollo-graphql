import React, {useEffect, useRef, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {NewFeedBackSVG} from '../../assets/svg';
import {normalize} from '../../utils/responsive';

const MediaUpload = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: '100%',
          height: 70,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <NewFeedBackSVG />
        <Text
          style={{color: '#000', fontSize: 21, fontFamily: 'Avenir-medium'}}>
          New Post
        </Text>
        <TouchableOpacity>
          <View
            style={{
              height: normalize(34),
              width: normalize(62),
              backgroundColor: '#0062FF',
              borderRadius: normalize(24),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: normalize(16)}}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: route.params.uri,
        }}
        style={{
          height: normalize(90),
          width: normalize(136),
          borderRadius: normalize(10),
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <View style={{paddingHorizontal: 25, marginTop: normalize(27)}}>
        <TextInput
          style={{
            width: '100%',
            borderColor: '#E2E2E2',
            borderWidth: 1,
            borderRadius: normalize(15),
            backgroundColor: '#F8F8F8',
            height: normalize(93),
            paddingTop: 0,
            color: '#000',
          }}
          multiline={true}
          numberOfLines={5}
          placeholder="Describe your favourite move..."
          placeholderTextColor={'#3C3C3C'}
        />
        <Text
          style={{
            fontSize: 14,
            color: '#383838',
            lineHeight: 19,
            marginTop: normalize(5),
          }}>
          Add Space to seperate hashtag
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderColor: '#E2E2E2',
            borderWidth: 1,
            marginTop: normalize(24),
            borderRadius: normalize(15),
            backgroundColor: '#F8F8F8',
            height: normalize(40),
            color:'#000'
          }}
          placeholder="Add Location"
          placeholderTextColor={'#3C3C3C'}
        />
      </View>
    </View>
  );
};

export default MediaUpload;
