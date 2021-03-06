import * as React from 'react';
import { useState } from "react";
import { Button, View, TextInput, Text, Alert } from 'react-native';
import { styles } from "./styles";
import firestore from "@react-native-firebase/firestore";
import { PostData, Navigation } from "../types";

export function ProfileScreen({ navigation, route }) {
  const [date, setDate] = useState<string>(route.params.date);
  const [text, setText] = useState<string>('default text');
  const [time, setTime] = useState<string>('0');

  const [res, setRes] = useState<string>('');

  async function postDate(data: PostData){

    console.log(data);

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
      setRes(data);
      Alert.alert(res); // 왜 안되지?
      navigation.goBack(); // 
      
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
    <TextInput style={styles.input} onChangeText ={input => setDate(input)}>{route.params.date}</TextInput>
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
  