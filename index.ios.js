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

let NZD = 0

let entered = {
  price: null,
  percentage: '18',
  tax: '4'
}

export default class tipped extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: null,
      percentage: '18',
      tax: '4',
      conversionRate: 1.39,
      toTipUSD: '0',
      totalNZD: '0',
      totalUSD: '0',
      totalMinusTipNZD: '0',
      totalMinusTipUSD: '0'

    }
  }

  componentDidMount () {
    this.getRate()
  }

  getRate () {
    return fetch('https://api.fixer.io/latest?base=USD&symbols=USD,NZD')
      .then((response) => response.json())
      .then((responseJson) => {
        NZD = responseJson.rates.NZD
        this.setState({conversionRate: NZD})
      })
      .catch((error) => {
        console.error(error);
      })
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

  calc () {
    this.setState({
        toTipUSD: (entered.price*(entered.percentage/100)).toFixed(2),
        totalNZD: (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)*NZD).toFixed(2),
        totalUSD: (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)).toFixed(2),
        totalMinusTipNZD: (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)-(entered.price*(entered.percentage/100))*NZD).toFixed(2),
        totalMinusTipUSD: (entered.price*(entered.percentage/100+1)*(entered.tax/100+1)-(entered.price*(entered.percentage/100))).toFixed(2)
    })
  }


  render() {
    return (
      <KeyboardAwareScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
        <View style={styles.container}>
        <Text style={styles.title}>💸🇺🇸💸</Text>

        <View>
          <Text style={styles.total}>Tip 🇺🇸 ${this.state.toTipUSD}</Text>
          <Text style={styles.total}>Total−Tip 🇺🇸 ${this.state.totalMinusTipUSD}</Text>
          <Text style={styles.total}>Total−Tip 🇳🇿 ${this.state.totalMinusTipNZD}</Text>
          <Text style={styles.total}>Total 🇺🇸 ${this.state.totalUSD}</Text>
          <Text style={styles.total}>Total 🇳🇿 ${this.state.totalNZD}</Text>
        </View>

          <Text style={styles.heading}>Price:</Text>
          <View style={styles.item}>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(price) => this.enterPrice(price)}
              value={this.state.price}
            />
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
          </View>

          <Text style={styles.heading}>Conversion rate:</Text>
          <View style={styles.item}>
            <Text>{this.state.conversionRate}%</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  heading: {
    padding: 10,
    fontSize: 15
  },
  input: {
    textAlign: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
  item: {
    // width: 300,
    // alignItems: 'center',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
    // flexDirection:'row'
  },
  total: {
    fontSize: 30,
    margin: 5,
    textAlign: 'right'
  },

  title: {
    fontSize: 40,
    marginBottom: 10
  }
})

AppRegistry.registerComponent('tipped', () => tipped)
