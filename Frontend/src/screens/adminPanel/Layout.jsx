import { useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { setAdminUser } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { useGetAdminProfileAccountMutation } from '../../store/api/adminAuthApi';

const Layout = () => {
  const dispatch = useDispatch();

    const [getAdminProfileAccount, {data, isLoading}] = useGetAdminProfileAccountMutation();

  useEffect(() => {
      getAdminProfileAccount();
  },[getAdminProfileAccount]);

  useEffect(() => {
      if(data){
          // console.log('data : ',data);
          dispatch(setAdminUser(data.admin));
      }
  },[data, dispatch]);

  return !isLoading ? (
    <>
    <AdminNavbar />
    <div className='flex bg-gray-100'>
        <AdminSidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
            <Outlet />
        </div>
    </div>
    </>
  ) : <Loading/>
}

export default Layout