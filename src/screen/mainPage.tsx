import * as React from 'react';
import { Button, View, TextInput, Text, Alert, TouchableOpacity, ListView} from 'react-native';
import { styles } from "./styles";
import { useState, useEffect } from "react";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todos, TodosID ,TodosList } from "../types";
import firestore from "@react-native-firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';

function completeTrans(raw: number){
  let rawString: string;
  if(raw < 10){
    rawString = "0"+ String(raw);
  }else{
    rawString = String(raw);
  }
  return rawString;
}

const db2 = firestore().collection('todos');

export function HomeScreen({ navigation: Navigation }) {
  // const [transferdate, setTransferdate] = useState<string>("2020-07-26");
  // const [ todo, setTodo ] = useState('');
  const [id, setID]= useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const [todos, setTodos] = useState<TodosList>([]);
  const [selectedDate, setSD] = useState<Date>(new Date());
  let pickeddate: string = selectedDate.getFullYear() + "-" + completeTrans(selectedDate.getMonth()) + "-" + completeTrans(selectedDate.getDate());
  console.log("date: ", pickeddate);
    useEffect(() => {
      // console.log('in useEffect before return');

      return db2.doc(pickeddate).collection('items').onSnapshot((querySnapshot) => {
        // console.log('in useEffect after return');
        const list: TodosList = [];
        let entry: Todos = {} as Todos;
        let id: string = "";

        querySnapshot.forEach((doc: any) => { 
          entry = doc.data() as Todos;
          id = doc.id;
          list.push( {entry, id} );
        });
        
        // console.log('hoho1:',todos);
        // console.log('omg',list);
        setTodos(list);
        // console.log('hoho2:',todos);
        if(loading){
          setLoading(false);
        }
      });
    }, [selectedDate]);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
        <CalendarStrip 
          isChinese
          showWeekNumber
          showChineseLunar
          selectedDate={selectedDate}
          onPressDate={(date: any) => {
            setSD(date);
            console.log('press date button');
          }}
          onPressGoToday={(today: any) => {
            setSD(today);
          }}
          onSwipeDown={() => {
            Alert.alert('onSwipeDown');
          }}
          markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
          weekStartsOn={0} // 0,1,2,3,4,5,6 for S M T W T F S, defaults to 0
        />        
        <Button
          title="Add"
          onPress={() => navigation.navigate('Add Schedule', {date: pickeddate})}
        />
       <SafeAreaView style={styles.wrap}> 
            <FlatList 
              data = {todos}
              keyExtractor = {(item)=>item.id}
              renderItem={({item} : {item: TodosID}) =>{
                return(
                  <TouchableOpacity>
                    <View style={{borderWidth:1, borderRadius: 8, padding:8, margin:8}}>
                      <Text>org: {item.entry.org}</Text>
                      <Text>people: {item.entry.people} </Text>
                      <Text>place: {item.entry.place}</Text>
                      <Text>text: {item.entry.text}</Text>
                      <Text>time: {item.entry.time}</Text>
                      <Button title = {"update"} onPress={()=> updateItem(item, navigation, pickeddate )}></Button>
                      <Button title = {"delete"} onPress={()=>deleteItem(item.id, pickeddate)} ></Button>     
                    </View> 
              
                  </TouchableOpacity>
                );
              }} 
            ></FlatList>
        </SafeAreaView>
      </View>
    );
  }

  function deleteItem(id: string, date: string){
    const db = db2.doc(date).collection('items').doc(id);

    db.delete().then((res)=> {
      console.log('delete');
    })
  }

  function updateItem(item : TodosID, navigation, pickeddate: string ){
    // const db = db2.doc(date).collection('items');

    console.log(item.entry.text);
    console.log(pickeddate);
    console.log(item.entry.time);
    console.log(item.id);
    console.log("넘어갈때");

    navigation.navigate('UpdateScene', {text: item.entry.text, date: pickeddate, time:item.entry.time , id: item.id});

  }
