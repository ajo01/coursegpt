import React, { useEffect, useState } from 'react';
import SidePanel from '../organisms/SidePanel/SidePanel';
import RightSection from '../organisms/RightSection/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/authSlice';
import LoadingSpinner from '../atoms/LoadingSpinner/LoadingSpinner';
import { fetchAllSchools } from '../../redux/schoolsSlice';
import {
  fetchAllCourses,
  setCurrentlySelectedDropdownCourse,
} from '../../redux/coursesSlice';
import { fetchUserChats, setWaitingFirstMessage } from '../../redux/chatsSlice';
import { setActivePanelInfo } from '../../redux/userSlice';

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const persistedDropdownCourse = useSelector(
    state => state.user.selectedCourse
  );
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      loginAndLoadUserData();
    } else {
      loadData();
    }
  }, [isAuthenticated, dispatch]);

  const loginAndLoadUserData = async () => {
    try {
      await dispatch(fetchUser());
      if (isAuthenticated) {
        loadData();
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    try {
      await dispatch(fetchAllSchools());
      await dispatch(fetchAllCourses());
      dispatch(setCurrentlySelectedDropdownCourse(persistedDropdownCourse));
      if (persistedDropdownCourse) {
        dispatch(setActivePanelInfo());
        dispatch(setWaitingFirstMessage(true));
      }
      await dispatch(fetchUserChats());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="App">
      {!user.type ? (
        <>
          <RegisterUserDetails />
        </>
      ) : (
        <>
          <SidePanel />
          <RightSection />
        </>
      )}
    </div>
  );
}

export default Home;
