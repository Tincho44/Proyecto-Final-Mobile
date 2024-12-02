import useApi from "@/utils/api";

const usePostService = () => {
  const { doRequest } = useApi();

  const getFeed = async () => {
    const response = await doRequest("posts/feed", "GET", null, true);
    return response;
  };

  return { getFeed };
} 

export default usePostService;