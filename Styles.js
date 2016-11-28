'use strict';

import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  scrollView: {
    backgroundColor: 'steelblue',
    height: 300
  },
  horizontalScrollView: {
    height: 120
  },
  container: {
    flex: 1,
    marginTop: 20,
    // height: 1136,
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  allTotals: {

  },
  heading: {
    padding: 10,
    fontSize: 15
  },
  num: {
    height: 125,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  input: {
    marginLeft: 45,
    textAlign: 'center',
    height: 80,
    width: 80,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 1
  },
  item: {
    width: 150,
    alignItems: 'center',
  },
  rate: {
    fontSize: 25
  },
  totalHead: {
    marginBottom: 5,
    fontSize: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  total: {
    fontSize: 26,
    marginBottom: 15,
    textAlign: 'right'
  },
  title: {
    fontSize: 40,
    marginBottom: 10
  },
  button: {
    flex: 1,
   height:60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
   fontSize:20
 },
 checkboxStyle: {
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5
    },
  containerStyle: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center'
  },
})
