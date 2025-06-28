import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width } = Dimensions.get('window');

export default function CalendarScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const meetings = [
    {
      id: 1,
      title: 'Team Standup Meeting',
      description: 'Daily team synchronization and progress updates',
      date: '2024-01-15',
      startTime: '10:00 AM',
      endTime: '10:30 AM',
      type: 'Virtual',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      participants: ['Nehal Gole', 'John Doe', 'Sarah Smith', 'Mike Johnson'],
      status: 'Scheduled',
    },
    {
      id: 2,
      title: 'Client Presentation',
      description: 'Present quarterly results to key client stakeholders',
      date: '2024-01-15',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      type: 'Hybrid',
      meetLink: 'https://meet.google.com/xyz-uvwq-rst',
      participants: ['Nehal Gole', 'Client Team', 'Sales Team'],
      status: 'Scheduled',
    },
    {
      id: 3,
      title: 'Project Review',
      description: 'Review progress on ongoing development projects',
      date: '2024-01-16',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      type: 'In-Person',
      location: 'Conference Room A',
      participants: ['Tech Team', 'Project Managers'],
      status: 'Scheduled',
    },
    {
      id: 4,
      title: 'Board Meeting',
      description: 'Monthly board meeting to discuss company strategy',
      date: '2024-01-17',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      type: 'Virtual',
      meetLink: 'https://meet.google.com/board-meeting-123',
      participants: ['Board Members', 'Executive Team'],
      status: 'Scheduled',
    },
    {
      id: 5,
      title: 'Training Session',
      description: 'New employee onboarding and system training',
      date: '2024-01-18',
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      type: 'Virtual',
      meetLink: 'https://meet.google.com/training-456',
      participants: ['New Employees', 'HR Team'],
      status: 'Scheduled',
    },
  ];

  const todayMeetings = meetings.filter(meeting => 
    meeting.date === selectedDate.toISOString().split('T')[0]
  );

  const upcomingMeetings = meetings.filter(meeting => 
    new Date(meeting.date) > selectedDate
  ).slice(0, 3);

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'Virtual': return '#2196F3';
      case 'In-Person': return '#4CAF50';
      case 'Hybrid': return '#FF9800';
      default: return '#666';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'Virtual': return '📹';
      case 'In-Person': return '🏢';
      case 'Hybrid': return '🔄';
      default: return '📅';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
          <Text style={styles.title}>Calendar & Meetings</Text>
          <Text style={styles.subtitle}>Manage your schedule</Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Today's Date */}
        <Animated.View style={[styles.dateCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.currentDate}>
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <Text style={styles.meetingCount}>
            {todayMeetings.length} meeting{todayMeetings.length !== 1 ? 's' : ''} today
          </Text>
        </Animated.View>

        {/* Add Meeting Button */}
        <Animated.View style={[styles.addButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.addButtonGradient}>
              <Text style={styles.addButtonIcon}>📅</Text>
              <Text style={styles.addButtonText}>Schedule Meeting</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Today's Meetings */}
        {todayMeetings.length > 0 && (
          <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.sectionTitle}>Today's Meetings</Text>
            <View style={styles.meetingsList}>
              {todayMeetings.map((meeting, index) => (
                <Animated.View
                  key={meeting.id}
                  style={[
                    styles.meetingCard,
                    { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
                  ]}
                >
                  <View style={styles.meetingHeader}>
                    <View style={styles.meetingTitleContainer}>
                      <Text style={styles.meetingTitle}>{meeting.title}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: getMeetingTypeColor(meeting.type) }]}>
                        <Text style={styles.typeIcon}>{getMeetingTypeIcon(meeting.type)}</Text>
                        <Text style={styles.typeText}>{meeting.type}</Text>
                      </View>
                    </View>
                    <View style={styles.meetingTime}>
                      <Text style={styles.timeText}>{meeting.startTime}</Text>
                      <Text style={styles.timeText}>{meeting.endTime}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.meetingDescription}>{meeting.description}</Text>
                  
                  <View style={styles.meetingDetails}>
                    <View style={styles.participantsContainer}>
                      <Text style={styles.detailLabel}>Participants:</Text>
                      <Text style={styles.participantsText}>
                        {meeting.participants.slice(0, 2).join(', ')}
                        {meeting.participants.length > 2 && ` +${meeting.participants.length - 2} more`}
                      </Text>
                    </View>
                    {meeting.location && (
                      <View style={styles.locationContainer}>
                        <Text style={styles.detailLabel}>Location:</Text>
                        <Text style={styles.locationText}>{meeting.location}</Text>
                      </View>
                    )}
                  </View>

                  {meeting.meetLink && (
                    <TouchableOpacity style={styles.meetButton}>
                      <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.meetButtonGradient}>
                        <Text style={styles.meetButtonIcon}>🎥</Text>
                        <Text style={styles.meetButtonText}>Join Google Meet</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Upcoming Meetings */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          <View style={styles.upcomingList}>
            {upcomingMeetings.map((meeting, index) => (
              <Animated.View
                key={meeting.id}
                style={[
                  styles.upcomingItem,
                  { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
                ]}
              >
                <View style={styles.upcomingDate}>
                  <Text style={styles.dateText}>{formatDate(meeting.date)}</Text>
                  <Text style={styles.timeText}>{meeting.startTime}</Text>
                </View>
                <View style={styles.upcomingContent}>
                  <Text style={styles.upcomingTitle}>{meeting.title}</Text>
                  <Text style={styles.upcomingDescription}>{meeting.description}</Text>
                  <View style={styles.upcomingType}>
                    <Text style={styles.typeIcon}>{getMeetingTypeIcon(meeting.type)}</Text>
                    <Text style={styles.typeText}>{meeting.type}</Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
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
  content: {
    padding: 20,
  },
  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  currentDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  meetingCount: {
    fontSize: 14,
    color: '#666',
  },
  addButtonContainer: {
    marginBottom: 24,
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButtonIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  meetingsList: {
    gap: 16,
  },
  meetingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  meetingTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeIcon: {
    fontSize: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  meetingTime: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  meetingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  meetingDetails: {
    marginBottom: 16,
  },
  participantsContainer: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  participantsText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  locationContainer: {
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  meetButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  meetButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  meetButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  meetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upcomingList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  upcomingDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  upcomingDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  upcomingType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
}); 