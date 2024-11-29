import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserStats = ({ user, postsCount }) => (
  <View style={styles.container}>
    <Text style={styles.stat}>{user.friends.length} Amigos</Text>
    <Text style={styles.stat}>{postsCount} Publicaciones</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    gap:60,
    left:10
  },
  stat: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserStats;
