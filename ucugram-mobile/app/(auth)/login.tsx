import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  const handleSubmit = () => {
    if (isLogin) {
      login(email, password);
    } else {
      register(username, email, password);
    }
  };

  const isFormValid = isLogin
    ? email.length > 0 && password.length > 0
    : email.length > 0 && password.length > 0 && username.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Instagram</Text>

        {!isLogin && (
          <Text style={styles.subtitle}>
            Regístrate para ver fotos y videos de tus amigos.
          </Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#8e8e8e"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#8e8e8e"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#8e8e8e"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => {
            setIsLogin(!isLogin);
            setEmail("");
            setPassword("");
            setUsername("");
          }}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "¿No tienes una cuenta? Regístrate"
              : "¿Ya tienes una cuenta? Inicia sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logo: {
    fontSize: 40,
    fontFamily: "SpaceMono",
    marginBottom: 20,
  },
  subtitle: {
    color: "#8e8e8e",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#dbdbdb",
    borderRadius: 3,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#0095f6",
    borderRadius: 3,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#b2dffc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  forgotButton: {
    alignItems: "center",
    marginTop: 20,
  },
  forgotText: {
    color: "#00376b",
    fontSize: 12,
  },
  bottomContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#dbdbdb",
    padding: 20,
  },
  switchContainer: {
    alignItems: "center",
  },
  switchText: {
    color: "#0095f6",
    fontSize: 14,
    fontWeight: "500",
  },
});
