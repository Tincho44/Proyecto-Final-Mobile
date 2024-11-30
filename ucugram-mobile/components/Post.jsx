import React, { useState, useContext, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostContext } from "../context/PostContext"; // Asegúrate de importar el contexto correctamente}
import { AuthContext } from "@/context/AuthContext";
import CommentsModal from './CommentsModal'

export default function Post({ post }) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [postLikeado, setPostLikeado] = useState(false);
  const MAX_COMMENTS = 3;
  const { hitlikePost, hitUnlikePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);


  const displayComments = showAllComments
    ? post.comments
    : post.comments.slice(0, MAX_COMMENTS);

  const getFullImageUrl = (relativePath) => {
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    return `http://64.23.228.143:3001/${cleanPath}`;
  };

  useEffect(() => {
    const liked = post.likes.includes(user._id);
    setPostLikeado(!!liked);
  }, [post.likes, user._id]);

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const id = post._id; // Usando el _id para la referencia al post

  

  const _handleLikeButton = () => {
  if (postLikeado) {
    hitUnlikePost(id);
    // Remover el ID del usuario del array de likes (si está presente)
    const index = post.likes.indexOf(user._id);
    if (index !== -1) {
      post.likes.splice(index, 1); // Eliminar el like del array
    }
  } else {
    hitlikePost(id);
    // Añadir el ID del usuario al array de likes
    post.likes.push(user._id); // Agregar el like
  }
  setPostLikeado(!postLikeado); // Cambiar el estado de like
};



return (
  <View style={styles.container}>
    {/* Header del post */}
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

    {/* Imagen del post */}
    <Image
      source={{ uri: getFullImageUrl(post.imageUrl) }}
      style={styles.postImage}
    />

    {/* Acciones del post */}
    <View style={styles.actions}>
      <View style={styles.leftActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={_handleLikeButton}
        >
          <Ionicons
            name={postLikeado ? "heart" : "heart-outline"}
            size={28}
            color={postLikeado ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setCommentsModalVisible(true)} // Abre el modal
        >
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

    {/* Likes */}
    <Text style={styles.likes}>{post.likes.length} likes</Text>

    {/* Descripción */}
    <View style={styles.captionContainer}>
      <Text style={styles.username}>{post.user.username}</Text>
      <Text style={styles.caption}>{post.caption}</Text>
    </View>

    {/* Comentarios */}
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

    {/* Modal de comentarios */}
    {commentsModalVisible && (
      <CommentsModal
        post={post} // Pasar el post al modal
        isOpen={commentsModalVisible} // Controlar visibilidad
        onClose={() => setCommentsModalVisible(false)} // Cerrar el modal
      />
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
