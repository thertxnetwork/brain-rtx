import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
          <Text variant="displaySmall" style={[styles.title, { color: currentTheme.ui.foreground }]}>
            Brain RTX IDE
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
            Professional Code Editor for Modern Developers
          </Text>
          <Chip icon="information" style={styles.versionBadge}>
            v1.0.0
          </Chip>
        </View>
      </View>
      
      <View style={styles.contentWrapper}>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text variant="headlineSmall" style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Get Started
          </Text>
          
          <View style={styles.actionsGrid}>
            <Card style={styles.actionCard} mode="outlined" onPress={onOpenProject}>
              <Card.Content style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.keyword + '20' }]}>
                  <MaterialCommunityIcons name="folder-open" size={32} color={currentTheme.editor.keyword} />
                </View>
                <Text variant="titleMedium" style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                  Open Project
                </Text>
                <Text variant="bodySmall" style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                  Open an existing project from your device
                </Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.actionCard} mode="outlined" onPress={onNewProject}>
              <Card.Content style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.string + '20' }]}>
                  <MaterialCommunityIcons name="plus-circle" size={32} color={currentTheme.editor.string} />
                </View>
                <Text variant="titleMedium" style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                  New Project
                </Text>
                <Text variant="bodySmall" style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                  Create a new project from scratch
                </Text>
              </Card.Content>
            </Card>
            
            <Card style={styles.actionCard} mode="outlined">
              <Card.Content style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: currentTheme.editor.function + '20' }]}>
                  <MaterialCommunityIcons name="git" size={32} color={currentTheme.editor.function} />
                </View>
                <Text variant="titleMedium" style={[styles.actionTitle, { color: currentTheme.ui.foreground }]}>
                  Clone Repository
                </Text>
                <Text variant="bodySmall" style={[styles.actionDescription, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                  Clone from Git repository
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>
        
        {/* Recent Projects */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text variant="headlineSmall" style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
              Recent Projects
            </Text>
            <Button mode="text">See All</Button>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
            {recentProjects.map((project, index) => (
              <Card key={index} style={styles.recentCard} mode="outlined">
                <Card.Content>
                  <View style={styles.recentCardHeader}>
                    <FolderIcon foldername={project.name} size={32} />
                    <Chip mode="flat" compact>
                      {project.type}
                    </Chip>
                  </View>
                  <Text variant="titleMedium" style={[styles.recentName, { color: currentTheme.ui.foreground }]}>
                    {project.name}
                  </Text>
                  <Text variant="bodySmall" style={[styles.recentPath, { color: currentTheme.ui.foreground, opacity: 0.5 }]} numberOfLines={1}>
                    {project.path}
                  </Text>
                  <View style={styles.recentFooter}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={currentTheme.ui.foreground} style={{ opacity: 0.5 }} />
                    <Text variant="bodySmall" style={[styles.recentTime, { color: currentTheme.ui.foreground, opacity: 0.5 }]}>
                      {project.lastOpened}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Features Highlight */}
        <View style={styles.featuresSection}>
          <Text variant="headlineSmall" style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
            Features
          </Text>
          <View style={styles.featuresGrid}>
            {[
              { icon: 'palette', title: '17+ Themes', desc: 'Professional color schemes' },
              { icon: 'source-branch', title: 'Git Integration', desc: 'Version control built-in' },
              { icon: 'code-tags', title: 'Syntax Highlighting', desc: 'Multiple languages' },
              { icon: 'file-tree', title: 'Project Explorer', desc: 'Easy navigation' },
            ].map((feature, index) => (
              <Card key={index} style={styles.featureCard} mode="outlined">
                <Card.Content style={styles.featureCardContent}>
                  <MaterialCommunityIcons name={feature.icon as any} size={24} color={currentTheme.editor.keyword} />
                  <Text variant="titleSmall" style={[styles.featureTitle, { color: currentTheme.ui.foreground }]}>
                    {feature.title}
                  </Text>
                  <Text variant="bodySmall" style={[styles.featureDesc, { color: currentTheme.ui.foreground, opacity: 0.6 }]}>
                    {feature.desc}
                  </Text>
                </Card.Content>
              </Card>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  versionBadge: {
    marginTop: 8,
  },
  contentWrapper: {
    flex: 1,
    padding: 24,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
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
  },
  actionCardContent: {
    alignItems: 'center',
    padding: 8,
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
    marginBottom: 6,
    textAlign: 'center',
  },
  actionDescription: {
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
  recentList: {
    flexDirection: 'row',
  },
  recentCard: {
    width: 240,
    marginRight: 12,
  },
  recentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recentName: {
    marginBottom: 4,
  },
  recentPath: {
    marginBottom: 8,
  },
  recentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentTime: {},
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
  },
  featureCardContent: {
    alignItems: 'center',
    padding: 8,
  },
  featureTitle: {
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    textAlign: 'center',
  },
});
