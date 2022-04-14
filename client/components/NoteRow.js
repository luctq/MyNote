import React from "react"
import {TouchableHighlight, Text, StyleSheet} from 'react-native'

function NoteRow({ item, onNoteSelect, folderName}) {

  const getNoteTitle = (noteContent) => {
    const regex = /(<\w+>)+([-/:;()&@"\.,?!'₫1234567890aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+)/
    const match = regex.exec(noteContent);
    if (match !== null) {
      return match[match.length - 1]
    }
  }

  return (
    <TouchableHighlight 
      onPress={() => onNoteSelect(item, folderName)} 
      style={[styles.container]}
      underlayColor='#f0e6c5'
    >
      <Text style={styles.row}>{getNoteTitle(item.noteContent)}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4f1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    fontSize: 18,
  }
})

export default NoteRow