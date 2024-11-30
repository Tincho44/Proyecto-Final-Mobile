import useApi from "../hooks/useApi";

const usePostService = () => {
  const { doRequest } = useApi();

  const getFeed = async () => {
    const response = await doRequest("posts/feed", "GET", null, true);
    return response;
  };

  const uploadPost = async (caption, file) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", file);
    const response = await doRequest("posts/upload", "POST", formData, true);
    
    return response;
  };

  const likePost = async (postId) => {
    const formData = new FormData();
    formData.append("postId", postId);
    const response = await doRequest(`posts/${postId}/like`, "POST", formData, true);
    return response;
  };

  const unlikePost = async (postId) => {
    const formData = new FormData();
    formData.append("postId", postId);
    const response = await doRequest(`posts/${postId}/like`, "DELETE", formData, true);
    return response;
  };

  return { getFeed, uploadPost, likePost, unlikePost };
};

export default usePostService;