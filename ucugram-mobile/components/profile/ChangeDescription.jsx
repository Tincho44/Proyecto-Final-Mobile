import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import useApi from '@/hooks/useApi';

const ChangeDescription = ({ userId }) => {
  const [nuevaDescripcion, setDescripcion] = useState('');
  const { doRequest } = useApi() // Usamos el servicio para las peticiones

  const handleTextChange = (text) => {
    setDescripcion(text);
    console.log(nuevaDescripcion)
  };

  const handleUpload = async () => {
    if (!nuevaDescripcion) {
      Alert.alert("Error", "La descripción no puede estar vacía.");
      return;
    }
    

    try {
      // Actualiza la descripción usando el servicio
      await doRequest(`user/profile/edit`, 'PUT', { description: nuevaDescripcion }, true);
    } catch (error) {
      console.error("Error updating description:", error);
      Alert.alert("Error", "No se pudo actualizar la descripción.");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={nuevaDescripcion}
        onChangeText={handleTextChange}
        placeholder="Nueva descripción"
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

export default ChangeDescription;
