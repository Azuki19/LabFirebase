
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { logoutUser } from '../../redux/userSlice';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ProfileCard from '../../components/profileCard';
import Survey from '../../components/Survey';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, email } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);
        setIsProfileComplete(data.avatar && data.description && data.interests.length > 0);
      }
    };

    if (uid) {
      fetchUserProfile();
    }
  }, [uid]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleProfileCompletion = async (updatedData) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { ...updatedData, profileComplete: true }, { merge: true });


    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedData,
      profileComplete: true,
    }));
    setIsProfileComplete(true);
  };

  return (
    <section>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>

      {userProfile ? (
        <section>
          <ProfileCard userProfile={userProfile} isProfileComplete={isProfileComplete} />
          {!isProfileComplete && <Survey onComplete={handleProfileCompletion} />}
        </section>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
};

export default Dashboard;
