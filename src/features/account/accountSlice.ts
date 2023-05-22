import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Korisnik, KorisnikRegistration, TrenutniKorisnik } from "../../app/models/user";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import agent, { requests } from "../../app/api/agent";
import { router } from "../../router/Routes";
import { toast } from "react-toastify";

export interface AccountState{
    user: Korisnik | null;
}

/*export interface CurrentUser{
  currentUser: TrenutniKorisnik | null
}*/

const initialState: AccountState ={
    user: null
}

interface Credentials {
    korisnickoIme: string;
    lozinka: string;
  }

/*export const signInUser = createAsyncThunk<Korisnik, { korisnickoIme: string, lozinka: string }>(
    'account/signInUser',
    async({korisnickoIme, lozinka}, thunkAPI) => {
        try{
            const user = agent.Account.login({korisnickoIme,lozinka});
            return user;
        } catch (error:any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
)*/

  /*export const signInUser = createAsyncThunk(
    'Account/signInUser',
    async (formValues: FieldValues, thunkAPI) => {
        const {korisnickoIme, lozinka} = formValues;
      try {
        const user = await agent.Account.login({korisnickoIme,lozinka})
        localStorage.setItem('user',JSON.stringify(user));
        return user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
*/
  export const signInUser = createAsyncThunk(
    'Account/signInUser',
    async (formValues: FieldValues, thunkAPI) => {
        const {korisnickoIme, lozinka} = formValues
        const headers = {
            'Content-Type': 'application/json',
            // Add other headers here, if necessary
          };
          const config = {
            headers: JSON.parse(JSON.stringify(headers)),
          };
      try {
        const user = await axios.post('/Account/login', {korisnickoIme, lozinka},config);
        if (user.status === 401) {
          // Unauthorized - Invalid credentials
          return thunkAPI.rejectWithValue({ error: 'Ne poklapaju se lozinka i korisnicko ime!'});
          }
        localStorage.setItem('user',JSON.stringify(user));
        return user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );

  /*export const fetchCurrentUser = createAsyncThunk<Korisnik>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await axios.get('/korisnici/trenutniKorisnik');
            localStorage.setItem('user', JSON.stringify(userDto));
            return userDto;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)*/
/*
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const user = await axios.get('/korisnici/trenutniKorisnik');
      localStorage.setItem('user',JSON.stringify(user))
      return user.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);*/
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const token = JSON.parse(localStorage.getItem('user') || '').token;
      const headers = {
       Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.get('/korisnici/trenutniKorisnik', { headers });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
  {
    condition: () =>{
      if(!localStorage.getItem('user')) return false;
    }
  }
);


export const accountSlice = createSlice({
    name:'Account',
    initialState,
    reducers:{
        signOut: (state)=> {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/')
        },
        setUser: (state,action) => {
          state.user = action.payload.data;
        }
    },
    extraReducers: (builder => {
      builder.addCase(fetchCurrentUser.rejected,(state)=>{
        state.user = null;
        localStorage.removeItem('user');
        toast.error('Sesija je istekla - molimo Vas ulogujte se ponovo!');
        router.navigate('/')
      })
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state, action)=>{
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected),(state,action)=>{ 
          console.log(action.payload);
        });
    })
})

export const {signOut,setUser} = accountSlice.actions;