/* eslint react/no-unused-prop-types: 0 */

import React from 'react'
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import type { Match, Location } from 'react-router'
import { Link } from 'react-router-native'
import { BRAND_COLOR_50, BRAND_COLOR_60 } from './theme'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  link: {
    marginTop: 16,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: BRAND_COLOR_50,
    borderRadius: 3,
  },
  span: {
    color: BRAND_COLOR_60,
  },
  strong: {
    marginTop: 5,
    fontWeight: '700',
  },
})

type Props = {
  match: Match,
  location: Location,
}

type State = {
  time: 0,
}

class Send extends React.Component<void, Props, void> {
  props: Props
  state: State = { time: 0 }

  componentDidMount(): void {
    this.timer = setInterval(() => {
      if (
        this.props.match &&
        this.props.match.url === this.props.location.pathname
      ) {
        this.setState(prevState => ({
          time: prevState.time + 250,
        }))
      }
    }, 250)
  }

  componentWillUnmount(): void {
    clearInterval(this.timer)
  }

  shouldComponentUpdate(nextProps, nextState): boolean {
    return this.state.time !== nextState.time
  }

  render(): React$Element<any> {
    const { match } = this.props
    this.state = { textFrom: 'From', textTo: 'To' };
    const styles = StyleSheet.create({
      container: {
         paddingTop: 23
      },
      input: {
         margin: 15,
         height: 40,
         borderColor: '#7a42f4',
         borderWidth: 1
      }});

    return (
      <View style={styles.scene}>
            <TextInput
            style = {styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.textFrom}
          />
          <TextInput
            style = {styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.textTo}
          />
          <Image source = {require('./assets/076_send_paperplane-64.png')} />

      </View>
    )
  }
}

export default Send
