import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
}

interface PostType {
  _id: string;
  caption: string;
  imageUrl: string;
  likes: string[];
  user: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  comments: Comment[];
}

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const MAX_COMMENTS = 3;

  const displayComments = showAllComments
    ? post.comments
    : post.comments.slice(0, MAX_COMMENTS);

  const getFullImageUrl = (relativePath: string) => {
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    return `http://64.23.228.143:3001/${cleanPath}`;
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: post.user.profilePicture }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: getFullImageUrl(post.imageUrl) }}
        style={styles.postImage}
      />

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.likes}>{post.likes.length} likes</Text>

      <View style={styles.captionContainer}>
        <Text style={styles.username}>{post.user.username}</Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>

      {post.comments.length > 0 && (
        <View style={styles.commentsSection}>
          {displayComments.map((comment) => (
            <View key={comment._id} style={styles.commentContainer}>
              <Text style={styles.commentUsername}>
                {comment.user.username}
              </Text>
              <Text style={styles.commentText}>{comment.content}</Text>
            </View>
          ))}

          {post.comments.length > MAX_COMMENTS && (
            <TouchableOpacity
              onPress={toggleComments}
              style={styles.viewMoreButton}
            >
              <Text style={styles.viewMoreText}>
                {showAllComments
                  ? "Ocultar comentarios"
                  : `Ver los ${post.comments.length} comentarios`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
  },
  postImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 15,
  },
  likes: {
    fontWeight: "bold",
    padding: 10,
  },
  captionContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  caption: {
    marginLeft: 5,
    flex: 1,
  },
  commentsSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    flex: 1,
  },
  viewMoreButton: {
    marginTop: 5,
  },
  viewMoreText: {
    color: "gray",
  },
});
