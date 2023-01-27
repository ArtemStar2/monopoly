import { AppDispatch } from '../../store';
import axios from 'axios';
import { profileSlice } from './';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/fetchAll', async (limit: number, thunkAPI) => {
  try {
    const response = await axios.get<any>(
      `https://api.monopoly-dapp.com/users/`,
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
  }
});
