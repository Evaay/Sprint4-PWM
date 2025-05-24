interface AlertButton {
  text: string;            // Texto que aparece en el botón
  role?: string;           // 'cancel' | 'destructive' | 'confirm' | etc.
  cssClass?: string;       // Clases CSS opcionales
  id?: string;             // ID opcional para diferenciar botones
  handler?: () => boolean | void | Promise<boolean | void>; // Función que se ejecuta al pulsar el botón
}
