import { combineReducers } from 'redux'

import { LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT, ADD_FOLDER, DELETE_FOLDER, CHANGE_CONTENT_NOTE, ADD_NOTE, DELETE_NOTE } from './actions'


const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: 
      return {...state, token: action.payload, isLogin: true, logErr: null}
    case LOGIN_ERROR: 
      return {...state, logErr: action.payload}
    case LOG_OUT:
      return {...state, token: null, isLogin: false}
    default:
      return state
  }
}

const folderReducer = (state = [{folderId: 0, folderName: "Notes"}], action) => {
  switch (action.type) {
    case ADD_FOLDER:
      return [...state, action.payload]
    case DELETE_FOLDER:
      return state.filter(folder => folder.folderId !== action.payload)
    default:
      return state
  }
}

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case CHANGE_CONTENT_NOTE:
      return state.map(note => {
        if (note.noteId === action.payload.noteId && note.folderId === action.payload.folderId) {
          return action.payload
        } else {
          return note
        }
      })
    case ADD_NOTE:
      return [...state, action.payload]
    case DELETE_NOTE:
      if (action.payload.noteId === null) {
        return state.filter(note => (
          note.folderId !== action.payload.folderId
        ))
      } else {
        return state.filter(note => 
        (note.noteId !== action.payload.noteId || 
          note.folderId !== action.payload.folderId))
      }
    default:
      return state
  }
}


const reducer = combineReducers({
  user: userReducer,
  folders: folderReducer,
  notes: noteReducer,
})

export default reducer