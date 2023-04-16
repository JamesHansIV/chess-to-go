import { StyleSheet, Text, View, TextInput, Image,PermissionsAndroid ,PanResponder} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import {Dimensions} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Provider, Button, DefaultTheme,RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera } from 'expo-camera';
import { Permissions } from 'expo';
import { useNavigation } from '@react-navigation/native';
import GameLanding from './GameLanding';
import Draggable from 'react-native-draggable';
import router from './routing'


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

// function getEncodedFile(imageUri, setImage) {
//   const reader = new FileReader();
//   reader.onload = () => {
//     const imgData = reader.result;
//     setImage(imgData);
//     console.log(imgData)
//   }
//   console.log(imageUri)
//   reader.readAsDataURL(imageUri);
//   console.log("gets to here")
// }

export default function HomePage() {
  const [image, setImage] = useState(null);
  const [imageBytes, setImageBytes] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(styles.buttonContainer);
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState('first');
  // const [dotPositions, setDotPositions] = useState([
  //   { x: 100, y: 60 },
  //   { x: 300, y: 60 },
  //   { x: 100, y: 260 },
  //   { x: 300, y: 260 },
  // ]);
  const dotPosInit = [{x:100, y:60},{x:300, y:60},{x:100, y:260},{x:300, y:260}]

  const imgRef = useRef(null);

  const topLeftDotPos = useRef({x:100, y:60});
  const topRightDotPos = useRef({x:300, y:60});
  const bottomLeftDotPos = useRef({x:100, y:260});
  const bottomRightDotPos = useRef({x:300, y:260});

  // useEffect(() => {
  
  // }, []);
  const [links, setLinks] = useState([]);


  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted')
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleSubmit = async () => {
    const newLinks = await router("makeGame", { imgData: imageBytes, checked: checked });
    setLinks(newLinks)
    //router("makeGame", { fenString: fenString }, setLinks);
    await navigation.navigate('GameLanding', { gameLink1: newLinks[0], gameLink2: newLinks[1]});
  }

  const pickImage = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      // await Permissions.askAsync(Permissions.CAMERA);
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (!result.cancelled) {
      setImage(result.uri)
      setImageBytes(result.base64)
      setButtonStyle(styles.buttonContainerNoMargin)
    }
  };

  return (
    <Provider theme={theme}>
      <View style = {styles.screen}>
        <View style = {styles.logo}>
          <Text style={styles.title}>Chess-To-Go</Text>
        </View>
        <View style = {styles.container}>
          <View style={buttonStyle}>
          <Button icon ="camera" title="Select Image" onPress={()=> pickImage(false)}>Upload Image</Button>
          </View>

            {/* <Draggable
              x={topLeftDotPosRef.current.x}
              y={topLeftDotPosRef.current.y}
              ref={topLeftDotPosRef}
            >
              <View style={[styles.dot, {backgroundColor: 'black'}]}/>
            </Draggable> */}


{/* 
            <Draggable
              x={bottomLeftDotPosRef.current.x}
              y={bottomLeftDotPosRef.current.y}
              ref={bottomLeftDotPosRef}
            >
              <View style={[styles.dot, {backgroundColor: 'black'}]}/>
            </Draggable>

            <Draggable
              x={bottomRightDotPosRef.current.x}
              y={bottomRightDotPosRef.current.y}
              ref={bottomRightDotPosRef}
            >
              <View style={[styles.dot, {backgroundColor: 'black'}]}/>
            </Draggable> */}
          {/* {dotPositions.map((position, index) => (
      <Draggable
        key={index}
        x={position.x}
        y={position.y}
        onDrag={(event, { x, y }) => {
          const newDotPositions = [...dotPositions];
          newDotPositions[index] = { x, y };
          setDotPositions(newDotPositions);
        }}
        onStop={(event, { x, y }) => {
          // do something with the new position of the component after it has been dropped
          console.log(`Dropped at x:${x}, y:${y}`);
        }}
        scale={0.01} 
      >
        <View style={[styles.dot, { backgroundColor: 'black' }]} />
      </Draggable> */}
    {/* ))} */}
          <View style={{ width: 200, height: 200, elevation:0 }} ref={imgRef} onLayout={(e)=>{console.log(e.nativeEvent.layout.height)}}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, elevation:0 }}
            onLayout={(e)=>{
              imgRef.current.x = e.nativeEvent.layout.x;
              imgRef.current.y = e.nativeEvent.layout.y;
              imgRef.current.width = e.nativeEvent.layout.width;
              imgRef.current.height = e.nativeEvent.layout.height;
              // console.log("asfda", imgRef.current.width)
            }}/>}
          </View>

          <Draggable
              x={dotPosInit[0].x}
              y={dotPosInit[0].y}
              
              onDragRelease={(e)=>{
                const windowWidth = Dimensions.get('window').width;
                // const windowHeight = Dimensions.get('window').height;
                topLeftDotPos.current.x = e.nativeEvent.pageX - (windowWidth - imgRef.current.width) / 2;
                topLeftDotPos.current.y = e.nativeEvent.pageY - imgRef.current.y;
                console.log("top left dot", topLeftDotPos.current.x, imgRef.current.x);
                // console.log(e.nativeEvent.pageY)
                // topLeftDotPos.current.x = e.nativeEvent
              }}
            >
              <View style={[styles.dot, {backgroundColor: '#00FF00'}]}/>
            </Draggable>

          <View style= {styles.radioContainer}>
          <Text style={{ marginBottom: 8 }}>Your Color:</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="first" status={ checked === 'first' ? 'checked' : 'unchecked' } onPress={() => setChecked('first')}/>
            <Text style={{ marginLeft: 8 }} color = "blue">White</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="second" status={ checked === 'second' ? 'checked' : 'unchecked' } onPress={() => setChecked('second')}/>
            <Text style={{ marginLeft: 8 }} color = "blue">Black</Text>
          </View>
          </View>

          <View style={styles.submitContainer}>
          <Button disabled={!image || isLoading} onPress={handleSubmit}>Submit</Button>
          </View>
        </View>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  radioContainer: {
    display: 'flex',
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10
  },
  logo: {
    display: 'flex',
    alignItems : 'center',
    justifyContent: 'center',
    height: '8%',
    backgroundColor: 'white',
    marginBottom: 20
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%'
  },
  title: {
    fontFamily: 'sans-serif',
    fontSize: 35,
    textAlign: 'center',
    color: 'blue'
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
    borderWidth: 2,
    borderColor: 'blue',
    // marginBottom: 200
  },
  buttonContainerNoMargin: {
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 7,
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 20
  },
  submitContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    margin: 20,
    borderWidth: 2,
    borderColor: 'blue',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
    elevation: 99
  },
  });

