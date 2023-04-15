import { StyleSheet, Text, View, TextInput, Image,PermissionsAndroid } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Provider, Button, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera } from 'expo-camera';
import { Permissions } from 'expo';
import { useNavigation } from '@react-navigation/native';
import GameLanding from './GameLanding';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

export default function HomePage() {
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(styles.buttonContainer);
  const navigation = useNavigation();

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
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const pickImage = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      await Permissions.askAsync(Permissions.CAMERA);
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
  
    if (!result.cancelled) {
      setImage(result.uri);
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
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <View style={styles.submitContainer}>
          <Button disabled={!image || isLoading} onPress={() => navigation.navigate(GameLanding)}>Submit</Button>
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
  logo: {
    display: 'flex',
    alignItems : 'center',
    justifyContent: 'center',
    height: '20%'
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%'
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
    padding: 5,
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 200
  },
  buttonContainerNoMargin: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
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
  }
  });

