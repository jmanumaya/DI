import * as signalR from '@microsoft/signalr';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  user: string;
  message: string;
}

const ChatApp = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://chatmaya-gfejfxhbc9c0e9fz.spaincentral-01.azurewebsites.net/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          setIsConnected(true);
          connection.on("ReceiveMessage", (user: string, message: string) => {
            setMessages(prevMessages => [...prevMessages, { user, message }]);
            // Scroll suave al recibir mensaje
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
          });
        })
        .catch(e => setIsConnected(false));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (!userInput.trim()) {
      alert("Por favor, escribe un nombre de usuario primero.");
      return;
    }
    if (!messageInput.trim()) return;

    if (connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await connection.invoke("SendMessage", userInput, messageInput);
        setMessageInput('');
        Keyboard.dismiss(); // Opcional: bajar teclado al enviar o mantenerlo
      } catch (e) { console.error(e); }
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.user.trim().toLowerCase() === userInput.trim().toLowerCase() && userInput !== '';
    return (
      <View style={[styles.row, isMe ? styles.rowMe : styles.rowThem]}>
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
          {!isMe && <Text style={styles.userLabel}>{item.user}</Text>}
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    // Usamos edges para gestionar el notch (arriba) y la barra home (abajo) manualmente si es necesario
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>SignalR Chat</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
            <Text style={styles.statusText}>{isConnected ? 'Conectado' : 'Desconectado'}</Text>
          </View>
        </View>
      </View>

      {/* BARRA DE CONFIGURACIÓN DE USUARIO (Separada del input de mensaje) */}
      <View style={styles.userConfigBar}>
        <Text style={styles.userConfigLabel}>Nickname:</Text>
        <TextInput
          placeholder="Tu Nombre..."
          value={userInput}
          onChangeText={setUserInput}
          style={styles.userNameInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* ZONA PRINCIPAL DE CHAT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
        style={styles.keyboardContainer}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* INPUT BAR (Footer) */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={isConnected ? "Escribe un mensaje..." : "Conectando..."}
            value={messageInput}
            onChangeText={setMessageInput}
            style={styles.inputField}
            multiline
            editable={isConnected}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.sendButton, (!isConnected || !messageInput.trim()) && styles.disabledButton]}
            onPress={sendMessage}
            disabled={!isConnected || !messageInput.trim()}
          >
             {/* Icono simple de flecha */}
            <Text style={styles.sendButtonArrow}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
      {/* Relleno para SafeArea inferior en iPhone X+ */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#F0F0F0' }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5DDD5' }, // Color fondo WhatsApp clásico

  // Header
  header: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#075E54',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 }
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { color: '#E0E0E0', fontSize: 12 },

  // Barra de Usuario (Top)
  userConfigBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  userConfigLabel: { fontSize: 14, color: '#555', marginRight: 10, fontWeight: '600' },
  userNameInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    paddingHorizontal: 15,
    color: '#333',
    fontSize: 14,
  },

  // Lista de mensajes
  keyboardContainer: { flex: 1 },
  listContent: { padding: 15, paddingBottom: 20 },
  
  row: { marginBottom: 10, width: '100%', flexDirection: 'row' },
  rowMe: { justifyContent: 'flex-end' },
  rowThem: { justifyContent: 'flex-start' },

  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 }
  },
  myBubble: { backgroundColor: '#DCF8C6', borderTopRightRadius: 2 },
  theirBubble: { backgroundColor: '#FFF', borderTopLeftRadius: 2 },

  userLabel: { fontSize: 12, fontWeight: 'bold', color: '#E53935', marginBottom: 2 },
  messageText: { fontSize: 16, color: '#000', lineHeight: 22 },

  // Input Bar (Bottom)
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Para que el botón se quede abajo si el texto crece
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  inputField: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100, // Limite de crecimiento
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10, // Importante para multiline alineado
    paddingBottom: 10,
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#075E54',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, // Alinear con la parte baja del input
  },
  disabledButton: { backgroundColor: '#B0BEC5' },
  sendButtonArrow: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 2 },
});

export default ChatApp;