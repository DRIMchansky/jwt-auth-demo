import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEY } from '../utils/constants'

export type UserInfo = {
  id: string
  login: string
  firstName?: string
  lastName?: string
}

type InitialState = {
  userInfo: UserInfo | null
}

const userInfo = localStorage.getItem(STORAGE_KEY)
const initialState: InitialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
    },
    logout: state => {
      state.userInfo = null
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
