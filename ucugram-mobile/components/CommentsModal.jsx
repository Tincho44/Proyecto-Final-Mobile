import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import useCommentService from '../services/CommentService';
import useUserService from '../services//UserService';
import PropTypes from 'prop-types';

const CommentsModal = ({ post, isOpen, onClose }) => {
  if (!post || !post.comments) {
    return null;
  }

  const { createComment } = useCommentService();
  const { getUserProfile } = useUserService();
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const createdComment = await createComment(post._id, newComment);
      const username = await getUserProfile(createdComment.user);
      createdComment.username = username.data.user.username;
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error al crear el comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Comentarios</Text>

          {/* Lista de comentarios */}
          <ScrollView style={styles.commentsList}>
            {comments.map((comment) => (
              <View key={comment._id} style={styles.commentItem}>
                <Text style={styles.commentUsername}>
                  {comment.user.username || comment.username}
                </Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Campo para agregar un nuevo comentario */}
          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.textInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Escribe tu comentario..."
              multiline
            />
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.disabledButton,
              ]}
              onPress={handleCommentSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

CommentsModal.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
        }),
      })
    ),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: 300,
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
  },
  newCommentContainer: {
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: "black"
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default CommentsModal;
