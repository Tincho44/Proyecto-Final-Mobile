import useApi from "../hooks/useApi";

const useUserService = () => {
  const { doRequest } = useApi();


  const getAllUsers = async () => {
    const response = await doRequest("user/all", "GET", null, true);
    return response;
  };

  const getUserProfile = async (userId) => {
    const response = await doRequest(
      `user/profile/${userId}`,
      "GET",
      null,
      true
    );
    return response;
  };

  const editUserProfile = async (profileData) => {
    const response = await doRequest(
      `user/profile/edit`,
      "PUT",
      profileData,
      false
    );
    return response;
  };
  const addFriend = async (friendId) => {
    console.log(friendId)
    const response = await doRequest(`user/add-friend/${friendId}`, 'POST', null, true);
    return response;
  };

  const removeFriend = async (friendId) => {
    const response = await doRequest(`user/remove-friend/${friendId}`, 'DELETE', null, true);
    return response;
  };

  return { getUserProfile, editUserProfile, getAllUsers, addFriend, removeFriend };
  
};

export default useUserService;