import { logout } from '../redux/slices/userSlice';

export const handleApiError = (error, thunkAPI) => {
  // Check if error is due to authentication
  if (error?.response?.status === 401) {
    // Dispatch logout if authentication fails completely
    thunkAPI.dispatch(logout());
    return thunkAPI.rejectWithValue({
      status: {
        code: 401,
        description: 'Authentication failed'
      }
    });
  }

  // Handle other API errors
  return thunkAPI.rejectWithValue(
    error.response?.data || {
      status: {
        code: 500,
        description: 'An unexpected error occurred'
      }
    }
  );
};