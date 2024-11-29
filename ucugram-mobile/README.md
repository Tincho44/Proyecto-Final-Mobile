# UCUGram DWM 2024

## Descripción del Proyecto
Esta es la versión mobile del proyecto final de DWM 2024.

## Tecnologías Utilizadas

### Core
- **React Native**: Framework principal para el desarrollo móvil multiplataforma
- **Expo**: Plataforma para simplificar el desarrollo de React Native
- **TypeScript**: Superset de JavaScript que añade tipado estático

### Navegación y Routing
- **Expo Router**: Sistema de navegación basado en archivos, similar a Next.js
- **React Navigation**: Para la navegación entre pantallas y manejo de tabs

### Estado y Networking
- **Context API**: Para el manejo de estado global (autenticación)
- **Axios**: Cliente HTTP para las peticiones al backend

### Almacenamiento
- **AsyncStorage**: Para persistencia de datos local (tokens, preferencias)

## Configuración y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI
- iOS Simulator (Mac) o Android Studio (Windows/Mac/Linux)

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Instalar Expo CLI globalmente
npm install -g expo-cli
```

### Ejecución
```bash
# Iniciar el proyecto
npx expo start

# Para iOS
npx expo run:ios

# Para Android
npx expo run:android
```

## Estructura del Proyecto

```
src/
├── app/                 # Rutas y navegación (Expo Router)
│   ├── (auth)/         # Rutas de autenticación
│   └── (tabs)/         # Rutas principales de la app
├── components/         # Componentes reutilizables
├── contexts/          # Contextos de React (AuthContext, etc.)
├── services/         # Servicios para API calls
├── hooks/            # Hooks personalizados
├── utils/            # Utilidades y helpers
├── types/            # Definiciones de TypeScript
└── constants/        # Constantes y configuración
```

### Decisiones de Arquitectura

1. **Expo Router**: 
   - Elegido por su sistema de navegación basado en archivos
   - Facilita la implementación de rutas protegidas
   - Mejor integración con Expo

2. **Estructura por Funcionalidad**:
   - Organización basada en características para mejor escalabilidad
   - Separación clara entre componentes de UI y lógica de negocio

3. **Context API vs Redux**:
   - Context API elegido por su simplicidad y suficiencia para el alcance actual
   - Menor curva de aprendizaje y configuración más sencilla

4. **Servicios Centralizados**:
   - Abstracción de llamadas API en servicios
   - Mejor mantenibilidad y reutilización de código

## Librerías Principales y Justificación

1. **Expo**
   - Simplifica el desarrollo y despliegue
   - Proporciona acceso a APIs nativas comunes
   - Facilita el testing en dispositivos reales

2. **TypeScript**
   - Mejora la detección temprana de errores
   - Proporciona mejor documentación inline
   - Facilita el mantenimiento a largo plazo

3. **Axios**
   - Interfaz más intuitiva que fetch
   - Mejor manejo de errores
   - Interceptores para manejo global de requests

4. **AsyncStorage**
   - Solución de almacenamiento persistente recomendada para React Native
   - API simple y consistente
   - Buen rendimiento para datos pequeños

5. **Expo Router**
   - Sistema de navegación moderno y declarativo
   - Mejor rendimiento que React Navigation standalone
   - Soporte nativo para deep linking

## Próximos Pasos y Mejoras Planificadas
- Implementación de caché de imágenes
- Optimización de rendimiento en listados largos
- Implementación de pruebas automatizadas
- Soporte offline