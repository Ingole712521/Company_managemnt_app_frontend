import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width, height } = Dimensions.get('window');

export default function EmailScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [composeMode, setComposeMode] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('inbox');

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

  const emails = [
    {
      id: 1,
      subject: 'Project Update - Q4 Results',
      sender: 'john.doe@company.com',
      senderName: 'John Doe',
      preview: 'Hi team, I wanted to share the latest updates on our Q4 project results. We have achieved...',
      timestamp: '2 min ago',
      isRead: false,
      isStarred: true,
      hasAttachment: true,
      folder: 'inbox',
    },
    {
      id: 2,
      subject: 'Meeting Schedule for Next Week',
      sender: 'sarah.smith@company.com',
      senderName: 'Sarah Smith',
      preview: 'Please find attached the meeting schedule for next week. We have several important...',
      timestamp: '15 min ago',
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      folder: 'inbox',
    },
    {
      id: 3,
      subject: 'New Employee Onboarding',
      sender: 'hr@company.com',
      senderName: 'HR Department',
      preview: 'Welcome to the team! This email contains important information about your onboarding process...',
      timestamp: '1 hour ago',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      folder: 'inbox',
    },
    {
      id: 4,
      subject: 'Client Presentation Feedback',
      sender: 'client@external.com',
      senderName: 'Client Feedback',
      preview: 'Thank you for the excellent presentation yesterday. We were very impressed with...',
      timestamp: '2 hours ago',
      isRead: true,
      isStarred: true,
      hasAttachment: false,
      folder: 'inbox',
    },
    {
      id: 5,
      subject: 'System Maintenance Notice',
      sender: 'it@company.com',
      senderName: 'IT Department',
      preview: 'Scheduled maintenance will be performed this weekend. Please save your work...',
      timestamp: '1 day ago',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      folder: 'inbox',
    },
    {
      id: 6,
      subject: 'Draft: Quarterly Report',
      sender: 'nehal.gole@company.com',
      senderName: 'Nehal Gole',
      preview: 'Draft of the quarterly report for review. Please let me know if you need any changes...',
      timestamp: '2 days ago',
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      folder: 'drafts',
    },
  ];

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 5, icon: '📥' },
    { id: 'sent', name: 'Sent', count: 12, icon: '📤' },
    { id: 'drafts', name: 'Drafts', count: 2, icon: '📝' },
    { id: 'spam', name: 'Spam', count: 0, icon: '🚫' },
    { id: 'trash', name: 'Trash', count: 3, icon: '🗑️' },
  ];

  const currentEmails = emails.filter(email => email.folder === currentFolder);

  const renderEmailList = () => (
    <View style={styles.emailListContainer}>
      {/* Folder Navigation */}
      <Animated.View style={[styles.folderNav, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {folders.map((folder) => (
            <TouchableOpacity
              key={folder.id}
              style={[
                styles.folderTab,
                currentFolder === folder.id && styles.activeFolderTab
              ]}
              onPress={() => setCurrentFolder(folder.id)}
            >
              <Text style={styles.folderIcon}>{folder.icon}</Text>
              <Text style={[
                styles.folderName,
                currentFolder === folder.id && styles.activeFolderName
              ]}>
                {folder.name}
              </Text>
              {folder.count > 0 && (
                <View style={styles.folderCount}>
                  <Text style={styles.folderCountText}>{folder.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Email List */}
      <ScrollView style={styles.emailsList} showsVerticalScrollIndicator={false}>
        {currentEmails.map((email, index) => (
          <Animated.View
            key={email.id}
            style={[
              styles.emailItem,
              !email.isRead && styles.unreadEmail,
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
            ]}
          >
            <TouchableOpacity 
              style={styles.emailTouchable}
              onPress={() => setSelectedEmail(email.id)}
            >
              <View style={styles.emailHeader}>
                <View style={styles.emailSender}>
                  <Text style={styles.senderName}>{email.senderName}</Text>
                  <Text style={styles.senderEmail}>{email.sender}</Text>
                </View>
                <View style={styles.emailMeta}>
                  <Text style={styles.timestamp}>{email.timestamp}</Text>
                  {email.isStarred && <Text style={styles.starIcon}>⭐</Text>}
                </View>
              </View>
              
              <Text style={[
                styles.emailSubject,
                !email.isRead && styles.unreadSubject
              ]}>
                {email.subject}
              </Text>
              
              <Text style={styles.emailPreview} numberOfLines={2}>
                {email.preview}
              </Text>
              
              <View style={styles.emailFooter}>
                {email.hasAttachment && (
                  <View style={styles.attachmentIndicator}>
                    <Text style={styles.attachmentIcon}>📎</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmailView = () => {
    const currentEmail = emails.find(e => e.id === selectedEmail);
    
    return (
      <View style={styles.emailViewContainer}>
        {/* Email Header */}
        <View style={styles.emailViewHeader}>
          <TouchableOpacity onPress={() => setSelectedEmail(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.emailViewActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>↻</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📧</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email Content */}
        <ScrollView style={styles.emailContent} showsVerticalScrollIndicator={false}>
          <View style={styles.emailDetails}>
            <Text style={styles.emailViewSubject}>{currentEmail?.subject}</Text>
            <View style={styles.emailViewSender}>
              <Text style={styles.emailViewSenderName}>{currentEmail?.senderName}</Text>
              <Text style={styles.emailViewSenderEmail}>{currentEmail?.sender}</Text>
            </View>
            <Text style={styles.emailViewTimestamp}>{currentEmail?.timestamp}</Text>
          </View>
          
          <View style={styles.emailBody}>
            <Text style={styles.emailBodyText}>
              {currentEmail?.preview}
              {'\n\n'}
              Dear Nehal,{'\n\n'}
              I hope this email finds you well. I wanted to share some important updates regarding our ongoing projects and upcoming deadlines.{'\n\n'}
              Please review the attached documents and let me know if you have any questions or concerns.{'\n\n'}
              Best regards,{'\n'}
              {currentEmail?.senderName}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderComposeView = () => (
    <View style={styles.composeContainer}>
      <View style={styles.composeHeader}>
        <TouchableOpacity onPress={() => setComposeMode(false)} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.composeTitle}>New Message</Text>
        <TouchableOpacity style={styles.sendButton}>
          <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.sendButtonGradient}>
            <Text style={styles.sendButtonText}>📤</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.composeContent} showsVerticalScrollIndicator={false}>
        <View style={styles.composeField}>
          <Text style={styles.fieldLabel}>To:</Text>
          <TextInput style={styles.composeInput} placeholder="Recipient email" />
        </View>
        <View style={styles.composeField}>
          <Text style={styles.fieldLabel}>Subject:</Text>
          <TextInput style={styles.composeInput} placeholder="Subject" />
        </View>
        <View style={styles.composeField}>
          <Text style={styles.fieldLabel}>Message:</Text>
          <TextInput 
            style={[styles.composeInput, styles.messageInput]} 
            placeholder="Type your message here..."
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
          <Text style={styles.title}>Email</Text>
          <Text style={styles.subtitle}>Manage your communications</Text>
        </LinearGradient>
      </Animated.View>

      {composeMode ? (
        renderComposeView()
      ) : selectedEmail ? (
        renderEmailView()
      ) : (
        <>
          {renderEmailList()}
          
          {/* Compose Button */}
          <Animated.View style={[styles.composeButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={styles.composeButton} onPress={() => setComposeMode(true)}>
              <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.composeButtonGradient}>
                <Text style={styles.composeButtonIcon}>✏️</Text>
                <Text style={styles.composeButtonText}>Compose</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
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
  emailListContainer: {
    flex: 1,
  },
  folderNav: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  folderTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    gap: 6,
  },
  activeFolderTab: {
    backgroundColor: '#e3f2fd',
  },
  folderIcon: {
    fontSize: 16,
  },
  folderName: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFolderName: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  folderCount: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderCountText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  emailsList: {
    flex: 1,
    padding: 16,
  },
  emailItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadEmail: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  emailTouchable: {
    padding: 16,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emailSender: {
    flex: 1,
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  senderEmail: {
    fontSize: 12,
    color: '#666',
  },
  emailMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  starIcon: {
    fontSize: 12,
  },
  emailSubject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  unreadSubject: {
    color: '#333',
    fontWeight: 'bold',
  },
  emailPreview: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  emailFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  attachmentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attachmentIcon: {
    fontSize: 12,
  },
  emailViewContainer: {
    flex: 1,
  },
  emailViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  emailViewActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  actionIcon: {
    fontSize: 18,
    color: '#333',
  },
  emailContent: {
    flex: 1,
    padding: 16,
  },
  emailDetails: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  emailViewSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emailViewSender: {
    marginBottom: 8,
  },
  emailViewSenderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emailViewSenderEmail: {
    fontSize: 12,
    color: '#666',
  },
  emailViewTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  emailBody: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  emailBodyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  composeContainer: {
    flex: 1,
  },
  composeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  composeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  composeContent: {
    flex: 1,
    padding: 16,
  },
  composeField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  composeInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  messageInput: {
    height: 200,
  },
  composeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  composeButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  composeButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  composeButtonIcon: {
    fontSize: 18,
  },
  composeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 