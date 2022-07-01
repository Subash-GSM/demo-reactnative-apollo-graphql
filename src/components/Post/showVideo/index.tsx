import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import {
  MoreSVG,
  PlaySVG,
  PauseSVG,
  VolumeMuteSVG,
  VolumeSVG,
} from '../../../assets/svg';
import {MediaContext} from '../../../App';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type VideoProps = {
  album: {formats: {thumbnail: {url: string}}; url: string}[];
  mute: boolean;
  setMute: Function;
  isPlayVideo: boolean;
  likePost: boolean;
  setLikePost: Function;
  id: any;
};

const VideoShower = ({
  album,
  mute,
  setMute,
  isPlayVideo,
  likePost,
  setLikePost,
  id,
}: VideoProps) => {
  const [videoControlState, setVideoControlState] = useState({
    paused: true,
  });
  const videoPlayer = React.useRef();

  const [opacity, setOpacity] = React.useState(0);
  const mediaPlayerContext = useContext(MediaContext);

  const uri = album[0]?.url;

  const onLoadStart = () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = (isBuffering: boolean) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  useEffect(() => {
    setVideoControlState({...videoControlState, paused: !isPlayVideo});
  }, [isPlayVideo]);

  return (
    <View style={[styles.container]}>
      <DoubleClick
        singleTap={() => {
          setMute(!mute);
        }}
        doubleTap={() => {
          setLikePost(!likePost);
        }}
        delay={200}>
        <Video
          source={{
            uri,
          }}
          ref={(ref: any) => (videoPlayer.current = ref)}
          muted={mute}
          repeat={true}
          playInBackground={false}
          style={styles.videoPlayer}
          resizeMode={'cover'}
          onBuffer={onBuffer}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          paused={videoControlState.paused}
        />
        <View style={styles.topVideoControls}>
          <TouchableOpacity
            onPress={() => {
              setVideoControlState({
                ...videoControlState,
                paused: !videoControlState.paused,
              });
            }}
            style={{margin: 5}}>
            <View style={styles.controlIconBackground}>
              <MoreSVG style={{alignSelf: 'center'}} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomVideoControls}>
          <TouchableOpacity
            onPress={() => {
              setMute(!mute);
            }}
            style={{margin: 5}}>
            <View style={styles.controlIconBackground}>
              {mute ? (
                <VolumeMuteSVG style={{alignSelf: 'center'}} />
              ) : (
                <VolumeSVG style={{alignSelf: 'center'}} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (videoControlState.paused) {
                mediaPlayerContext.setMediaPlayId(id);
              }
              setVideoControlState({
                ...videoControlState,
                paused: !videoControlState.paused,
              });
            }}
            style={{margin: 5}}>
            <View style={styles.controlIconBackground}>
              {videoControlState.paused ? (
                <PlaySVG style={{alignSelf: 'center', marginLeft: 4}} />
              ) : (
                <PauseSVG style={{alignSelf: 'center'}} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {videoControlState.paused ? (
          <Image
            source={{uri: album[0]['formats']['thumbnail']['url']}}
            style={{
              borderWidth: 1,
              width: '100%',
              height: SCREEN_WIDTH,
              position: 'absolute',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              // opacity:opacity
            }}
          />
        ) : null}
      </DoubleClick>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    margin: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // height:'100%'
  },
  videoPlayer: {
    height: SCREEN_WIDTH,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  bottomVideoControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1000,
  },

  topVideoControls: {
    position: 'absolute',
    right: 10,
    marginTop: 12,
    zIndex: 100,
  },

  controlIconBackground: {
    height: 28,
    width: 28,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 33,
    justifyContent: 'center',
  },
});

export default VideoShower;
