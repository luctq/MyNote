import React from 'react'
import { Button, View, Text, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import Icons from 'react-native-vector-icons/SimpleLineIcons'

import NoteRow from './NoteRow'
import { addNote, deleteNote } from '../redux/actions'

function NoteList({route, navigation, notes, addNote, deleteNote}) {
  const item = route.params.item
  const noteList = notes.filter(note => note.folderId === item.folderId)

  const handleAddNote = () => {
    let noteId = noteList.length;
    if (noteList.length !== 0) {
      noteId = noteList[noteList.length - 1].noteId + 1
    }
    const newItem = {folderId: item.folderId, noteId: noteId, noteContent: ''}
    navigation.navigate('NoteDetails', {
      item: newItem,
      isNew: true
    })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.addBtn} 
          onPress={handleAddNote}
          >
          <Icons
            name='note'
            size={25}
            color='#d9ae21'
          />
        </Pressable>
      )
    })
  }, [notes])

  const handleNoteSelect = (item, folderName) => {
    navigation.navigate('NoteDetails', {
      item: item,
      folderName: folderName
    })
  }

  const renderItem = (data, rowMap) => (
    <SwipeRow
      rightOpenValue={-80}
      leftOpenValue={0}
      disableRightSwipe={true}
    >
      <Pressable
        style={styles.button} 
        onPress={() => {
          deleteNote(data.item.noteId, data.item.folderId)
      }}>
        <Text style={styles.text}>Xóa</Text>
      </Pressable>
      <NoteRow item={data.item} folderName={item.folderName} onNoteSelect={handleNoteSelect} />
    </SwipeRow>
  )

  const keyExtractor = (item) => item.noteId

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{item.folderName}</Text>
        <SwipeListView 
          data={noteList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#f5f4f1'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 10
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
  notes: state.notes
})

export default connect(mapStateToProps, {addNote, deleteNote})(NoteList)
