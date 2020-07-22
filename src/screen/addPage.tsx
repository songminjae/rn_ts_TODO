import * as React from 'react';
import { useState } from "react";
import { Button, View, TextInput, Text } from 'react-native';
import { styles } from "./styles";



export function ProfileScreen({ navigation }) {
  const [date, setDate] = useState("2020-01-01");
  const [text, setText] = useState('default text');
  const [time, setTime] = useState('0');

  console.log(date);
  
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />

        <View style={styles.wrap}>
          <Text>Date</Text>
          <TextInput style={styles.input} onChangeText ={input => setDate(input)}>date?</TextInput>
          <Text>Text</Text>
          <TextInput style={styles.input} onChangeText ={input => setText(input)}>text?</TextInput>
          <Text>time</Text>
          <TextInput style={styles.input}  onChangeText={input=>setTime(input)} >time?</TextInput>

          <Button title="return" onPress={() => navigation.goBack()} />
        </View>


      </View>
    );
  }
  