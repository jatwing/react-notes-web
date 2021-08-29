import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/utils/firebase';

const authorsAdapter = createEntityAdapter({
  selectId: (entity) => entity.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = authorsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAuthors',
  async () => {
    const col = collection(db, 'authors');
    const snapshot = await getDocs(col);

    console.log('snapshot')
    console.log(snapshot)


    return snapshot.docs.map((doc) => doc.data());
  }
);

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    postAdded: {
      reducers: (state, action) => {
        state.data.push(action.payload)
      },
    }
  },
  extraReducers: {
    [fetchAuthors.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAuthors.fulfilled]: (state, action) => {
      console.log("action paylpad here")
      console.log(action.payload)

      state.status = 'succeeded'
      const entities = [{id: '1', name: 'Book3'},
        {id:'2', name: 'das'}
      ]
      console.log(entities)
      authorsAdapter.setAll(state, action.payload)
    },
    [fetchAuthors.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }

  },
});

export const authorsReducer =  authorsSlice.reducer;

