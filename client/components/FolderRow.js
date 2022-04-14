import React from "react"
import { Text, StyleSheet, View, TouchableHighlight} from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'

function FolderRow({ item, onFolderSelect}) {

  const handleFolderSelect = () => {
    onFolderSelect(item)
  }

  return (
    <TouchableHighlight 
      onPress={handleFolderSelect} 
      style={styles.container}
      underlayColor='#f0e6c5'
    >
      <View style={styles.row}>
        <Text style={[styles.rowText]}>
          {item.folderName}
        </Text>
        <AntIcon 
          name='right'
          size={25} 
          color="#ddd"
        />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4f1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  rowText: {
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

export default FolderRow