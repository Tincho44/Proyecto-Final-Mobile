import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import { StatusBar } from "expo-status-bar";
import usePostService from "@/services/feedService";

export default function Feed() {
  const { getFeed } = usePostService();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
   setLoading(true);
   try {
      const response = await getFeed();
      console.log(response);
      setPosts(response.data);
      setLoading(false);
      setRefreshing(false);
   }  catch (error) {
      setError(error.message);
      setLoading(false);
      setRefreshing(false);
    }
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar el feed: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});
