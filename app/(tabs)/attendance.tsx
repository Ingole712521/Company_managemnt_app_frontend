import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width } = Dimensions.get('window');

export default function AttendanceScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [fadeAnim, slideAnim]);

  const startPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCheckIn = () => {
    startPulseAnimation();
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    startPulseAnimation();
    setIsCheckedIn(false);
  };

  const attendanceHistory = [
    { date: '2024-01-15', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Present', hours: 9.25 },
    { date: '2024-01-14', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Present', hours: 9.0 },
    { date: '2024-01-13', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Present', hours: 8.5 },
    { date: '2024-01-12', checkIn: '08:30 AM', checkOut: '05:30 PM', status: 'Present', hours: 9.0 },
    { date: '2024-01-11', checkIn: '09:00 AM', checkOut: '06:15 PM', status: 'Present', hours: 9.25 },
    { date: '2024-01-10', checkIn: '08:15 AM', checkOut: '05:45 PM', status: 'Present', hours: 9.5 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return '#4CAF50';
      case 'Late': return '#FF9800';
      case 'Absent': return '#F44336';
      case 'Half Day': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.subtitle}>Track your work hours</Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Current Time and Status */}
        <Animated.View style={[styles.timeCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.currentTime}>
            {currentTime.toLocaleTimeString('en-US', { 
              hour12: true, 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </Text>
          <Text style={styles.currentDate}>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <View style={[styles.statusIndicator, { backgroundColor: isCheckedIn ? '#4CAF50' : '#F44336' }]}>
            <Text style={styles.statusText}>{isCheckedIn ? 'Checked In' : 'Checked Out'}</Text>
          </View>
        </Animated.View>

        {/* Check In/Out Buttons */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {!isCheckedIn ? (
            <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.buttonGradient}>
                  <Text style={styles.buttonIcon}>🟢</Text>
                  <Text style={styles.buttonText}>Check In</Text>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <LinearGradient colors={['#F44336', '#d32f2f']} style={styles.buttonGradient}>
                  <Text style={styles.buttonIcon}>🔴</Text>
                  <Text style={styles.buttonText}>Check Out</Text>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Weekly Summary */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>This Week's Summary</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>5</Text>
              <Text style={styles.summaryLabel}>Days Present</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>45.5</Text>
              <Text style={styles.summaryLabel}>Total Hours</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>9.1</Text>
              <Text style={styles.summaryLabel}>Avg Hours/Day</Text>
            </View>
          </View>
        </Animated.View>

        {/* Attendance History */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>Recent Attendance</Text>
          <View style={styles.historyList}>
            {attendanceHistory.map((record, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.historyItem,
                  { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
                ]}
              >
                <View style={styles.historyDate}>
                  <Text style={styles.dateText}>{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
                  <Text style={styles.dayText}>{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                </View>
                <View style={styles.historyTimes}>
                  <Text style={styles.timeText}>In: {record.checkIn}</Text>
                  <Text style={styles.timeText}>Out: {record.checkOut}</Text>
                </View>
                <View style={styles.historyHours}>
                  <Text style={styles.hoursText}>{record.hours}h</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(record.status) }]}>
                  <Text style={styles.statusBadgeText}>{record.status}</Text>
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
  timeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
  },
  currentDate: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  statusIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  checkInButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  checkOutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  historyList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  historyTimes: {
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  historyHours: {
    marginRight: 12,
  },
  hoursText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
}); 