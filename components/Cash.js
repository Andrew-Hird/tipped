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

import styles from '../Styles.js'

let NZD = 0

let conversionFee = '2.10'

let entered = {
  price: null,
  percentage: '18',
  tax: '4',
  rate: '1.3'
}

export class Cash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: null,
      percentage: '18',
      tax: '4',
      rate: '1.3',
      toTipUSD: '0',
      toTipNZD: '0',
      totalNZD: '0',
      totalUSD: '0',
      totalMinusTipNZD: '0',
      totalMinusTipUSD: '0'
    }
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

  enterRate(rate) {
    entered.rate = rate
    this.calc()
  }

  calc() {
    this.setState({
      toTipUSD: (entered.price * (entered.percentage / 100)).toFixed(2),
      toTipNZD: ((entered.price * (entered.percentage / 100)) * entered.rate).toFixed(2),
      totalNZD: ((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1) * entered.rate)).toFixed(2),
      totalUSD: (entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)).toFixed(2),
      totalMinusTipNZD: (((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)) - (entered.price * (entered.percentage / 100)) ) * entered.rate).toFixed(2),
      totalMinusTipUSD: ((entered.price * (entered.percentage / 100 + 1) * (entered.tax / 100 + 1)) - (entered.price * (entered.percentage / 100))).toFixed(2)
    })
  }

  _navigate() {
  	this.props.navigator.push({ name: 'tipped' })
  }

  render() {
    return (
      <KeyboardAwareScrollView style={[styles.scrollView, styles.horizontalScrollView]}>
        <View style={styles.container}>
        <TouchableHighlight style={ styles.button } onPress={ () => this._navigate() }>
      		<Text style={ styles.title }>back 💸🇺🇸🇳🇿</Text>
      	</TouchableHighlight>

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
              <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={(rate) => {
                this.setState({rate})
                this.enterRate(rate)
              }}
              value={this.state.rate}/>
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
