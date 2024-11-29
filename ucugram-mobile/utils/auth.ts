import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string) => {
  try {
    const userData = {
      token: token
    };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const setupTestToken = async () => {
  const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTlhOWEwZDM5NzBhOTRkYTUzZTk4NiIsImlhdCI6MTczMjY2NTU0NywiZXhwIjoxNzM1MjU3NTQ3fQ.h4MNlU0mKQ8vfyKorEBJNrux8CuCtYXHT3nwURV2rWE";
  await saveToken(testToken);

  const savedData = await AsyncStorage.getItem('user');
  console.log('Token guardado:', savedData);

};

