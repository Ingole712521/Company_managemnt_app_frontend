import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require('../../assets/images/splash-icon.png');
const { width } = Dimensions.get('window');

export default function TasksScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const tasks = [
    {
      id: 1,
      title: 'Review Q4 Financial Reports',
      description: 'Analyze and prepare quarterly financial statements for board meeting',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Nehal Gole',
      dueDate: '2024-01-20',
      progress: 75,
    },
    {
      id: 2,
      title: 'Update Company Website',
      description: 'Implement new design and content updates for corporate website',
      priority: 'Medium',
      status: 'Pending',
      assignee: 'John Doe',
      dueDate: '2024-01-25',
      progress: 0,
    },
    {
      id: 3,
      title: 'Client Meeting Preparation',
      description: 'Prepare presentation materials for upcoming client meeting',
      priority: 'High',
      status: 'Completed',
      assignee: 'Sarah Smith',
      dueDate: '2024-01-18',
      progress: 100,
    },
    {
      id: 4,
      title: 'Team Building Event',
      description: 'Organize quarterly team building activity for all departments',
      priority: 'Low',
      status: 'In Progress',
      assignee: 'Mike Johnson',
      dueDate: '2024-01-30',
      progress: 40,
    },
    {
      id: 5,
      title: 'Database Migration',
      description: 'Migrate legacy database to new cloud infrastructure',
      priority: 'High',
      status: 'Pending',
      assignee: 'Tech Team',
      dueDate: '2024-02-05',
      progress: 0,
    },
  ];

  const filters = [
    { key: 'all', label: 'All', count: tasks.length },
    { key: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'Pending').length },
    { key: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
    { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'Completed').length },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#2196F3';
      case 'Pending': return '#FF9800';
      default: return '#666';
    }
  };

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => {
        if (selectedFilter === 'pending') return task.status === 'Pending';
        if (selectedFilter === 'in-progress') return task.status === 'In Progress';
        if (selectedFilter === 'completed') return task.status === 'Completed';
        return true;
      });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0a7ea4', '#1e3c72']} style={styles.gradient}>
          <Animated.Image source={logo} style={[styles.logo, { opacity: fadeAnim }]} resizeMode="contain" />
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.subtitle}>Manage your projects</Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.content}>
        {/* Task Summary */}
        <Animated.View style={[styles.summaryCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{tasks.length}</Text>
            <Text style={styles.summaryLabel}>Total Tasks</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{tasks.filter(t => t.status === 'Completed').length}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{tasks.filter(t => t.status === 'In Progress').length}</Text>
            <Text style={styles.summaryLabel}>In Progress</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{tasks.filter(t => t.status === 'Pending').length}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View style={[styles.filterContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.key && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive
                ]}>
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Add Task Button */}
        <Animated.View style={[styles.addButtonContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.addButtonGradient}>
              <Text style={styles.addButtonIcon}>+</Text>
              <Text style={styles.addButtonText}>Add New Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Tasks List */}
        <Animated.View style={[styles.tasksContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {filteredTasks.map((task, index) => (
            <Animated.View
              key={task.id}
              style={[
                styles.taskCard,
                { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
              ]}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskTitleContainer}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                  <Text style={styles.statusText}>{task.status}</Text>
                </View>
              </View>
              
              <Text style={styles.taskDescription}>{task.description}</Text>
              
              <View style={styles.taskDetails}>
                <View style={styles.taskDetail}>
                  <Text style={styles.detailLabel}>Assignee:</Text>
                  <Text style={styles.detailValue}>{task.assignee}</Text>
                </View>
                <View style={styles.taskDetail}>
                  <Text style={styles.detailLabel}>Due:</Text>
                  <Text style={styles.detailValue}>{new Date(task.dueDate).toLocaleDateString()}</Text>
                </View>
              </View>

              {task.status !== 'Completed' && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${task.progress}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{task.progress}%</Text>
                </View>
              )}
            </Animated.View>
          ))}
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
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
  filterContainer: {
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterTabActive: {
    backgroundColor: '#0a7ea4',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  addButtonContainer: {
    marginBottom: 20,
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
    color: '#fff',
    marginRight: 8,
    fontWeight: 'bold',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    gap: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    minWidth: 30,
  },
}); 