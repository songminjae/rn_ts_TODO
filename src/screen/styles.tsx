import React from "react";
import { StyleSheet } from "react-native";


export var styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    // textAlign:'center',
    height: 100,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    paddingBottom:16
  },
  sloth: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    textAlign:'center',
    marginRight: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 2,
    paddingBottom: 5,
  },
  button2: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderRadius: 2,
    padding: 15,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popup: {
    height: 10,
    marginHorizontal: 40,
    backgroundColor: '#fff',
  },
  input: {
    width:300,
    margin: 15,
    height: 40,
    borderColor: "blue",
    textDecorationColor: "black",
    borderWidth: 1,
    color: "green",
  },
  root:{flex:1, padding:16,},
  titleText:{
      fontSize:24,
      fontWeight:'bold',
      textAlign:'center',
      paddingBottom:16,
  },
});
// module.exports = styles;