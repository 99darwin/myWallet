/* @flow */

import React from 'react'
import { Platform, Image } from 'react-native'
import { BottomNavigation, Tab } from 'react-router-navigation'
import type { RouterHistory } from 'react-router'
import Wallet from './Wallet'
import Profile from './Profile'
import { NEUTRAL_COLOR_50, BRAND_COLOR_60 } from './theme'

type Props = {
  history: RouterHistory,
}

class App extends React.Component<void, Props, void> {
  props: Props
  wallet: Wallet

  shouldComponentUpdate(): boolean {
    return false
  }

  render(): React$Element<any> {
    const { history } = this.props
    return (
      <BottomNavigation
        tabTintColor={NEUTRAL_COLOR_50}
        tabActiveTintColor={BRAND_COLOR_60}
      >
        <Tab
          path="/wallet" 
          render={ownProps =>
            <Wallet
              {...ownProps}
              ref={c => {
                this.wallet = c
              }}
            />}
          onReset={() => {
            if (this.wallet && this.wallet.listView) {
              this.wallet.listView.scrollTo({ y: 0 })
            }
          }}
          label="Wallets"
          renderTabIcon={({ focused, tabTintColor, tabActiveTintColor }) =>
            <Image
              source={require('./assets/.png')}
              style={[
                {
                  marginBottom: Platform.OS === 'android' ? 2.5 : 1,
                  width: Platform.OS === 'android' ? 22.5 : 25,
                  height: Platform.OS === 'android' ? 22.5 : 25,
                  tintColor: focused ? tabActiveTintColor : tabTintColor,
                },
              ]}
            />}
        />
        <Tab
          path="/profile/(likes|bookmarks)"
          component={Profile}
          onRequestChangeTab={() => history.replace('/profile/likes')}
          onReset={() => history.replace('/profile/likes')}
          label="Setup"
          renderTabIcon={({ focused, tabTintColor, tabActiveTintColor }) =>
            <Image
              source={require('./assets/profile.png')}
              style={{
                marginBottom: Platform.OS === 'android' ? 0 : -2,
                width: Platform.OS === 'android' ? 27.5 : 31,
                height: Platform.OS === 'android' ? 27.5 : 31,
                tintColor: focused ? tabActiveTintColor : tabTintColor,
              }}
            />}
        />
      </BottomNavigation>
    )
  }
}

export default App
