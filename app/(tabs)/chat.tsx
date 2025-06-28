import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width, height } = Dimensions.get('window');

export default function ChatScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const conversations = [
    {
      id: 1,
      name: 'Team Chat',
      avatar: '👥',
      lastMessage: 'Great work on the project presentation!',
      timestamp: '2 min ago',
      unreadCount: 3,
      isGroup: true,
      online: true,
    },
    {
      id: 2,
      name: 'John Doe',
      avatar: '👨‍💼',
      lastMessage: 'Can you review the latest code changes?',
      timestamp: '15 min ago',
      unreadCount: 1,
      isGroup: false,
      online: true,
    },
    {
      id: 3,
      name: 'Sarah Smith',
      avatar: '👩‍💻',
      lastMessage: 'Meeting scheduled for tomorrow at 10 AM',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isGroup: false,
      online: false,
    },
    {
      id: 4,
      name: 'Project Alpha',
      avatar: '🚀',
      lastMessage: 'New task assigned: UI/UX improvements',
      timestamp: '2 hours ago',
      unreadCount: 5,
      isGroup: true,
      online: true,
    },
    {
      id: 5,
      name: 'Mike Johnson',
      avatar: '👨‍🔧',
      lastMessage: 'The server deployment is complete',
      timestamp: '3 hours ago',
      unreadCount: 0,
      isGroup: false,
      online: false,
    },
    {
      id: 6,
      name: 'HR Updates',
      avatar: '📋',
      lastMessage: 'New company policy regarding remote work',
      timestamp: '1 day ago',
      unreadCount: 2,
      isGroup: true,
      online: false,
    },
  ];

  const messages = {
    1: [
      { id: 1, text: 'Good morning team!', sender: 'Nehal Gole', timestamp: '9:00 AM', isOwn: true },
      { id: 2, text: 'Morning everyone!', sender: 'John Doe', timestamp: '9:01 AM', isOwn: false },
      { id: 3, text: 'Ready for the daily standup?', sender: 'Sarah Smith', timestamp: '9:02 AM', isOwn: false },
      { id: 4, text: 'Yes, I have some updates to share', sender: 'Nehal Gole', timestamp: '9:03 AM', isOwn: true },
      { id: 5, text: 'Great work on the project presentation!', sender: 'Mike Johnson', timestamp: '9:05 AM', isOwn: false },
    ],
    2: [
      { id: 1, text: 'Hi Nehal, how are you?', sender: 'John Doe', timestamp: '8:30 AM', isOwn: false },
      { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'Nehal Gole', timestamp: '8:32 AM', isOwn: true },
      { id: 3, text: 'Doing well! Can you review the latest code changes?', sender: 'John Doe', timestamp: '8:35 AM', isOwn: false },
      { id: 4, text: 'Sure, I\'ll take a look at it', sender: 'Nehal Gole', timestamp: '8:40 AM', isOwn: true },
    ],
  };

  const currentMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : [];

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      setMessage('');
    }
  };

  const renderConversationList = () => (
    <View style={styles.conversationsContainer}>
      {conversations.map((conversation, index) => (
        <Animated.View
          key={conversation.id}
          style={[
            styles.conversationItem,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
          ]}
        >
          <TouchableOpacity 
            style={styles.conversationTouchable}
            onPress={() => setSelectedChat(conversation.id)}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{conversation.avatar}</Text>
              {conversation.online && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.timestamp}>{conversation.timestamp}</Text>
              </View>
              <View style={styles.conversationFooter}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );

  const renderChatView = () => {
    const currentConversation = conversations.find(c => c.id === selectedChat);
    
    return (
      <View style={styles.chatContainer}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.chatHeaderContent}>
            <Text style={styles.chatHeaderAvatar}>{currentConversation?.avatar}</Text>
            <View>
              <Text style={styles.chatHeaderName}>{currentConversation?.name}</Text>
              <Text style={styles.chatHeaderStatus}>
                {currentConversation?.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {currentMessages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.isOwn ? styles.ownMessage : styles.otherMessage,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
              ]}
            >
              <View style={[
                styles.messageBubble,
                msg.isOwn ? styles.ownBubble : styles.otherBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.isOwn ? styles.ownMessageText : styles.otherMessageText
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.isOwn ? styles.ownMessageTime : styles.otherMessageTime
                ]}>
                  {msg.timestamp}
                </Text>
              </View>
            </Animated.View>
          ))}
          {isTyping && (
            <View style={[styles.messageContainer, styles.otherMessage]}>
              <View style={[styles.messageBubble, styles.otherBubble]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.sendButtonGradient}>
                <Text style={styles.sendButtonText}>📤</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
          <Text style={styles.title}>Chat</Text>
          <Text style={styles.subtitle}>Stay connected with your team</Text>
        </LinearGradient>
      </Animated.View>

      {selectedChat ? renderChatView() : renderConversationList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 180,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  conversationsContainer: {
    flex: 1,
    padding: 16,
  },
  conversationItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conversationTouchable: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 40,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  chatHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHeaderAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 20,
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: '#2196F3',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#999',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#999',
    opacity: 0.6,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
  },
}); 