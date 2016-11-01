import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// const dismissKeyboard = require('dismissKeyboard')


let NZD = 0

let entered = {
  price: '0',
  percentage: '18',
  tax: '4',
  conversionRate: String(NZD)
}

export default class tipped extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: '0',
      percentage: '18',
      tax: '4',
      conversionRate: String(NZD),
      toTipUSD: '0',
      totalNZD: '0',
      totalUSD: '0'
    }
  }

  getRateFromApiAsync () {
    return fetch('https://api.fixer.io/latest?base=USD&symbols=USD,NZD')
      .then((response) => response.json())
      .then((responseJson) => {
        NZD = responseJson.rates.NZD
        console.log(NZD)
        this.state = { conversionRate: NZD }
        return responseJson.rates.NZD
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // getRateFromApiAsync()

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
    let toTip = (entered.price * (entered.percentage/100)).toFixed(2)
    let totalPriceNZD = (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)*(entered.conversionRate)).toFixed(2)
    let totalPriceUSD = (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)).toFixed(2)
    this.state = {
      price: entered.price,
      percentage: entered.percentage,
      tax: entered.tax,
      conversionRate: entered.conversionRate,
      toTipUSD: toTip,
      totalNZD: totalPriceNZD,
      totalUSD: totalPriceUSD
    }
  }


  render() {
    return (
      // <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
      <KeyboardAwareScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
        <View style={styles.container}>
        <Text style={styles.title}>TIPPING IN AMERICA</Text>

          <Text style={styles.total}>Tip USD: ${this.state.toTipUSD}</Text>
          <Text style={styles.total}>Total USD: ${this.state.totalUSD}</Text>
          <Text style={styles.total}>Total NZD: ${this.state.totalNZD}</Text>

          <Text style={styles.heading}>Price:</Text>
          <View style={styles.item}>
            <Text style={styles.heading}>$</Text>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(price) => {
                this.setState({price})
                this.enterPrice(price)
              }}
              value={this.state.price}
            />
            <Text style={styles.heading}>{'          '}</Text>
          </View>

          <Text style={styles.heading}>Tip percentage:</Text>
          <View style={styles.item}>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(percentage) => {
                this.setState({percentage})
                this.enterPercentage(percentage)
              }}
              value={this.state.percentage}
            />
            <Text style={styles.heading}>%</Text>
          </View>

          <Text style={styles.heading}>State tax:</Text>
          <View style={styles.item}>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(tax) => {
                this.setState({tax})
                this.enterTax(tax)
              }}
              value={this.state.tax}
            />
            <Text style={styles.heading}>%</Text>
          </View>

          <Text style={styles.heading}>Conversion rate:</Text>
          <View style={styles.item}>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(conversionRate) => {
                this.setState({conversionRate})
                this.enterRate(conversionRate)
              }}
              value={this.state.conversionRate}
            />
            <Text style={styles.heading}>%</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      // </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'steelblue',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  heading: {
    padding: 10,
    fontSize: 15
  },
  input: {
    textAlign: 'center',
    height: 40,
    width: 40,
    fontSize: 15,
    borderColor: 'gray',
    borderWidth: 1
  },
  total: {
    fontSize: 30,
    margin: 5
  },
  item: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  title: {
    fontSize: 40,
    marginBottom: 10
  }
});

AppRegistry.registerComponent('tipped', () => tipped)
