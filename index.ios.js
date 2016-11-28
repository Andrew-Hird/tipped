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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

AppRegistry.registerComponent('tipped', () => tipped)
