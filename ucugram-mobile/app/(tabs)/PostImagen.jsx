// screens/PostImage.tsx
import React, { useContext, useState } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PostContext, PostProvider } from '../../context/PostContext';

const PostImage = () => {
    const { uploadNewPost } = useContext(PostContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  // Solicitar permisos para acceder a la galería y la cámara
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos para acceder a la galería.');
    }
  };

  const pickImage = async () => {
    try {
      await requestPermissions();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen', error);
    }
  };

  const takePhoto = async () => {
    try {
      await requestPermissions();
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  };

  // Función para subir la imagen
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Por favor selecciona una imagen');
      return;
    }

    const file = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    setLoading(true);
    try {
      const response = await uploadNewPost(caption, file); // Usar la función del contexto para subir la publicación
      setLoading(false);
      Alert.alert('Éxito', 'La publicación se ha subido exitosamente');
    } catch (error) {
      setLoading(false);
      console.error('Error al subir la imagen', error);
      Alert.alert('Error', 'Hubo un problema al subir la imagen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir una nueva publicación</Text>

      {/* Mostrar la imagen seleccionada */}
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {/* Botones para seleccionar imagen o tomar foto */}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      <Button title="Tomar Foto" onPress={takePhoto} />

      {/* Campo para ingresar el caption */}
      <TextInput
        style={styles.input}
        placeholder="Escribe una descripción..."
        value={caption}
        onChangeText={setCaption}
      />

      {/* Botón para subir la imagen */}
      <Button title="Subir Publicación" onPress={uploadImage} disabled={loading} />

      {loading && <Text>Subiendo...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default PostImage;
