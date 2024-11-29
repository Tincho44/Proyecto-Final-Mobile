import React, { createContext, useState, useContext } from 'react';
import UserService from '../services/UserService';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllUsers, addFriend: addFriendService, removeFriend: removeFriendService } = UserService();
  const { user: authUser } = useContext(AuthContext);


  const getFriends = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      let userAct;
      response.data.forEach(user => {
        if (!user.profilePicture) {
          user.profilePicture = "http://64.23.228.143:3001/uploads/default-profile.jpg";
        }
        if (user._id === authUser._id) {
          userAct = user;
        }
      });
      const filteredFriends = response.data.filter(user => user._id !== authUser._id && userAct.friends.includes(user._id));
      setFriends(filteredFriends);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los amigos :'(");
    } finally {
      setLoading(false);
    }
  };

  const addFriend = async (friendId) => {
    try {
      console.log("friendId", friendId);
      await addFriendService(friendId);
      getFriends();
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar amigo");
    }
  }

  const removeFriend = async (friendId) => {
    try {
      await removeFriendService(friendId);
      getFriends();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar amigo :)");
    }
  }

  return (
    <UserContext.Provider value={{ getFriends, friends, loading, addFriend, removeFriend }}>
      {children}
    </UserContext.Provider>
  );
};