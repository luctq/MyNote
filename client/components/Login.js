import { View, TextInput, Button, StyleSheet, Text, Pressable, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loginUser } from '../redux/actions'

function Login({ loginUser, logErr }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = () => {
    loginUser(username, password)
  }

  const handleUsername = (username) => {
    setUsername(username)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <Text style={styles.header}>MyNote</Text>
      <Text style={styles.errText}>{logErr}</Text>
      <TextInput
        style={styles.input}
        placeholder='Username?'
        value={username}
        onChangeText={handleUsername}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password?'
        value={password}
        onChangeText={handlePassword}
        autoCapitalize='none'
        secureTextEntry
      />
      <Pressable onPress={login} style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

Login.propTypes = {
  err: PropTypes.string,
  token: PropTypes.string,
  loginUser: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 20,
    backgroundColor: '#f5f4f1'
  },
  header: {
    color: "#d9ae21",
    fontSize: 45,
    textAlign: "center",
    paddingBottom: 40
  },
  input: {
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 4 
  },
  errText: {
    color: 'red'
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#d9ae21',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

const mapStateToProps = state => ({
  logErr: state.user.logErr,
})

export default connect(mapStateToProps, {loginUser})(Login)