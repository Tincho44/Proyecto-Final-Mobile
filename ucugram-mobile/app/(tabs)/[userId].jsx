import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Button, Modal, StyleSheet, Alert } from "react-native";
import ProfilePicture from "@/components/profile/ProfilePicture";
import UserStats from "@/components/profile/UserStats";
import PostsList from "@/components/profile/PostsList";
import { useLocalSearchParams } from "expo-router";
import useUserService from "@/services/UserService";
import { useAuth } from "@/hooks/useAuth";
import  ChangePicture from "@/components/profile/ChangePicture";
import ChangeDescription from "@/components/profile/ChangeDescription"

const ProfileScreen = () => {
  const { getUserProfile } = useUserService();
  const userId = useLocalSearchParams().userId;
  const { user: userLog } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!userLog) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }
  const isOwnProfile = userId == "undefined" || userId == undefined || userId === userLog._id; 

  const fetchUserData = async () => {
    setLoading(true);
    try {
      let response;
      if (isOwnProfile) {
        response = await getUserProfile(userLog._id);
      } else {
        response = await getUserProfile(userId);
      }
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); 

  useEffect(() => {
    if (userData && userLog && userData.user && userData.user.friends) {
      setIsFriend(userData.user.friends.some(friend => friend._id === userLog._id));
    }
  }, [userData, userLog]); 

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddFriend = async () => {
    try {
      await addFriend(userData.user._id);
      await fetchUserData(); 
    } catch (error) {
      console.error("Error al añadir amigo:", error);
      Alert.alert("Error", "No se pudo agregar al amigo.");
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(userData.user._id);
      await fetchUserData(); 
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
      Alert.alert("Error", "No se pudo eliminar al amigo.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <ProfilePicture user={userData.user} />
          <UserStats user={userData.user} postsCount={userData.posts.length} />
          <PostsList posts={userData.posts} />
          
          {isOwnProfile ? (
            <>
              <Button title="Editar perfil" onPress={toggleModal} />
              <Modal visible={isModalOpen} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Button title="Cerrar" onPress={toggleModal} />
                    <ChangePicture user={userData.user} />
                    <ChangeDescription userId={userData.user._id} />
                  </View>
                </View>
              </Modal>
            </>
          ) : isFriend ? (
            <Button title="Eliminar amigo" onPress={handleRemoveFriend} />
          ) : (
            <Button title="Añadir como amigo" onPress={handleAddFriend} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default ProfileScreen;
