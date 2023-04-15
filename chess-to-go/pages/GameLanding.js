import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
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
  return (
    <Provider theme={theme}>
       <View style = {styles.screen}>
        <View style = {styles.logo}>
          <Text style={styles.title}>Chess-To-Go</Text>
        </View>
        <Text style={{ fontSize: 16 }}>Your Game Link is: </Text>
        <Text style={{ fontSize: 16 }}>gamelink.com</Text>
        <TextInput
          placeholder="Enter your phone number"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="phone-pad"
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, fontSize: 16 }}
        />
        <Button
          title="Submit"
          onPress={() => console.log(`Submitted phone number: ${phoneNumber}`)}
        />
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
    }
});