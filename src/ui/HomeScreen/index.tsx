import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  NativeModules
} from 'react-native';
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';

//import Query
import {usePostQuery} from '../../graphql/Post';

//import Components
import PostList from '../../components/Post/postList';
import {MediaContext} from '../../App';
import { useNavigation } from '@react-navigation/native';

import {
  PESDK,
  PhotoEditorModal,
  Configuration,
  Tool,
  AdjustmentTool,
} from 'react-native-photoeditorsdk';
import {
  VESDK,
  VideoEditorModal,
  Configuration as cfg,
} from 'react-native-videoeditorsdk';
import CameraComponent from '../../components/Media/Camera';
const {CustomNative}=NativeModules;

const HomeScreen = () => {
  const navigation = useNavigation()
  const {loading, error, data, refetch, fetchMore} = usePostQuery();
  let postLists = [];
  const [videoMute, setVideoMute] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const mediaPlayerContext = useContext(MediaContext);

  const [showCamera, setShowCamera] = useState(false);

  if (loading) {
    <View>
      <Text>Loading</Text>
    </View>;
  }

  if (!loading && data) postLists = data?.posts?.edges;

  useEffect(() => {
    if (postLists.length > 0) {
      mediaPlayerContext.setMediaPlayId(postLists[0]['node']['id']);
    }
  }, [postLists]);

  const keyExtractor = item => {
    // console.log(item.node.id)
    return item?.node?.id;
  };

  const onViewRef = React.useRef(({viewableItems}) => {
    // console.log(viewableItems[0]['item']['node']['id']);
    mediaPlayerContext.setMediaPlayId(viewableItems[0]['item']['node']['id']);
  });
  const viewConfigRef = {viewAreaCoveragePercentThreshold: 50};



  const openCamera = () => {
    setShowCamera(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <PhotoEditorModal visible={true}/> */}
    

      <TouchableOpacity onPress={()=>{CustomNative.Toastshow("hai", CustomNative.SHORT);}}>
        <Text
          style={{
            color: '#fff',
            padding: 10,
            alignSelf: 'center',
            backgroundColor: 'blue',
            borderRadius: 20,
          }}>
          Open Camera
        </Text>
      </TouchableOpacity>


      {/* <FlatList
        viewabilityConfig={viewConfigRef}
        data={postLists}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => {
          return (
            <PostList
              item={item}
              videoMute={videoMute}
              setVideoMute={setVideoMute}
              key={item.node.id}
              scrollPosition={scrollPosition}
            />
          );
        }}
        onViewableItemsChanged={onViewRef.current}
      /> */}
      {/* <SafeAreaView>
        <ScrollView
          onScroll={event => {
            setScrollPosition(event.nativeEvent.contentOffset.y);
          }}>
          {data?.posts?.edges.map((item, index) => {
            return (
              <PostList
                item={item}
                videoMute={videoMute}
                setVideoMute={setVideoMute}
                key={index}
                scrollPosition={scrollPosition}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView> */}
    </View>
    // <View style={{marginTop:50}}>

    // <Camera/>
    // </View>
  );
};

export default HomeScreen;
