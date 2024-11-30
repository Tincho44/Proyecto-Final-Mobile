import React, { createContext, useState, useContext } from 'react';
import PostService from '../services/PostService';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import usePostService from '../services/PostService';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getFeed, likePost, unlikePost } = PostService();
  const { user } = useContext(AuthContext);
  const {uploadPost} = usePostService()

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      response.data.forEach(post => {
        post.imageUrl = `http://64.23.228.143:3001/${post.imageUrl}`;
        if(post.user.profilePicture){
          post.user.profilePicture = `http://64.23.228.143:3001/${post.user.profilePicture}`;
        }else{
          post.user.profilePicture = "http://64.23.228.143:3001/uploads/default-profile.jpg";
        }
      });
      setPosts(response.data);
    } catch (error) {
      toast.error("Error al cargar los posts");
    } finally {
      setLoading(false);
    }
  };

  const hitlikePost = async (postId) => {
    try {
      const postResp = await likePost(postId);
      const newPosts = posts.map(post => {
        if (post._id === postId) {
          post.likes.push(user._id);
        }
        return post;
      });
      setPosts(newPosts);
    } catch (error) {
      toast.error("Error al dar like al post");
    }
  }

  const hitUnlikePost = async (postId) => {
    try {
      const postResp = await unlikePost(postId);
      const newPosts = posts.map(post => {
        if (post._id === postId) {
          post.likes = post.likes.filter(like => like !== user._id);
        }
        return post;
      });
      setPosts(newPosts);
    } catch (error) {
      toast.error("Error al quitar like al post");
    }
  }

  const uploadNewPost = async (caption, file) => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await uploadPost(caption, file); 
      toast.success("Publicación subida exitosamente");
    } catch (error) {
      toast.error("Error al subir la publicación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, fetchPosts, hitlikePost, hitUnlikePost, uploadNewPost }}>
      {children}
    </PostContext.Provider>
  );
};