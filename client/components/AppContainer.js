import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Login from './Login'
import NoteApp from './NoteApp'

function AppContainer({isLogin}) {

  return (
    <View style={styles.container}>
      {isLogin ? <NoteApp /> : <Login />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
})


export default connect(mapStateToProps, null)(AppContainer)