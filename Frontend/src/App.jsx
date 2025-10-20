import { useDispatch } from 'react-redux';
import AppRouter from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react';
import { setUser } from './store/slices/authSlice';
import { useGetProfileMutation } from './store/api/authApi';

const App = () => {
  const dispatch = useDispatch();
  const [getProfile] = useGetProfileMutation();

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await getProfile().unwrap();
          // console.log('Fetched user profile:', response);
          dispatch(setUser(response.user));
        } catch (err) {
          console.error('Failed to fetch user:', err);
        }
    };

    fetchUser();
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App