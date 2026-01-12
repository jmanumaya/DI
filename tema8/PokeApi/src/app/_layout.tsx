// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Configuramos la pantalla "index" (tu archivo index.tsx).
        headerShown: false -> Ocultamos la barra de arriba nativa 
        porque ya creamos nuestro propio Header bonito en el diseño anterior.
      */}
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          title: 'Pokédex' 
        }} 
      />
    </Stack>
  );
}