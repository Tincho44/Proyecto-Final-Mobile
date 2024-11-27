import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfilePicture = ({ user }) => (
  <View style={styles.container}>
    <Image source={{ uri: user.profilePicture }} style={styles.image} />
    <Text style={styles.username}>{user.username}</Text>
    <Text style={styles.description}>{user.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProfilePicture;
