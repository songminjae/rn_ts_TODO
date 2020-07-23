import * as React from 'react';
import { Button, View, TextInput, Text, Alert, TouchableOpacity, ListView} from 'react-native';
import { styles } from "./styles";
import { useState, useEffect } from "react";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todos, TodosID ,TodosList } from "./types";
import firestore from "@react-native-firebase/firestore";

export function HomeScreen({ navigation }) {
  const [transferdate, setTransferdate] = useState<string>("2020-07-26");
  // const [ todo, setTodo ] = useState('');
  const [loading, setLoading] = useState<Boolean>(true);
  const [todos, setTodos] = useState<TodosList>([]);
  const [selectedDate, setSD] = useState<Date>(new Date());

  const db2 = firestore().collection('todos').doc(transferdate).collection('items');

  console.log("transferdate touch:",transferdate);
  console.log('selectedDate:', selectedDate.getFullYear() + "-" + selectedDate.getMonth() + "-" + selectedDate.getDate());

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
            setSD(date);
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
          onPress={() => navigation.navigate('Add Schedule')}
        />
       <SafeAreaView style={styles.wrap}> 
            <FlatList 
              data = {todos}
              keyExtractor = {(item)=>item.id}
              renderItem={({item} : {item: TodosID}) =>{
                return(
                  <TouchableOpacity onPress={()=>{Alert.alert('delete?')}}>
                    <View style={{borderWidth:1, borderRadius: 8, padding:8, margin:8}}>
                      <Text>org: {item.entry.org}</Text>
                      <Text>people: {item.entry.people} </Text>
                      <Text>place: {item.entry.place}</Text>
                      <Text>text: {item.entry.text}</Text>
                      <Text>time: {item.entry.time}</Text>
                    </View>                    
                  </TouchableOpacity>
                );
              }} 
            ></FlatList>
        </SafeAreaView>
      </View>
    );
  }