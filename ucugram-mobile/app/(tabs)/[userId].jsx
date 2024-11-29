import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import ProfilePicture from "@/components/profile/ProfilePicture";
import UserStats from "@/components/profile/UserStats";
import PostsList from "@/components/profile/PostsList";
import { useLocalSearchParams } from "expo-router";
import useUserService from "@/services/UserService";

const ProfileScreen = () => {
  const {getUserProfile} = useUserService();
  const userId = useLocalSearchParams().userId;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile(userId);
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

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <ProfilePicture user={userData.user} />
      <UserStats user={userData.user} postsCount={userData.posts.length} />
      <PostsList posts={userData.posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems:"center"
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
