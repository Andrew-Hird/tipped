import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import styles from './Styles.js'

import { Cash } from './components/Cash.js'
import { CreditCard } from './components/Credit-Card.js'

let NZD = 0

let conversionFee = '2.10'

let entered = {
  price: null,
  percentage: '18',
  tax: '4',
  rate: '1.3'
}

export default class tipped extends Component {

  renderScene(route, navigator) {
  	if(route.name == 'tipped') {
    	return <Main navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Cash') {
    	return <Cash navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'CreditCard') {
    	return <CreditCard navigator={navigator} {...route.passProps}  />
    }
  }

  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        initialRoute={{ name: 'tipped' }}
        renderScene={ this.renderScene } />
    )
  }
}

export class Main extends Component {

  _navigateCash() {
  	this.props.navigator.push({ name: 'Cash' })
  }
  _navigateCreditCard() {
  	this.props.navigator.push({ name: 'CreditCard' })
  }
	render() {
    return (
      	<View style={ styles.container }>
   				<TouchableHighlight style={ styles.button } onPress={ () => this._navigateCash() }>
        		<Text style={ styles.buttonText }>Pay with Cash</Text>
        	</TouchableHighlight>
   				<TouchableHighlight style={ styles.button } onPress={ () => this._navigateCreditCard() }>
        		<Text style={ styles.buttonText }>Pay with Credit Card</Text>
        	</TouchableHighlight>
        </View>
    )
  }
}

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: 'steelblue',
//     height: 300
//   },
//   horizontalScrollView: {
//     height: 120
//   },
//   container: {
//     flex: 1,
//     marginTop: 20,
//     // height: 1136,
//     alignItems: 'center',
//     backgroundColor: 'steelblue'
//   },
//   allTotals: {
//
//   },
//   heading: {
//     padding: 10,
//     fontSize: 15
//   },
//   num: {
//     height: 125,
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap'
//   },
//   input: {
//     marginLeft: 45,
//     textAlign: 'center',
//     height: 80,
//     width: 80,
//     fontSize: 25,
//     borderColor: 'black',
//     borderWidth: 1
//   },
//   item: {
//     width: 150,
//     alignItems: 'center',
//   },
//   rate: {
//     fontSize: 25
//   },
//   totalHead: {
//     marginBottom: 5,
//     fontSize: 30,
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
//   total: {
//     fontSize: 26,
//     marginBottom: 15,
//     textAlign: 'right'
//   },
//   title: {
//     fontSize: 40,
//     marginBottom: 10
//   },
//   button: {
//     flex: 1,
//   	height:60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//   	fontSize:20
//   }
// })

AppRegistry.registerComponent('tipped', () => tipped)
