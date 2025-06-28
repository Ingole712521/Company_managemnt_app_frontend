import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const userRole = 'CEO';
  const userName = 'Nehal Gole';

  const stats = [
    { title: 'Total Employees', value: '24', color: '#4CAF50', icon: '👥' },
    { title: 'Active Tasks', value: '12', color: '#2196F3', icon: '📋' },
    { title: 'Meetings Today', value: '3', color: '#FF9800', icon: '📅' },
    { title: 'Pending Leaves', value: '2', color: '#F44336', icon: '🏖️' },
  ];

  const recentActivities = [
    { id: 1, action: 'Task assigned', detail: 'Review Q4 reports', time: '2 hours ago', type: 'task' },
    { id: 2, action: 'Meeting scheduled', detail: 'Team standup at 10 AM', time: '4 hours ago', type: 'meeting' },
    { id: 3, action: 'Leave approved', detail: 'John Doe - Annual leave', time: '1 day ago', type: 'leave' },
    { id: 4, action: 'Document uploaded', detail: 'Company policy v2.1', time: '2 days ago', type: 'document' },
  ];

  const quickActions = [
    { title: 'Schedule Meeting', icon: '📅', color: '#2196F3' },
    { title: 'Assign Task', icon: '📋', color: '#4CAF50' },
    { title: 'Send Announcement', icon: '📢', color: '#FF9800' },
    { title: 'View Reports', icon: '📊', color: '#9C27B0' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image 
            source={logo} 
            style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]} 
            resizeMode="contain" 
          />
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.roleText}>{userRole}</Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Stats Cards */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.statCard,
                  { backgroundColor: stat.color + '20', borderLeftColor: stat.color },
                  { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}
              >
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: action.color + '20' }]}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Recent Activities */}
        <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity, index) => (
              <Animated.View
                key={activity.id}
                style={[
                  styles.activityItem,
                  { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.type) }]}>
                  <Text style={styles.activityIconText}>{getActivityIcon(activity.type)}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityDetail}>{activity.detail}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'task': return '#4CAF50';
    case 'meeting': return '#2196F3';
    case 'leave': return '#FF9800';
    case 'document': return '#9C27B0';
    default: return '#666';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'task': return '📋';
    case 'meeting': return '📅';
    case 'leave': return '🏖️';
    case 'document': return '📄';
    default: return '📌';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 200,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  content: {
    padding: 20,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  activitiesList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
}); 