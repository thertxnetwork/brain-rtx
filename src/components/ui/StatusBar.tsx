import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

export const StatusBar: React.FC = () => {
  const { currentTheme } = useThemeStore();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.statusBarBackground }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.leftSection}>
          <StatusItem 
            text="1:1" 
            theme={currentTheme}
            icon="📍"
          />
          <StatusItem 
            text="UTF-8" 
            theme={currentTheme}
          />
          <StatusItem 
            text="LF" 
            theme={currentTheme}
          />
          <StatusItem 
            text="JavaScript" 
            theme={currentTheme}
          />
        </View>
        
        <View style={styles.rightSection}>
          <StatusItem 
            text="main" 
            theme={currentTheme}
            icon="🌿"
          />
          <StatusItem 
            text="✓ All files saved" 
            theme={currentTheme}
          />
        </View>
      </ScrollView>
    </View>
  );
};

interface StatusItemProps {
  text: string;
  icon?: string;
  theme: any;
}

const StatusItem: React.FC<StatusItemProps> = ({ text, icon, theme }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={[styles.itemText, { color: theme.ui.statusBarForeground }]}>
      {icon && `${icon} `}{text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  item: {
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 11,
  },
});
