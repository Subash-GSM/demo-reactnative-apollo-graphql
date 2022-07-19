import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
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

const HomeScreen = () => {
  const {loading, error, data, refetch, fetchMore} = usePostQuery();
  let postLists = [];
  const [videoMute, setVideoMute] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const mediaPlayerContext = useContext(MediaContext);

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
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
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
      />
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
  );
};

export default HomeScreen;
