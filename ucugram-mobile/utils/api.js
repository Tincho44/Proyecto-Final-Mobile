import { useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const doRequest = useCallback(
    async (
      url,
      method = "GET",
      data = null,
      requiresToken = false,
      contentType = "application/json"
    ) => {
      let headers = {
        "Content-Type": contentType,
      };

      if (contentType === "multipart/form-data") {
        headers = {};
      }

      if (requiresToken) {
        try {

          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTlhOWEwZDM5NzBhOTRkYTUzZTk4NiIsImlhdCI6MTczMjY2NTU0NywiZXhwIjoxNzM1MjU3NTQ3fQ.h4MNlU0mKQ8vfyKorEBJNrux8CuCtYXHT3nwURV2rWE";
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error obteniendo el token de AsyncStorage:", error);
        }
      }

      try {
        const response = await axios({
          url: `http://64.23.228.143:3001/api/${url}`,
          method,
          headers,
          data,
        });

        return response;
      } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
      }
    },
    []
  );

  return { doRequest };
};

export default useApi;