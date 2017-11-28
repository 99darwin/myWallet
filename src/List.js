/* @flow */

import React from 'react'
import { StyleSheet, PixelRatio, ListView, View, Text } from 'react-native'
import { Link } from 'react-router-native'
import type { Match } from 'react-router'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#cdcdcd',
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})

type Props = {
  match: Match,
}

type State = {
  dataSource: Object,
}

class List extends React.Component<void, Props, State> {
  props: Props
  state: State

  listView: ListView

  constructor(props: Props): void {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: () => false,
    })
    // var wallets = ["Bitcoin", "Etherim", "Maldives Trip", "Iota", "Bitcoin Cash", "Ark"]
    this.state = {
      dataSource: ds.cloneWithRows(
        ["Bitcoin", "Etherim", "Maldives Trip", "Iota", "Bitcoin Cash", "Ripple", "Monero", "NEO", "Zcash", "Ark"].map((a) => ` ${a}`),
      ),
    }
  }

  scrollTo = (options: Object): void => {
    if (this.listView) this.listView.scrollTo(options)
  }

  render(): React$Element<any> {
    const { match: { url } } = this.props
    return (
      <ListView
        ref={c => {
          this.listView = c
        }}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={rowData =>
          <Link to={`${url}/send/${rowData.slice(5)}`}>
            <Text style={styles.row}>
              {rowData}
            </Text>
          </Link>}
        renderSeparator={(sectionIndex, rowIndex) =>
          <View key={`${sectionIndex}-${rowIndex}`} style={styles.separator} />}
      />
    )
  }
}

export default List
