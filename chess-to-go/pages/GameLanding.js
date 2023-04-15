import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image, Linking } from 'react-native';
import { Provider, Button, DefaultTheme,RadioButton } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'yellow',
    },
  };
  

export default function GameLanding() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleGameLinkPress = () => {
        Linking.openURL('https://www.ku.edu');
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
            <Text style = {{fontSize: 20,textDecorationLine: 'underline',color: 'blue'}} onPress={handleGameLinkPress}>gamelink.com</Text>
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
          onPress={() => console.log(`Submitted phone number: ${phoneNumber}`)}
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