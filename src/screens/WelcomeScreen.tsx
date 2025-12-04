import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '../store/themeStore';
import { FolderIcon } from '../components/ui/FileIcon';

interface WelcomeScreenProps {
  onOpenProject: () => void;
  onNewProject: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenProject, onNewProject }) => {
  const { currentTheme } = useThemeStore();
  
  const recentProjects = [
    { name: 'my-react-app', path: '/home/user/projects/my-react-app', lastOpened: '2 hours ago', type: 'React' },
    { name: 'backend-api', path: '/home/user/projects/backend-api', lastOpened: '1 day ago', type: 'Node.js' },
    { name: 'mobile-app', path: '/home/user/projects/mobile-app', lastOpened: '3 days ago', type: 'React Native' },
  ];
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: currentTheme.editor.background }]}>
        <View style={styles.heroContent}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="brain" size={64} color={currentTheme.editor.keyword} />
          </View>
          <Text style={[styles.title, { color: currentTheme.ui.foreground }]}>
            Brain RTX IDE
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
            Professional Code Editor for Modern Developers
          </Text>
          <View style={styles.versionBadge}>
            <Text style={[styles.versionText, { color: currentTheme.editor.keyword }]}>
              v1.0.0
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentWrapper}>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Get Started
          </Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { 
                backgroundColor: currentTheme.ui.toolWindowBackground,
                borderColor: currentTheme.ui.border,
              }]}
              onPress={onOpenProject}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.keyword + '20' }]}>
                <MaterialCommunityIcons name="folder-open" size={32} color={currentTheme.editor.keyword} />
              </View>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                Open Project
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                Open an existing project from your device
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionCard, { 
                backgroundColor: currentTheme.ui.toolWindowBackground,
                borderColor: currentTheme.ui.border,
              }]}
              onPress={onNewProject}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.string + '20' }]}>
                <MaterialCommunityIcons name="plus-circle" size={32} color={currentTheme.editor.string} />
              </View>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                New Project
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                Create a new project from scratch
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionCard, { 
                backgroundColor: currentTheme.ui.toolWindowBackground,
                borderColor: currentTheme.ui.border,
              }]}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.function + '20' }]}>
                <MaterialCommunityIcons name="git" size={32} color={currentTheme.editor.function} />
              </View>
              <Text style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                Clone Repository
              </Text>
              <Text style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                Clone from Git repository
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Recent Projects */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
              Recent Projects
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: currentTheme.editor.keyword }]}>
                See All →
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
            {recentProjects.map((project, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.recentCard, { 
                  backgroundColor: currentTheme.ui.toolWindowBackground,
                  borderColor: currentTheme.ui.border,
                }]}
              >
                <View style={styles.recentCardHeader}>
                  <FolderIcon foldername={project.name} size={32} />
                  <View style={[styles.projectTypeBadge, { backgroundColor: currentTheme.editor.keyword + '20' }]}>
                    <Text style={[styles.projectTypeText, { color: currentTheme.editor.keyword }]}>
                      {project.type}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.recentName, { color: currentTheme.ui.foreground }]}>
                  {project.name}
                </Text>
                <Text style={[styles.recentPath, { color: currentTheme.ui.foreground, opacity: 0.5 }]} numberOfLines={1}>
                  {project.path}
                </Text>
                <View style={styles.recentFooter}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={currentTheme.ui.foreground} style={{ opacity: 0.5 }} />
                  <Text style={[styles.recentTime, { color: currentTheme.ui.foreground, opacity: 0.5 }]}>
                    {project.lastOpened}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features Highlight */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Features
          </Text>
          <View style={styles.featuresGrid}>
            {[
              { icon: 'palette', title: '17+ Themes', desc: 'Professional color schemes' },
              { icon: 'source-branch', title: 'Git Integration', desc: 'Version control built-in' },
              { icon: 'code-tags', title: 'Syntax Highlighting', desc: 'Multiple languages' },
              { icon: 'file-tree', title: 'Project Explorer', desc: 'Easy navigation' },
            ].map((feature, index) => (
              <View
                key={index}
                style={[styles.featureCard, { 
                  backgroundColor: currentTheme.ui.toolWindowBackground,
                  borderColor: currentTheme.ui.border,
                }]}
              >
                <MaterialCommunityIcons name={feature.icon as any} size={24} color={currentTheme.editor.keyword} />
                <Text style={[styles.featureTitle, { color: currentTheme.ui.foreground }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDesc, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                  {feature.desc}
                </Text>
              </View>
            ))}
          </View>
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
  heroSection: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  versionBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 100, 0.3)',
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  contentWrapper: {
    flex: 1,
    padding: 24,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    minWidth: width > 600 ? 200 : '100%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 13,
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentList: {
    flexDirection: 'row',
  },
  recentCard: {
    width: 240,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  recentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  projectTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  recentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recentPath: {
    fontSize: 12,
    marginBottom: 8,
  },
  recentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentTime: {
    fontSize: 11,
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: width > 600 ? 150 : '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 11,
    textAlign: 'center',
  },
});
