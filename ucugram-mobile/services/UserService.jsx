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

  return { getUserProfile, editUserProfile, getAllUsers };
};

export default useUserService;