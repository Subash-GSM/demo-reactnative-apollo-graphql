import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import React, {useState, useRef, useMemo, useEffect, useContext} from 'react';

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

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView>
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
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
