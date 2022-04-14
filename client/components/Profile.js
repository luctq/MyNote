import React from 'react'
import { Button, View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

import { logoutUser } from '../redux/actions'

function Profile({ logoutUser }) {

  const handelLogout = () => {
    logoutUser()
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image 
          style={styles.img}
          source={{
            uri: "https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png",
          }}
        />
        <Text>@youniginzu1</Text>
      </View>
      <View style={styles.des}>
        <Text style={styles.desTitle}>Description Project</Text>
        <Text>The project is a note taking app based on iphone notes. It has the features of a basic note.</Text>
        <Text style={{marginTop: 10, fontSize: 20}}>Author: Vũ Ngọc Quyền</Text>
        <Text style={{fontSize: 20}}>Github: youniginzu1</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f4f1",
  },
  imgContainer: {
    alignItems: "center",
    marginTop: 10
  },
  img: {
    width: 100,
    height: 100,
  },
  des: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
    marginTop: 10
  },
  desTitle: {
    fontSize: 20,
    color: "#aaa",
    marginBottom: 10
  },
})

export default connect(null, {logoutUser})(Profile)