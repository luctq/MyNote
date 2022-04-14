import { fetchLogin } from '../api'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOG_OUT = 'LOG_OUT'

export const ADD_FOLDER = 'ADD_FOLDER'
export const DELETE_FOLDER = 'DELETE_FOLDER'

export const CHANGE_CONTENT_NOTE = 'CHANGE_CONTENT_NOTE'
export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'

export const loginUser = (username, password) => (dispatch) => {
  fetchLogin(username, password)
    .then(({status, mes, token}) => {
      if (status === 0) {
        dispatch({type: LOGIN_ERROR, payload: mes})
      } else {
        dispatch({type: LOGIN_SUCCESS, payload: token})
      }
    })
}

export const logoutUser = () => ({
  type: LOG_OUT,
})

export const addFolder = (newFolder) => ({
  type: ADD_FOLDER,
  payload: newFolder
})

export const deleteFolder = (folderId) => ({
  type: DELETE_FOLDER,
  payload: folderId
})

export const changeContentNote = updateNote => ({
  type: CHANGE_CONTENT_NOTE,
  payload: updateNote
})

export const addNote = newNote => ({
  type: ADD_NOTE,
  payload: newNote
})

export const deleteNote = (noteId, folderId) => ({
  type: DELETE_NOTE,
  payload: {noteId, folderId}
})