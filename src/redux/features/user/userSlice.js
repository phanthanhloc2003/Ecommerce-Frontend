import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: "",
  name: "",
  email:"",
  address: "",
  phone: "",
  avata: "",
  access_Token:"",
  nickname: "",
  password:"",
  isAdmin:"",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser:(state, action) => {
     const {_id, name , email , token, address=" ", phone , avata = " ", nickname = " ", password , isAdmin}  = action.payload
    state.id = _id;
    state.name = name;
    state.email = email;
    state.address = address;
    state.phone = phone;
    state.avata = avata;
    state.password = password;
    state.nickname = nickname;
    state.isAdmin = isAdmin;
    state.access_Token = token;
    
    },
    clearUser:(state) => {
     state.id = "";
     state.name = "";
     state.email = "";
     state.address = "";
     state.phone = "";
     state.avata = "";
     state.access_Token = "";
     state.nickname = "";
     state.password = "";
     state.isAdmin = "";
     },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser , clearUser} = userSlice.actions

export default userSlice.reducer