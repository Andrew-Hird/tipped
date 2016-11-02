import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

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
      // conversionRate: null,
      toTipUSD: '0',
      toTipNZD: '0',
      totalNZD: '0',
      totalUSD: '0',
      totalMinusTipNZD: '0',
      totalMinusTipUSD: '0'

    }
  }

  componentDidMount() {
    this.getRate()
  }

  getRate() {
    return fetch('https://api.fixer.io/latest?base=USD&symbols=USD,NZD').then((response) => response.json()).then((responseJson) => {
      NZD = responseJson.rates.NZD
      this.setState({conversionRate: NZD})
    }).catch((error) => {
      console.error(error);
    })
  }

  enterPrice(price) {
    entered.price = price
    this.calc()
  }

  enterPercentage(percentage) {
    entered.percentage = percentage
    this.calc()
  }

  enterTax(tax) {
    entered.tax = tax
    this.calc()
  }

  calc() {
    this.setState({
      toTipUSD: (entered.price * (entered.percentage / 100)).toFixed(2),
      toTipNZD: ((entered.price * (entered.percentage / 100)) * NZD).toFixed(2),
      totalNZD: ((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1) * NZD)).toFixed(2),
      totalUSD: (entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)).toFixed(2),
      totalMinusTipNZD: (((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)) - (entered.price * (entered.percentage / 100)) ) * NZD).toFixed(2),
      totalMinusTipUSD: ((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)) - (entered.price * (entered.percentage / 100))).toFixed(2)
    })
  }

  render() {
    return (
      <KeyboardAwareScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
        <View style={styles.container}>
          <Text style={styles.title}>💸🇺🇸🇳🇿💸</Text>

          <View style={styles.allTotals}>
            <Text style={styles.totalHead}>Tip:</Text>
            <Text style={styles.total}>🇺🇸 ${this.state.toTipUSD} | 🇳🇿 ${this.state.toTipNZD}</Text>
            <Text style={styles.totalHead}>Total−Tip:</Text>
            <Text style={styles.total}>🇺🇸 ${this.state.totalMinusTipUSD} | 🇳🇿 ${this.state.totalMinusTipNZD}</Text>
            <Text style={styles.totalHead}>Total:</Text>
            <Text style={styles.total}>🇺🇸 ${this.state.totalUSD} | 🇳🇿 ${this.state.totalNZD}</Text>
          </View>

          <View style={styles.num}>
            <View style={styles.item}>
              <Text style={styles.heading}>Price:</Text>
              <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(price) => this.enterPrice(price)}
              value={this.state.price}/>
            </View>

            <View style={styles.item}>
              <Text style={styles.heading}>Tip percentage:</Text>
              <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(percentage) => {
                this.setState({percentage})
                this.enterPercentage(percentage)
              }}
              value={this.state.percentage}/>
            </View>

            <View style={styles.item}>
              <Text style={styles.heading}>State tax:</Text>
              <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(tax) => {
                this.setState({tax})
                this.enterTax(tax)
              }}
              value={this.state.tax}/>
            </View>

            <View style={styles.item}>
              <Text style={styles.heading}>Conversion rate:</Text>
              <Text style={styles.rate}>{this.state.conversionRate}%</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
    marginTop: 20,
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
  }
})

AppRegistry.registerComponent('tipped', () => tipped)
