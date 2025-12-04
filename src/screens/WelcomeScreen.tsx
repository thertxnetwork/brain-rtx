import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useThemeStore } from '../store/themeStore';

interface WelcomeScreenProps {
  onOpenProject: () => void;
  onNewProject: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenProject, onNewProject }) => {
  const { currentTheme } = useThemeStore();
  
  const recentProjects = [
    { name: 'my-react-app', path: '/home/user/projects/my-react-app', lastOpened: '2 hours ago' },
    { name: 'backend-api', path: '/home/user/projects/backend-api', lastOpened: '1 day ago' },
    { name: 'mobile-app', path: '/home/user/projects/mobile-app', lastOpened: '3 days ago' },
  ];
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: currentTheme.ui.foreground }]}>
          Brain RTX IDE
        </Text>
        <Text style={[styles.subtitle, { color: currentTheme.ui.foreground }]}>
          Professional Code Editor for Android
        </Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.leftPanel}>
          <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Quick Actions
          </Text>
          
          <TouchableOpacity
            style={[styles.actionButton, { 
              backgroundColor: currentTheme.ui.buttonBackground,
              borderColor: currentTheme.ui.border,
            }]}
            onPress={onOpenProject}
          >
            <Text style={styles.actionIcon}>📂</Text>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.buttonForeground }]}>
                Open Project
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.buttonForeground, opacity: 0.7 }]}>
                Open an existing project
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { 
              backgroundColor: currentTheme.ui.buttonBackground,
              borderColor: currentTheme.ui.border,
            }]}
            onPress={onNewProject}
          >
            <Text style={styles.actionIcon}>✨</Text>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.buttonForeground }]}>
                New Project
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.buttonForeground, opacity: 0.7 }]}>
                Create a new project
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { 
              backgroundColor: currentTheme.ui.buttonBackground,
              borderColor: currentTheme.ui.border,
            }]}
          >
            <Text style={styles.actionIcon}>🌿</Text>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.buttonForeground }]}>
                Clone from Git
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.buttonForeground, opacity: 0.7 }]}>
                Clone a repository
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.rightPanel}>
          <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Recent Projects
          </Text>
          
          <ScrollView style={styles.recentList}>
            {recentProjects.map((project, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.recentItem, { 
                  backgroundColor: currentTheme.ui.toolWindowBackground,
                  borderColor: currentTheme.ui.border,
                }]}
              >
                <View style={styles.recentIconContainer}>
                  <Text style={styles.recentIcon}>📁</Text>
                </View>
                <View style={styles.recentInfo}>
                  <Text style={[styles.recentName, { color: currentTheme.ui.foreground }]}>
                    {project.name}
                  </Text>
                  <Text style={[styles.recentPath, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                    {project.path}
                  </Text>
                  <Text style={[styles.recentTime, { color: currentTheme.ui.foreground, opacity: 0.5 }]}>
                    {project.lastOpened}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    flexDirection: width > 600 ? 'row' : 'column',
    padding: 24,
  },
  leftPanel: {
    flex: 1,
    paddingRight: width > 600 ? 12 : 0,
    marginBottom: width > 600 ? 0 : 24,
  },
  rightPanel: {
    flex: 1,
    paddingLeft: width > 600 ? 12 : 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
  },
  recentList: {
    flex: 1,
  },
  recentItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  recentIconContainer: {
    marginRight: 12,
  },
  recentIcon: {
    fontSize: 24,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  recentPath: {
    fontSize: 12,
    marginBottom: 2,
  },
  recentTime: {
    fontSize: 11,
  },
});
