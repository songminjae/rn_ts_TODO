import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Button, Alert, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import styles from "./styles";
import CalendarStrip from 'react-native-slideable-calendar-strip';

export default class AppView extends Component {
  state = {
    isModalVisible: false,
    selectedDate: new Date(),
  };



  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  
  toggleModalandSend = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <SafeAreaView style={styles.wrap}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TODO!!!<Text/>

          <TouchableOpacity hitSlop={{top:1, left:1}} style={styles.button} onPress = {this.toggleModal}>
            <Text style={styles.wrap}>+</Text>
          </TouchableOpacity>
          <Modal isVisible = {this.state.isModalVisible} style={styles.popup}>
            <View style = {styles.wrap}>
              <Text style={styles.headerText}>add schedule and press return</Text>

              <TextInput style = {styles.input} placeholder="text?" />

              <TextInput style = {styles.input} placeholder="time?" />

              <TouchableOpacity hitSlop={{top:1, left:1}} style={styles.button} onPress = {this.toggleModalandSend}>
                <Text>Return</Text>
              </TouchableOpacity>
            
              <TouchableOpacity hitSlop={{top:1, left:1}} style={styles.button2} onPress = {this.toggleModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>

            </View>
          </Modal>
          {/* <button style = {styles.button} onClick={this.handleClick}>click me</button> */}
          </Text>
        </View>
        
        <View style={styles.header}>
          
          <CalendarStrip
              selectedDate={this.state.selectedDate}
              onPressDate={(date) => {
                this.setState({ selectedDate: date });
              }}
              onPressGoToday={(today) => {
                this.setState({ selectedDate: today });
              }}
              onSwipeDown={() => {
                alert('shit!!');
              }}
              markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
              weekStartsOn={1}
          />
        </View>

        <ScrollView>
        {[...Array(30).keys()].map(()=> (
          <Text style={styles.sloth} > each schedule</Text>
        ))}
        </ScrollView>

      </SafeAreaView>
    );
  }
}