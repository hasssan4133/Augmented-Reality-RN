import React, {useState,useRef} from 'react';
import {StyleSheet,View} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroCamera,
  
} from '@viro-community/react-viro';
import  { RNCamera } from 'react-native-camera';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState(' AR...');
  const refs=useRef()
  function onInitialized(state, reason) {
    
    refs.current.getCameraOrientationAsync().then((orientation)=>{
      // console.log('POSITION->',orientation)

      refs.current.performARHitTestWithRay(orientation.forward).then((results)=>{
        results?.map((item)=>{
          console.log('HIT-TEST result->', item.transform);
        })

      })
    })
  }

  return (
    <ViroARScene ref={refs}
      onCameraARHitTest={(e) => {
        console.log('RES-->', e.hitTestResults[0]?.transform)
      }}>
      <ViroCamera
        position={[1, 1, 1]}
        rotation={[45, 0, 0]}
        active={true}
      />
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      /> */}
        {/* <ViroARBodyTracking target={{"type" : "leftHand"}}> */}
    {/* <Viro3DObject
      source={require('./res/left_hand.obj')}
      position={[0, 0, -1]}
      scale={[0.1, 0.1, 0.1]}
      rotation={[0, 90, 0]}
      type="OBJ"
    /> */}
  {/* </ViroARBodyTracking> */}

    </ViroARScene>
  );
};
ViroMaterials.createMaterials({
  heart: {
     lightingModel: "Phong",
     diffuseTexture: require('./res/coca-cola-zero.jpg'),
     specularTexture: require('./res/img1.png'),
   },
});
export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {
    flex: 1
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
