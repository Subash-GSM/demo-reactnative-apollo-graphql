import React, {useEffect, useRef, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  CaptureSVG,
  ChangeCameraSVG,
  ChooseFromGallery,
  ChooseFromGallerySVG,
  CloseCameraSVG,
  EditSVG,
  EffectsSVG,
  FlashAutoSVG,
  FlashOffSVG,
  FlashONSVG,
  HorizontalRectangleActiveSVG,
  HorizontalRectangleSVG,
  MusicSVG,
  ShowGridEnabledSVG,
  ShowGridSVG,
  SquareActiveSVG,
  SquareSVG,
  VerticalRectangleActiveSVG,
  VerticalRectangleSVG,
  VideoProgressSVG,
  VideoStartSVG,
} from '../../assets/svg';
import {normalize} from '../../utils/responsive';
import DocumentPicker, {types} from 'react-native-document-picker';
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


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const MEDIA_MODE = {
  PHOTO: 'PHOTO',
  VIDEO: 'VIDEO',
};

const CAMERA_TYPE = {
  FRONT: 'FRONT',
  BACK: 'BACK',
};

const FLASH_MODE = {
  AUTO: 'auto',
  OFF: 'off',
  ON: 'on',
};

const VIDEO_STATE = {
  PROGRESS: 'PROGRESS',
  STOPPED: 'STOPPED',
};

const CROP_RATIO = {
  SQUARE: 'SQUARE',
  HORIZONTAL_RECTANGLE: 'HORIZONTAL_RECTANGLE',
  VERTICAL_RECTANGLE: 'VERTICAL_RECTANGLE',
};

