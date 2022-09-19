import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('loto3000-user'))

const initialState = {
    user: user ? user : null,
    loading: 'idle', //'idle | 'penidng' | 'succeeded' | 'failed'
    error: null,
}

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      // console.log(error.response.data)
      // const message =
      //   (error.response && error.response.data && error.response.data.message) ||
      //   error.message ||
      //   error.toString()
        const message = error.response.data
      return thunkAPI.rejectWithValue(message)
    }
  })




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = 'idle'
            state.error = ''
        },
        logout: (state) => {
          state.loading = 'idle'
          state.error = ''
          state.user = ''
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.loading = 'penidng'
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.user = action.payload
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.payload
            state.user = null
          })
          .addCase(login.pending, (state) => {
            state.loading = 'penidng'
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.user = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            console.log(action.payload)
            state.loading = 'failed'
            state.error = action.payload
            state.user = null
          })
          
      },
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer