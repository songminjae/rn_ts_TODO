import * as React from 'react';
import { Button, View, TextInput, Text, Alert, TouchableOpacity, ListView} from 'react-native';
import { styles } from "./styles";
import { useState, useEffect } from "react";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from "@react-native-firebase/firestore";

export var selectedDate = new Date();

export interface dateCheck{
  today : number;
  transferdate : number; 
}

export function HomeScreen({ navigation }) {
  const [transferdate, setTransferdate] = useState("2020-07-23");
  // const [ todo, setTodo ] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const db = firestore().collection('todos');

  // const [data, setData] = useState(
  //   [
  //     {data: "2020-09-07", text: "핀토스", time: "01"},
  //     {data: "2020-09-07", text: "핀토스", time: "02"},
  //   ],
  // );

  console.log("transferdate touch:",transferdate);
    
    async function addTodo(){
      await db.add({Date: "2020-07-23", Text: "밥", Time: "01"});
      console.log('suc add');
    }
    
    useEffect(() => {
      return db.onSnapshot((querySnapshot) => {
        const list = [];
        // querySnapshot.query.where("Date", "==", transferdate).orderBy("Date");
        querySnapshot.forEach(doc =>{ 
          const {Date, Text, Time} =doc.data();

          list.push({
            id: doc.id,
            Date,
            Text,
            Time,
          });
        });

        setTodos(list);

        if(loading){
          setLoading(false);
        }
        console.log(todos);
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
          
          <Button title="add todo" onPress={()=>addTodo()}></Button>

            <FlatList
              data = {todos}
              keyExtractor = {(item)=>item.id}
              renderItem={({item}) =>{
                return(
                  <TouchableOpacity onPress={()=>{Alert.alert('delete?')}}>
                    <View style={{borderWidth:1, borderRadius: 8, padding:8, margin:8}}>
                      {/* <Text>{item.key}</Text> */}
                      <Text>Date: {item.Date}</Text>
                      <Text>Text: {item.Text}</Text>
                      <Text>Time: {item.Time}</Text>
                    </View>                    
                  </TouchableOpacity>
                );
              }} 

            ></FlatList>

        </SafeAreaView>
      
      </View>

    );
  }