import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Image, Linking } from 'react-native';
import { Provider, Button, DefaultTheme,RadioButton } from 'react-native-paper';
import router from './routing'
const fetch = require('node-fetch');

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'yellow',
    },
  };

export default function GameLanding(route) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gameLink1, setGameLink1] = useState('');
    const [gameLink2, setGameLink2] = useState('');

  
    const handleSubmit = async () => {
      //await router('sendGame', {'number': phoneNumber, 'url': gameLink2}, null)
      const link = gameLink2.replace("https://lichess.org/", "");
      let data = {'number': phoneNumber, 'url': link}

      var formBody = [];
      for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      const url = 'http://10.104.11.53:5000/sendGame';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
    }

    useEffect(() => {
      let gameLink1 = route.route.params.gameLink1;
      let gameLink2 = route.route.params.gameLink2;
      console.log(gameLink1)
      console.log(gameLink2)
      setGameLink1(gameLink1)
      setGameLink2(gameLink2)
    }, []);

    const handleGameLinkPress = () => {
        Linking.openURL(gameLink1);
    }
  return (
    <Provider theme={theme}>
       <View style = {styles.screen}>
        <View style = {styles.logo}>
          <Text style={styles.title}>Chess-To-Go</Text>
        </View>
        <View style = {styles.body}>
        <View style = {styles.gameLink}>
            <Text style = {{fontSize: 20}}>Click on the link to join your game: </Text>
            <Text style = {{fontSize: 20,textDecorationLine: 'underline',color: 'blue'}} onPress={handleGameLinkPress}>{gameLink1}</Text>
        </View>
        <TextInput
          placeholder="Enter your friend's phone number"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="phone-pad"
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, fontSize: 16 }}
        />
        <View style={styles.submitContainer}>
        <Button
          title="Submit"
          onPress={handleSubmit}
        >Submit</Button>
        </View>
        </View>
      </View>
      </Provider>
    );
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
        height: '8%',
        backgroundColor: 'white',
        marginBottom: 20
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 35,
        textAlign: 'center',
        color: 'blue'
    },
    body: {
        alignItems: 'center',
        height: '60%'
    },
    gameLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 45,
        marginBottom: 30
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