const SCREEN_CROP_SIZE_INITIAL_STATE = {
  width: 0,
  height: 0,
};
const CameraComponent = () => {
  const navigation = useNavigation()
  const [mediaMode, setMediaMode] = useState(MEDIA_MODE.PHOTO);
  const [cameraType, setCameraType] = useState(CAMERA_TYPE.FRONT);
  const [flashMode, setFlashMode] = useState(FLASH_MODE.OFF);
  const [showGrid, setShowGrid] = useState(false);

  const [ratio, setRatio] = useState(CROP_RATIO.VERTICAL_RECTANGLE);
  const [screenCropSize, setScreenCropSize] = useState(
    SCREEN_CROP_SIZE_INITIAL_STATE,
  );

  const [videoState, setVideoState] = useState(VIDEO_STATE.STOPPED);

  const [photoURI, setPhotoURI] = useState(null);

  const cameraRef = useRef();

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      setPhotoURI(data.uri);
    }
  };

  const startRecording = async () => {
    setVideoState(VIDEO_STATE.PROGRESS);
    if (cameraRef.current) {
      const {uri, codec = 'mp4'} = await cameraRef.current.recordAsync();
      console.info(uri);
    }
  };
  const stopRecording = () => {
    setVideoState(VIDEO_STATE.STOPPED);
    cameraRef.current.stopRecording();
  };

  useEffect(() => {
    console.log(SCREEN_HEIGHT, SCREEN_WIDTH);
    if (ratio === CROP_RATIO.SQUARE) {
      setScreenCropSize({width: SCREEN_WIDTH, height: SCREEN_WIDTH});
    } else if (ratio === CROP_RATIO.HORIZONTAL_RECTANGLE) {
      setScreenCropSize({
        width: SCREEN_WIDTH,
        height: parseInt((SCREEN_WIDTH / 4) * 3),
      });
    } else {
      setScreenCropSize({
        width: SCREEN_WIDTH,
        height: parseInt((SCREEN_WIDTH / 3) * 4),
      });
    }
  }, [ratio]);

  const selectMediaFile = async () => {
    let mediaFile = await DocumentPicker.pick({
      type: [types.images, types.video],
    });
    console.log(mediaFile);
    setPhotoURI(mediaFile[0].uri);
  };

  const selectAudioFile = async()=>{
    let audioFile = await DocumentPicker.pick({
      type: [types.audio],
    });
    console.log(audioFile);
  }


  const openEditor = () => {

    let configuration: Configuration = {
      tools: [Tool.TRIM, Tool.ADJUSTMENT, Tool.FILTER, Tool.AUDIO],

      adjustment: {
        /**
         * Whether to show a reset button to reset the applied adjustments.
         * @example // Defaults to:
         * true
         */
        showResetButton: false,
        /**
         * Defines all allowed adjustment tools. The adjustment tool buttons are always shown in the given order.
         * @example // Defaults to:
         * [AdjustmentTool.BRIGHTNESS, AdjustmentTool.CONTRAST, AdjustmentTool.SATURATION, AdjustmentTool.CLARITY, AdjustmentTool.SHADOWS, AdjustmentTool.HIGHLIGHTS, AdjustmentTool.EXPOSURE, AdjustmentTool.GAMMA, AdjustmentTool.BLACKS, AdjustmentTool.WHITES, AdjustmentTool.TEMPERATURE, AdjustmentTool.SHARPNESS]
         */
        items: [
          AdjustmentTool.EXPOSURE,
          AdjustmentTool.BRIGHTNESS,
          AdjustmentTool.CONTRAST,
          AdjustmentTool.SATURATION,
        ],
      },
    };
    PESDK.openEditor(photoURI, configuration).then(
      result => {
        console.log(result);
        setPhotoURI(result['image'])
      },
      error => {
        console.log(error);
      },
    );
  };
  return (
    <>
      {photoURI ? (
        <View>
          <Image
            source={{
              uri: photoURI,
            }}
            style={{height: '100%', width: '100%'}}
          />
          <View
            style={{
              height:
                60 +
                parseInt(
                  (SCREEN_HEIGHT - normalize(80) * 2 - screenCropSize.height) /
                    2,
                ),
              width: '100%',
              position: 'absolute',
              backgroundColor: '#000',
              paddingHorizontal: normalize(18),
              opacity: 0.8,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <CloseCameraSVG />
              <Text
                style={{
                  fontSize: normalize(17),
                  fontFamily: 'Avenir',
                  color: '#fff',
                }}>
                Capture Photo
              </Text>
              <TouchableOpacity onPress={()=>{navigation.navigate('Media-Upload',{uri:photoURI})}}>
                <View
                  style={{
                    height: normalize(34),
                    width: normalize(62),
                    backgroundColor: '#0062FF',
                    borderRadius: normalize(24),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff', fontSize: normalize(16)}}>
                    Next
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* GRID */}
          {/* <View
            style={{
              position: 'absolute',
              marginTop:
                60 +
                parseInt(
                  (SCREEN_HEIGHT - normalize(80) * 2 - screenCropSize.height) /
                    2,
                ),
              height: screenCropSize.height,
              width: screenCropSize.width,
              borderColor: '#ccc',
              borderWidth: 1,
            }}>
            <View
              style={{
                height: screenCropSize.height / 3,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
            </View>
            <View
              style={{
                height: screenCropSize.height / 3,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
            </View>
            <View
              style={{
                height: screenCropSize.height / 3,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
              <View
                style={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  width: '33%',
                  height: '100%',
                }}></View>
            </View>
          </View> */}
          {/* <View
            style={{
              position: 'absolute',
              bottom: normalize(80),
              backgroundColor: '#000',
              width: '100%',
              height:
                SCREEN_HEIGHT -
                (60 +
                  parseInt(
                    (SCREEN_HEIGHT -
                      normalize(80) * 2 -
                      screenCropSize.height) /
                      2,
                  ) +
                  normalize(80) +
                  screenCropSize.height),
              opacity: 0.7,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
                alignSelf: 'center',
                marginTop: 'auto',
                // marginBottom: normalize(36),
                marginBottom:
                  ratio === CROP_RATIO.VERTICAL_RECTANGLE
                    ? 'auto'
                    : normalize(36),
              }}>
              {ratio === CROP_RATIO.VERTICAL_RECTANGLE ? (
                <VerticalRectangleActiveSVG />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setRatio(CROP_RATIO.VERTICAL_RECTANGLE);
                  }}>
                  <VerticalRectangleSVG />
                </TouchableOpacity>
              )}
              {ratio === CROP_RATIO.SQUARE ? (
                <TouchableOpacity>
                  <SquareActiveSVG />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setRatio(CROP_RATIO.SQUARE);
                  }}>
                  <SquareSVG />
                </TouchableOpacity>
              )}
              {ratio === CROP_RATIO.HORIZONTAL_RECTANGLE ? (
                <HorizontalRectangleActiveSVG />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setRatio(CROP_RATIO.HORIZONTAL_RECTANGLE);
                  }}>
                  <HorizontalRectangleSVG />
                </TouchableOpacity>
              )}
            </View>
          </View> */}
          <View
            style={{
              position: 'absolute',
              height: normalize(80),
              backgroundColor: '#0F0F0F',
              width: '100%',
              bottom: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <EffectsSVG />
                <Text style={{marginLeft: 10}}>Effects</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={openEditor}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <EditSVG />
                <Text style={{marginLeft: 10}}>Edit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectAudioFile}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MusicSVG />
                <Text style={{marginLeft: 10}}>Music</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <RNCamera
            ref={cameraRef}
            type={
              cameraType === CAMERA_TYPE.FRONT
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            flashMode={flashMode}
            style={styles.preview}
          />
          <View
            style={{
              position: 'absolute',
              height: 50,
              width: '100%',
              backgroundColor: '#000',
              justifyContent: 'space-between',
              flexDirection: 'row',
              display: 'flex',
            }}>
            <View>
              <CloseCameraSVG />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 10,
              }}>
              {showGrid ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowGrid(false);
                  }}>
                  <ShowGridEnabledSVG />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowGrid(true);
                  }}>
                  <ShowGridSVG />
                </TouchableOpacity>
              )}

              {flashMode === FLASH_MODE.AUTO && (
                <TouchableOpacity
                  onPress={() => {
                    setFlashMode(FLASH_MODE.ON);
                  }}>
                  <FlashAutoSVG />
                </TouchableOpacity>
              )}
              {flashMode === FLASH_MODE.OFF && (
                <TouchableOpacity
                  onPress={() => {
                    setFlashMode(FLASH_MODE.AUTO);
                  }}>
                  <FlashOffSVG />
                </TouchableOpacity>
              )}
              {flashMode === FLASH_MODE.ON && (
                <TouchableOpacity
                  onPress={() => {
                    setFlashMode(FLASH_MODE.OFF);
                  }}>
                  <FlashONSVG />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              height: 70,
              width: '100%',
              bottom: 0,
              // marginTop:'auto'
            }}>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'black',
              }}>
              <TouchableOpacity
                style={{margin: 20}}
                onPress={() => {
                  setMediaMode(MEDIA_MODE.PHOTO);
                }}>
                <Text
                  style={{
                    fontWeight: mediaMode === MEDIA_MODE.PHOTO ? '900' : '500',
                    fontSize: normalize(17),
                  }}>
                  Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 20}}
                onPress={() => {
                  setMediaMode(MEDIA_MODE.VIDEO);
                }}>
                <Text
                  style={{
                    fontWeight: mediaMode === MEDIA_MODE.VIDEO ? '900' : '500',
                    fontSize: normalize(17),
                  }}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              height: 191,
              width: '100%',
              bottom: 70,
              opacity: 0.7,
            }}>
            <View
              style={{
                justifyContent: 'space-around',
                display: 'flex',
                flexDirection: 'row',
                marginTop: 'auto',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{margin: 20}} onPress={selectMediaFile}>
                <ChooseFromGallerySVG />
              </TouchableOpacity>

              {mediaMode === MEDIA_MODE.PHOTO ? (
                <TouchableOpacity style={{margin: 20}} onPress={takePicture}>
                  <CaptureSVG />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{margin: 20}}
                  onPress={
                    videoState === VIDEO_STATE.STOPPED
                      ? startRecording
                      : stopRecording
                  }>
                  {VIDEO_STATE.STOPPED === videoState ? (
                    <VideoStartSVG />
                  ) : (
                    <VideoProgressSVG />
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{margin: 20}}
                onPress={() => {
                  setCameraType(cameraType =>
                    cameraType === CAMERA_TYPE.BACK
                      ? CAMERA_TYPE.FRONT
                      : CAMERA_TYPE.BACK,
                  );
                }}>
                <ChangeCameraSVG />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default CameraComponent;

// class CameraComponent extends PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.front}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}

//         />

//       </View>
//     );
//   }

// }

// export default CameraComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    height: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
