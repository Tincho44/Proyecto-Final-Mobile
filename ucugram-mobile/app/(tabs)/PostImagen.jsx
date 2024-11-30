import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications"; 
import usePostService from '../../services/PostService';

const CreatePostPage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [caption, setCaption] = useState("");
  const { uploadPost } = usePostService()
  const toast = useToast();

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permiso denegado", "Se necesita acceso a la galería para seleccionar una imagen.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
    }
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      return;
    }

    try {
      const data = new FormData();
      data.append("file", imageUri);
      data.append("upload_preset", "unsigned_preset"); // Cambiar por tu preset de Cloudinary

      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/ddukhiy9y/image/upload", {
        method: "POST",
        body: data,
      });

      const cloudinaryResult = await cloudinaryResponse.json();

      if (cloudinaryResponse.ok && cloudinaryResult.secure_url) {
        const imageUrl = cloudinaryResult.secure_url;
        await uploadPost(caption, imageUrl); 
        setImageUri(null);
        setCaption("");
      } else {
        console.error("Cloudinary upload error:", cloudinaryResult);
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Publicación</Text>

      {/* Botón para seleccionar imagen */}
      <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
        <Text style={styles.imagePickerText}>
          {imageUri ? "Cambiar Imagen" : "Seleccionar Imagen"}
        </Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {/* Campo de texto para el caption */}
      <TextInput
        style={styles.input}
        placeholder="Escribe un caption..."
        value={caption}
        onChangeText={(text) => setCaption(text)}
        multiline
      />

      {/* Botón para publicar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imagePickerButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreatePostPage;
