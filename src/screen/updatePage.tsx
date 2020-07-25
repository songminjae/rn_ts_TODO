import * as React from 'react';
import { useState } from "react";
import { Button, View, TextInput, Text, Alert } from 'react-native';
import { styles } from "./styles";
import firestore from "@react-native-firebase/firestore";
import { PostData, PostDateID } from "../types";

export function UpdateScreen({ navigation , route}) {
  const [date, setDate] = useState<string>(route.params.date);
  const [text, setText] = useState<string>('default text');
  const [time, setTime] = useState<string>('0');

  const [res, setRes] = useState<string>('');

  const [predate, setPreDate] = useState(route.params.date);
  const [pretext, setPreText] = useState(route.params.text);
  const [pretime, setPreTime] = useState(route.params.time);
  const [id, setID] = useState(route.params.id);

//   console.log("route:",route);
//   console.log("params:",route.params);

  async function postDate(predata: PostData){

    const data = {text: predata.text, date: predata.date, time: predata.time, id: id};

    console.log(predata.text);
    console.log(predata.date);
    console.log(predata.time);
    console.log(id);
    console.log('업대이트할꺼');
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
      console.log('Success update:', data);
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
        <TextInput style={styles.input} onChangeText ={input => setDate(input)}>{predate}</TextInput>
          <Text>Text</Text>
        <TextInput style={styles.input} onChangeText ={input => setText(input)}>{pretext}</TextInput>
          <Text>time</Text>
        <TextInput style={styles.input}  onChangeText={input=>setTime(input)} >{pretime}</TextInput>
          <Button title="update schedule" onPress={() => postDate({"date": date, "text": text, "time": time})} />

          <Button title="return" onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }
  