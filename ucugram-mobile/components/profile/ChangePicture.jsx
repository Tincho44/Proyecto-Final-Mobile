import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import useApi from '@/hooks/useApi';

const ChangePicture = ({ user }) => {
  const [selectedURL, setSelectedFile] = useState('');
  const { doRequest } = useApi(); // Usamos el servicio para las peticiones

  const handleFileChange = (text) => {
    setSelectedFile(text);
  };

  const handleUpload = async () => {
    if (!selectedURL) {
      Alert.alert("Error", "Por favor, ingresa una URL de imagen válida.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedURL);

    try {
      // Actualiza la foto de perfil utilizando el servicio
      await doRequest(`user/profile/edit`, "PUT", formData, true);
      Alert.alert("Éxito", "Foto de perfil actualizada con éxito.");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      Alert.alert("Error", "No se pudo actualizar la foto de perfil.");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={selectedURL}
        onChangeText={handleFileChange}
        placeholder="Ingresa URL de la imagen"
      />
      <Button title="Cambiar" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ChangePicture;
