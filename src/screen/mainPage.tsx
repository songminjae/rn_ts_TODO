import * as React from 'react';
import { Button, View, TextInput, Text, Alert, TouchableOpacity} from 'react-native';
import { styles } from "./styles";
import { useState } from "react";

import CalendarStrip from 'react-native-slideable-calendar-strip';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export var selectedDate = new Date();

export interface dateCheck{
  today : number;
  transferdate : number; 
}

export function HomeScreen({ navigation }) {
  const [today, setToday] = useState(0);
  const [transferdate, setTransferdate] = useState(0);
  const [data, setData] = useState(
    [
      {key:"0","data": "2020-09-07", "text": "핀토스", "time": "01"},
      {key:"1","data": "2020-09-07", "text": "핀토스", "time": "01"},
    ],
  );

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
        <CalendarStrip 
          isChinese
          showWeekNumber
          showChineseLunar
          selectedDate={selectedDate}
          onPressDate={(date: any) => {
            selectedDate = date;
            setToday(date);
          }}
          onPressGoToday={(today: any) => {
            selectedDate = today;
            setTransferdate(today);
          }}
          onSwipeDown={() => {
            Alert('onSwipeDown');
          }}
          markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01']}
          weekStartsOn={1} // 0,1,2,3,4,5,6 for S M T W T F S, defaults to 0
        />        
        
        <Button
          title="Add"
          onPress={() => navigation.navigate('Add Schedule')}
        />

       <SafeAreaView style={styles.wrap}> 
        
          
          <FlatList
            data={data}
            keyExtractor={(item)=> item.name}
            renderItem={({item})=>{
              return (
                <TouchableOpacity style={styles.sloth} onPress={()=>{alert(item.data)}}>
                  <View style={{borderWidth:1, borderRadius: 8, padding:8, margin:8}}>
                    <Text>{item.key}</Text>
                    <Text>{item.data}</Text>
                    <Text>{item.text}</Text>
                    <Text>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}></FlatList>

        </SafeAreaView>
      
      </View>

    );
  }