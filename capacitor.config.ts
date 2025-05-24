import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PWM-S4',
  webDir: 'www',

  // Añade estas nuevas propiedades:
  plugins: {
    StatusBar: {
      style: 'Dark', // O 'Light' según tu tema
      overlay: false // Evita que la app solape la barra de estado
    }
  },

  // Configuración específica para Android/iOS (opcional pero recomendado)
  android: {
    backgroundColor: '#ffffffff', // Fondo blanco (ajusta el color si necesitas)
  },
  ios: {
    contentInset: 'automatic' // Gestiona automáticamente el notch
  }
};

export default config;
