import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './SidePanel.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { setCurrentlySelectedDropdownCourse } from '../../../redux/coursesSlice';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import { createChatWithSelectedDropdownCourse } from '../../../redux/chatsSlice';
import { setActivePanelInfo } from '../../../redux/userSlice';
import { logoutUser } from '../../../redux/authSlice';
import SidePanelUserMenu from '../../molecules/SidePanelUserMenu/SidePanelUserMenu';
import CreateNewChatSection from '../../molecules/CreateNewChatSection/CreateNewChatSection';
import ExistingChat from '../../molecules/ExistingChat/ExistingChat';

const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouriteCourses = useSelector(userFavouriteCoursesSelector);
  const selectedCourse = useSelector(
    state => state.courses.currentlySelectedDropdownCourse
  );
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [defaultDropdownValue, setDefaultDropdownValue] = useState('');
  const existingChats = useSelector(state => state.chats.userChats);
  const [chatTitles, setChatTitles] = useState([]);

  useEffect(() => {
    console.log(
      'existingChats',
      existingChats,
      Object.values(existingChats).length
    );
    if (existingChats && Object.values(existingChats).length > 0) {
      const updatedChatTitles = Object.values(existingChats).map(
        chat => chat.title
      );
      setChatTitles(updatedChatTitles);
      console.log('chatTitles', updatedChatTitles);
    }
  }, [existingChats]);

  useEffect(() => {
    const firstCourse =
      favouriteCourses && (Object.values(favouriteCourses)[0] || null);
    dispatch(setCurrentlySelectedDropdownCourse(firstCourse));
  }, [favouriteCourses, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleNewChat = () => {
    if (selectedCourse) {
      dispatch(createChatWithSelectedDropdownCourse(selectedCourse._id));
      dispatch(setActivePanelInfo());
    }
  };

  const handleCourseChange = event => {
    const newCourseId = event.target.value;
    const newCourse = favouriteCourses[newCourseId];
    dispatch(setCurrentlySelectedDropdownCourse(newCourse));
  };

  useEffect(() => {
    if (selectedCourse) {
      setDefaultDropdownValue(selectedCourse._id);
    } else if (
      favouriteCourses &&
      Object.values(favouriteCourses)[0] &&
      Object.values(favouriteCourses)[0]._id
    ) {
      setDefaultDropdownValue(Object.values(favouriteCourses)[0]._id);
    }
  }, [selectedCourse, favouriteCourses]);

  return (
    <div className={styles.sidepanel}>
      <div className={styles.courseSelect}>
        <CreateNewChatSection
          favouriteCourses={favouriteCourses}
          handleCourseChange={handleCourseChange}
          defaultDropdownValue={defaultDropdownValue}
          handleNewChat={handleNewChat}
        />
        <div style={{ marginTop: 16, paddingLeft: 4 }}>
          {chatTitles.map((title, index) => (
            <ExistingChat key={index} title={title} />
          ))}
        </div>
      </div>
      <div className={styles.profile}>
        <SidePanelUserMenu
          handleLogout={handleLogout}
          setSettingsOpen={setSettingsOpen}
        />
        {isSettingsOpen && (
          <ProfileModal
            isOpen={isSettingsOpen}
            handleClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SidePanel;
