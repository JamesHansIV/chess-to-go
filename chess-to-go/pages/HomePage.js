import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';


export default function HomePage() {
  const [image, setImage] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log << result.uri
    }
  };

  return (
    <View style = {styles.container}>
      <Button title="Select Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {/* <Button title="Submit" onPress={handleSubmit} disabled={!image || isLoading} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

