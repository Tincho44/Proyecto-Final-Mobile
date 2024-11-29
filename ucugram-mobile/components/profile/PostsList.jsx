import { FlatList, Image, StyleSheet, View, Text } from "react-native";

const PostsList = ({ posts }) => {
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: `http://64.23.228.143:3001/${item.imageUrl}` }} style={styles.postImage} />
    </View>
  );

  if (posts.length === 0) {
    return <Text style={styles.noPostsText}>No hay publicaciones</Text>;
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  postContainer: {
    flex: 1,
    margin: 4,
    alignItems: "center",
  },
  postImage: {
    width: 150,
    height: 150,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default PostsList;
