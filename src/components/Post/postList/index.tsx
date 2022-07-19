import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect, useState, useContext, useMemo} from 'react';
import PhotoShower from '../showImage';
import VideoShower from '../showVideo';
import {normalize} from '../../../utils/responsive';
import {
  LocationSVG,
  StarSVG,
  HeartSVG,
  LikeBlueSVG,
  LikeButtonSVG,
  LikedButtonSVG,
  CommentButtonSVG,
  ShareButtonSVG,
  VoteButtonSVG,
} from '../../../assets/svg';
import {MediaContext} from '../../../App';
type PostProps = {
  item: {
    node: {
      album: {url: string; formats: any}[];
      age: string;
      caption: string;
      commentsCount: string;
      owner: any;
      reactions: any;
      hashTags: string[];
      id: any;
    };
  };
  videoMute: boolean;
  setVideoMute: Function;
};

const PostList = React.memo(({item, videoMute, setVideoMute}: PostProps) => {
  const mediaPlayerContext = useContext(MediaContext);
  const _checkVideo = (url: string) => {
    const images = ['jpg', 'gif', 'png', 'jpeg'];
    const videos = ['m3u8', 'mp4', '3gp', 'ogg', 'mov'];
    const extension: any = url.split('.').pop();
    if (images.includes(extension)) {
      return 'image';
    } else if (videos.includes(extension)) {
      return 'video';
    }
  };
  const postData = item.node;
  const [likePost, setLikePost] = useState(false);

  return (
    <View style={styles.postListContainer}>
      {_checkVideo(postData.album[0].url) === 'image' ? (
        <PhotoShower
          album={postData.album}
          likePost={likePost}
          setLikePost={setLikePost}
        />
      ) : (
        <View>
          <VideoShower
            album={postData.album}
            mute={videoMute}
            setMute={setVideoMute}
            isPlayVideo={mediaPlayerContext.mediaPlayId === postData['id']}
            likePost={likePost}
            setLikePost={setLikePost}
            id={postData['id']}
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.locationRowContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <LocationSVG />
            <Text style={styles.locationText}>Azad Maidan</Text>
          </View>
          <View>
            <Text style={styles.postAgeText}>{postData['age']}</Text>
          </View>
        </View>

        {postData['caption'] ? (
          <View style={styles.postCaptionContainer}>
            {postData['caption'].split(' ').map((text, index) => {
              if (text.length !== 0) {
                return (
                  <Text
                    style={{
                      ...styles.postCaptionText,
                      color: text.startsWith('#') ? '#6A6A6A' : '#000',
                    }}
                    key={index}>
                    {text}
                  </Text>
                );
              } else {
                return null;
              }
            })}
          </View>
        ) : null}

        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop:
              postData.hashTags && postData.hashTags.length > 0 ? 12 : 0,
          }}>
          {postData.hashTags &&
            postData.hashTags.map((tags: string) => {
              return (
                <Text
                  style={{
                    padding: 2,
                    color: '#6A6A6A',
                    fontFamily: 'Avenir-Medium',
                    fontSize: normalize(16),
                    lineHeight: normalize(22),
                    fontWeight: '500',
                  }}>
                  #{tags}
                </Text>
              );
            })}
        </View> */}

        <View style={styles.reactionRowContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StarSVG />
              <HeartSVG style={{marginLeft: 5}} />
              <LikeBlueSVG style={{marginLeft: 5}} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.reactionCountText}>
                {postData['reactions']['reactionsCount']}
              </Text>
              <Text style={styles.reactionText}>Reactions</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.commentsCountText}>
              {postData['commentsCount']}
            </Text>
            <Text style={styles.commentsText}>Comments</Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: normalize(12),
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View
            style={{
              ...styles.reactButtonContainer,
              borderColor: likePost ? '#0062FF' : '#C3C3C3',
            }}>
            {likePost ? <LikedButtonSVG /> : <LikeButtonSVG />}
            <Text
              style={{
                color: likePost ? '#0062FF' : '#000',
                marginLeft: 5,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: '500',
              }}>
              Like
            </Text>
          </View>
          <View style={styles.reactButtonContainer}>
            <CommentButtonSVG />
            <Text style={styles.reactButtonInnerText}>Comment</Text>
          </View>
          <View style={styles.reactButtonContainer}>
            <ShareButtonSVG />
            <Text style={styles.reactButtonInnerText}>Share</Text>
          </View>
        </View>

        <View style={styles.profileRowContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Image
              source={{
                uri: postData['owner']['avatar']['formats']['thumbnail']['url'],
              }}
              style={{width: 45, height: 45, borderRadius: 22.5}}
            />
            <View style={{marginLeft: 12}}>
              <Text style={styles.postOwnerNameText}>
                {postData['owner']['fullname']}
              </Text>
              <Text style={styles.sportTypeText}>
                {postData['owner']['sports'][0]['sporttype']['displayname']},{' '}
                {postData['owner']['sports'][0]['sportstyle']['displayname']}
              </Text>
            </View>
          </View>

          <View style={styles.voteButton}>
            <VoteButtonSVG />
            <Text style={styles.voteButtonText}>Vote</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  postListContainer: {
    margin: 5,
    marginBottom: 0,
    borderRadius: 30,
    backgroundColor: '#fff',
  },

  contentContainer: {
    marginHorizontal: normalize(12),
  },
  reactButtonContainer: {
    height: 32,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderColor: '#C3C3C3',
    paddingVertical: 5,
  },

  locationRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  locationText: {
    color: '#000',
    marginLeft: 5,
    fontFamily: 'Avenir-Book',
    fontSize: normalize(14),
    lineHeight: normalize(19),
    fontWeight: '400',
  },
  postAgeText: {
    color: '#000',
    fontFamily: 'Avenir-Book',
    fontSize: normalize(14),
    lineHeight: normalize(19),
    fontWeight: '400',
  },
  postCaptionContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postCaptionText: {
    fontFamily: 'Avenir-Medium',
    fontSize: normalize(16),
    lineHeight: normalize(22),
    marginRight: 5,
  },
  reactionRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  reactionCountText: {
    color: '#000',
    marginLeft: 10,
    fontFamily: 'Avenir-Medium',
    lineHeight: 18,
    fontWeight: '500',
  },
  reactionText: {
    color: '#989898',
    marginLeft: 5,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: normalize(14),
    lineHeight: normalize(19),
  },
  commentsCountText: {
    color: '#000',
    fontFamily: 'Avenir-Medium',
    fontSize: normalize(13),
    lineHeight: normalize(18),
    fontWeight: '500',
  },
  commentsText: {
    color: '#989898',
    marginLeft: 5,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: normalize(14),
    lineHeight: normalize(19),
  },
  reactButtonInnerText: {
    color: '#000',
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  voteButton: {
    backgroundColor: '#0062FF',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 82,
    borderRadius: 24,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 5,
  },
  postOwnerNameText: {
    fontSize: normalize(16),
    color: '#000',
    fontWeight: '900',
    fontFamily: 'Avenir-Black',
    lineHeight: normalize(22),
  },
  sportTypeText: {
    fontSize: normalize(13),
    lineHeight: normalize(18),
    color: '#383838',
    fontWeight: '500',
    fontFamily: 'Avenir-Book',
  },
  profileRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default PostList;
