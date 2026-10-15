import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
};

type CounterState = {
  count: number;
  loading: boolean;
  error: string | null;
  data: User[];
};

const initialState: CounterState = {
  count: 0,
  loading: false,
  error: null,
  data: [],
};

export const fetchUsers = createAsyncThunk<User[]>(
  "counter/fetchUsers",
  async () => {
    const users = new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Vivek Ranjan",
          },
          {
            id: 2,
            name: "Sujeet Kumar",
          },
        ]);
      }, 1000);
    });
    return users;
  },
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count = state.count + action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something broke";
      });
  },
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;

export default counterSlice.reducer;
