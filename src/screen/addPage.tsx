import * as React from 'react';
import { useState } from "react";
import { Button, View, TextInput, Text } from 'react-native';
import { styles } from "./styles";

import firestore from "@react-native-firebase/firestore";



export function ProfileScreen({ navigation }) {
  const [date, setDate] = useState<String>("2020-01-01");
  const [text, setText] = useState<String>('default text');
  const [time, setTime] = useState<String>('0');

  async function postDate(data : String){

    fetch('http://35.213.58.175/api/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  }

    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />

        <View style={styles.wrap}>
          <Text>Date</Text>
          <TextInput style={styles.input} onChangeText ={input => setDate(input)}></TextInput>
          <Text>Text</Text>
          <TextInput style={styles.input} onChangeText ={input => setText(input)}></TextInput>
          <Text>time</Text>
          <TextInput style={styles.input}  onChangeText={input=>setTime(input)} ></TextInput>
          <Button title="add schedule" onPress={() => postDate({"date": date, "text": text, "time": time})} />

          <Button title="return" onPress={() => navigation.goBack()} />
        </View>


      </View>
    );
  }
  