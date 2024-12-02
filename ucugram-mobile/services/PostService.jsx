import useApi from "../hooks/useApi";

const usePostService = () => {
  const { doRequest } = useApi();

  const getFeed = async () => {
    const response = await doRequest("posts/feed", "GET", null, true);
    return response;
  };

  const uploadPost = async (caption, url) => {
    console.log(url)
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', url);

    const response = await doRequest("posts/upload", "POST", formData, true, 'multipart/form-data');
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