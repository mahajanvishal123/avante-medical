import { Tabs, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppColors } from '../../constants/Theme';

export default function TabLayout() {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Helper to determine if a tab should be highlighted
  const isTabActive = (tabName) => {
    if (tabName === 'home') return pathname === '/home' || pathname === '/';
    if (tabName === 'levels') {
      return ['/levels', '/level-details', '/module-details', '/chapter-details', '/topic-details', '/subtopic-list', '/exam', '/quiz-result'].includes(pathname);
    }
    if (tabName === 'analytics') {
      return ['/analytics', '/level-result', '/certificate'].includes(pathname);
    }
    if (tabName === 'profile') {
      return ['/profile', '/edit-profile', '/change-password'].includes(pathname);
    }
    return false;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.placeholder,
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: AppColors.backgroundWhite,
          borderTopWidth: 1,
          borderTopColor: AppColors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isTabActive('home') ? "home" : "home-outline"} size={26} color={isTabActive('home') ? AppColors.primary : color} />
          ),
          tabBarLabelStyle: {
            color: isTabActive('home') ? AppColors.primary : AppColors.placeholder,
            fontSize: 12,
            fontWeight: '500',
          }
        }}
      />
      <Tabs.Screen
        name="levels"
        options={{
          title: t('tabs.levels'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isTabActive('levels') ? "book" : "book-outline"} size={26} color={isTabActive('levels') ? AppColors.primary : color} />
          ),
          tabBarLabelStyle: {
            color: isTabActive('levels') ? AppColors.primary : AppColors.placeholder,
            fontSize: 12,
            fontWeight: '500',
          }
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t('tabs.analytics'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isTabActive('analytics') ? "stats-chart" : "stats-chart-outline"} size={26} color={isTabActive('analytics') ? AppColors.primary : color} />
          ),
          tabBarLabelStyle: {
            color: isTabActive('analytics') ? AppColors.primary : AppColors.placeholder,
            fontSize: 12,
            fontWeight: '500',
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={isTabActive('profile') ? "person" : "person-outline"} size={26} color={isTabActive('profile') ? AppColors.primary : color} />
          ),
          tabBarLabelStyle: {
            color: isTabActive('profile') ? AppColors.primary : AppColors.placeholder,
            fontSize: 12,
            fontWeight: '500',
          }
        }}
      />
      <Tabs.Screen
        name="level-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="module-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="chapter-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="topic-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="subtopic-list"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="quiz-result"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="certificate"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="level-result"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="change-password"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
