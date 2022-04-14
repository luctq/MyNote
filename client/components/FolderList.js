import React, { useLayoutEffect } from 'react'
import { Button, View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

import FolderRow from './FolderRow'
import { addFolder, deleteFolder, deleteNote } from '../redux/actions'

function FolderList({ navigation, folders, addFolder, deleteFolder, deleteNote }) {
  const [name, setName] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)

  const handleChangeText = name => {
    setName(name)
  }

  const handleSubmit = () => {
    let folderId = folders.length
    if (folders.length !== 0) {
      folderId = folders[folders.length - 1].folderId + 1
    }
    addFolder({folderId: folderId, folderName: name})
    setModalVisible(!modalVisible)
    setName('')
  }

  const handleCancel = () => {
    setModalVisible(!modalVisible)
    setName('')
  }

  const handleFolderSelect = (item) => {
    navigation.navigate('NoteList', {
      item: item,
    })
  }

  const renderItem = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-80}
      leftOpenValue={0}
      disableRightSwipe={true}
      disableLeftSwipe={data.item.folderId === 0}
    >
      <Pressable
        style={styles.button} 
        onPress={() => {
          deleteNote(null, data.item.folderId)
          deleteFolder(data.item.folderId)
      }}>
        <Text style={styles.text}>Xóa</Text>
      </Pressable>
      <FolderRow item={data.item} onFolderSelect={handleFolderSelect} />
    </SwipeRow>
  )

  const keyExtractor = (item) => item.folderId

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Thư mục</Text>
        <SwipeListView 
          data={folders}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <View style={modalVisible ? styles.modalContainer : {}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', marginBottom: 2}}>Thư mục mới</Text>
                <Text>Nhập tên cho thư mục này.</Text>
              </View>
              <TextInput 
                style={styles.input}
                placeholder='Tên'
                value={name}
                onChangeText={handleChangeText}
                autoFocus={true}
              />
              <View style={styles.inputContainer}>
                <Button title='Hủy' color="#d9ae21" onPress={handleCancel} />
                <Button title='Lưu' color="#d9ae21" onPress={handleSubmit} disabled={name===''} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.btnAdd}>
        <Button title='Thư mục mới' color="#d9ae21" onPress={() => setModalVisible(true)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    backgroundColor: '#f5f4f1'
  },
  header: {
    fontSize: 30, 
    fontWeight: 'bold', 
    paddingHorizontal: 15,
    paddingBottom: 20
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: '#ddd',
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 2
  },
  modalView: {
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centeredView: {
    flex: 1,
    marginTop: 120
  }, 
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  btnAdd: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'red',
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
  folders: state.folders
})

export default connect(mapStateToProps, {addFolder, deleteFolder, deleteNote})(FolderList)
