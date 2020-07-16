import React from "react";
import { StyleSheet } from "react-native";


var styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 120,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sloth: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginRight: 15,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 2,
    padding: 15,
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
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
});
module.exports = styles;