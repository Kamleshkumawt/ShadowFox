import { useDispatch } from 'react-redux';
import AppRouter from './routes/AppRouter'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { setUser } from './store/slices/authSlice';
import { useGetProfileMutation } from './store/api/authApi';

const AppContent = () => {
  const dispatch = useDispatch();
  const [getProfile] = useGetProfileMutation();

  const location = useLocation();

  useEffect(() => {

    if (location.pathname.startsWith('/seller')) return;
    if (location.pathname.startsWith('/admin')) return;

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

  return <AppRouter />;
  
};

const App = () =>  (
  <BrowserRouter>
    <AppContent/>
  </BrowserRouter>
);

export default App