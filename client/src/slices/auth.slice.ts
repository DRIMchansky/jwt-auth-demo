import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  userInfo: string | null
}

const userInfo = localStorage.getItem('userInfo')
const initialState: InitialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: state => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    }
  }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
