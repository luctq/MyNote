import React from 'react'
import { View, TextInput, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

import { changeContentNote, deleteNote, addNote } from '../redux/actions'

class NoteDetails extends React.Component {

  item = this.props.route.params.item
  isNew = this.props.route.params.isNew

  state = {
    content: this.item.noteContent,
    height: 0,
    fullHeight: 0,
    richText: React.createRef()
  }

  handleChangeText = (content) => {
    this.setState({content})
  }

  componentWillUnmount() {
    if (this.state.content !== '' && this.isNew) {
      this.props.addNote({...this.item, noteContent: this.state.content})
    } 
    if (this.state.content !== '' && !this.isNew) {
      this.props.changeContentNote(
        { 
          folderId: this.item.folderId, 
          noteContent: this.state.content, noteId: this.item.noteId
        }
      )
    } 
    if (this.state.content === '') {
      this.props.deleteNote(this.item.noteId, this.item.folderId)
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerBackTitle: this.item.folderName
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={"padding"} enabled keyboardVerticalOffset={20}>
        <RichToolbar
          editor={this.state.richText}
          actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList, actions.insertOrderedList,]}
          iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
          style={{backgroundColor: "#f5f4f1"}}
        />
        <ScrollView style={{flex: 1}} keyboardDismissMode='interactive' onLayout={(ev) => {
          const fullHeight = ev.nativeEvent.layout.height
          this.setState({height: fullHeight, fullHeight: fullHeight})
        }}>
          <RichEditor
            ref={this.state.richText}
            initialContentHTML={this.state.content}
            onChange={ descriptionText => {
              this.handleChangeText(descriptionText)
            }}
            editorStyle={{backgroundColor: "#f5f4f1"}}
            placeholder="Type something here..."
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f5f4f1'
  },
  input: {
    fontSize: 18,
  }
})

export default connect(null, {changeContentNote, deleteNote, addNote})(NoteDetails)