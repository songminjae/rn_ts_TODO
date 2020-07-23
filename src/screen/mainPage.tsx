import * as React from 'react';
import { Button, View, TextInput, Text, Alert, TouchableOpacity, ListView} from 'react-native';
import { styles } from "./styles";
import { useState, useEffect } from "react";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Todos, TodosID ,TodosList } from "./types";

import firestore from "@react-native-firebase/firestore";


export var selectedDate = new Date();

export interface dateCheck{
  today : number;
  transferdate : number; 
}

export function HomeScreen({ navigation }) {
  const [transferdate, setTransferdate] = useState("2020-07-26");
  // const [ todo, setTodo ] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  // const db = firestore().collection('todos');

  const db2 = firestore().collection('todos').doc(transferdate).collection('items');

  console.log("transferdate touch:",transferdate);
    
    async function addTodo(){
      // await db.add({Date: "2020-07-23", Text: "밥", Time: "01"});
      console.log('suc add');
    }

    useEffect(() => {
      return db2.onSnapshot((querySnapshot) => {
        const list: TodosList = [];
        let entry: Todos = {} as Todos;
        let id: string = "";
        

        querySnapshot.forEach((doc: any) => { 
          entry = doc.data() as Todos;
          id = doc.id;
          list.push( {entry, id} );
        });
        
        console.log('omg',list);
        
        setTodos(list);

        if(loading){
          setLoading(false);
        }
        console.log('hoho:',todos);
      });
    }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
        <CalendarStrip 
          isChinese
          showWeekNumber
          showChineseLunar
          selectedDate={selectedDate}
          onPressDate={(date: any) => {
            selectedDate = date;
            // setToday(date);
            setTransferdate(date);
          }}
          onPressGoToday={(today: any) => {
            selectedDate = today;
            setTransferdate(today);
          }}
          onSwipeDown={() => {
            Alert.alert('onSwipeDown');
          }}
          markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
          weekStartsOn={0} // 0,1,2,3,4,5,6 for S M T W T F S, defaults to 0
        />        
        
        <Button
          title="Add"
          onPress={() => navigation.navigate('Add Schedule')}
        />

       <SafeAreaView style={styles.wrap}> 
          
          {/* <Button title="add todo" onPress={()=>addTodo()}></Button> */}

            <FlatList
              data = {todos}
              keyExtractor = {(item)=>item.id}
              renderItem={({item} : {item: TodosID}) =>{
                console.log('ssss',item);
                return(
                  <TouchableOpacity onPress={()=>{Alert.alert('delete?')}}>
                    <View style={{borderWidth:1, borderRadius: 8, padding:8, margin:8}}>
                      <Text>org: {item.entry.org}</Text>
                      <Text>people: {item.entry.people} </Text>
                      <Text>place: {item.entry.place}</Text>
                      <Text>text: {item.entry.text}</Text>
                      <Text>time: {item.entry.place}</Text>
                    </View>                    
                  </TouchableOpacity>
                );
              }} 

            ></FlatList>

        </SafeAreaView>
      
      </View>

    );
  }