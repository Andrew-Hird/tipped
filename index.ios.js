/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

let entered = {
  price: '20',
  percentage: '18',
  tax: '4',
  rate: '1.39'
}

export default class tipped extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: '20',
      percentage: '18',
      tax: '4',
      conversionRate: '1.39',
      total: '34.30'
    }
  }

  enterPrice (price) {
    entered.price = price
    this.calc()
  }

  enterPercentage (percentage) {
    entered.percentage = percentage
    this.calc()
  }

  enterTax (tax) {
    entered.tax = tax
    this.calc()
  }

  enterRate (conversionRate) {
    entered.conversionRate = conversionRate
    console.log(entered)
    this.calc()
  }

  calc () {
    let totalPrice = 0
    totalPrice = entered.price * (entered.percentage/ 100+1)
    this.state = {
      price: entered.price,
      percentage: entered.percentage,
      tax: entered.tax,
      conversionRate: entered.conversionRate,
      total: totalPrice }
    console.log(totalPrice)
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tipped
        </Text>
        <Text>Enter price:</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(price) => {
            this.setState({price})
            this.enterPrice(price)
          }}
          value={this.state.price}
        />
        <Text>Enter tip percentage:</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(percentage) => {
            this.setState({percentage})
            this.enterPercentage(percentage)
          }}
          value={this.state.percentage}
        />
        <Text>Enter state tax:</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(tax) => {
            this.setState({tax})
            this.enterTax(tax)
          }}
          value={this.state.tax}
        />
        <Text>Enter conversion rate:</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          onChangeText={(conversionRate) => {
            this.setState({conversionRate})
            this.enterRate(conversionRate)
          }}
          value={this.state.conversionRate}
        />
        <Text style={styles.total}>Total Price: ${this.state.total}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    textAlign: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  total: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('tipped', () => tipped)
