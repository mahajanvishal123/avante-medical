import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const { width } = Dimensions.get('window');

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'HI' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'PA' },
];

const SectionHeader = ({ title, onLinkPress, linkText }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onLinkPress && (
        <TouchableOpacity onPress={onLinkPress}>
          <Text style={styles.sectionLink}>{linkText || t('home.view_all')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  const currentLanguage = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangModalVisible(false);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Premium Header - Reverted exactly to original matching the Photo */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{t('tabs.home')}</Text>
          
          <View style={styles.headerRight}>
            {/* Language Pill Selector */}
            <TouchableOpacity 
              style={styles.languageSelector} 
              onPress={() => setIsLangModalVisible(true)}
            >
              <Ionicons name="globe-outline" size={18} color="#333" />
              <Text style={styles.languageText}>{currentLanguage.nativeLabel}</Text>
              <Ionicons name="chevron-down" size={14} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>{t('home.welcome_back', { name: 'Dr. Sarah' })}</Text>
          <Text style={styles.welcomeSub}>{t('home.courses_to_finish', { count: 3 })}</Text>
          
          <View style={styles.successBanner}>
            <Text style={styles.successText}>{t('home.success_signup')}</Text>
          </View>
        </View>

        {/* Level 1 Card */}
        <View style={styles.curriculumCard}>
          <View style={styles.curriculumHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.curriculumLevel} numberOfLines={1} adjustsFontSizeToFit>{t('home.curriculum_level')}</Text>
              <Text style={styles.curriculumTitle} numberOfLines={2} adjustsFontSizeToFit>{t('home.curriculum_title')}</Text>
            </View>
            <View style={styles.listIconContainer}>
               <Ionicons name="list" size={24} color="#fff" />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>{t('home.last_topic')}</Text>
              <Text style={styles.progressPercentage}>65%</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBar, { width: '65%' }]} />
            </View>
          </View>

          <TouchableOpacity style={styles.resumeButton}>
            <Text style={styles.resumeButtonText}>{t('home.resume_lesson')}</Text>
            <Ionicons name="play-circle" size={24} color="#24458B" />
          </TouchableOpacity>
        </View>

        {/* Learning Path */}
        <SectionHeader title={t('home.learning_path')} linkText={t('home.view_levels')} onLinkPress={() => {}} />
        <View style={styles.learningPathRow}>
          <View style={[styles.pathCard, styles.pathCardActive]}>
            <View style={styles.pathIconCircle}>
              <Ionicons name="checkmark-circle" size={32} color="#17B8A6" />
            </View>
            <Text style={styles.pathLevel}>{t('home.level_1')}</Text>
            <Text style={styles.pathStatusCompleted}>{t('home.completed')}</Text>
          </View>
          <View style={styles.pathCard}>
            <View style={styles.pathIconCircle}>
              <Ionicons name="lock-closed" size={32} color="#DDD" />
            </View>
            <Text style={styles.pathLevel}>{t('home.level_2')}</Text>
            <Text style={styles.pathStatusLocked}>{t('home.locked')}</Text>
          </View>
        </View>

        {/* Assigned Courses */}
        <SectionHeader title={t('home.assigned_courses')} onLinkPress={() => {}} />
        <View style={styles.courseItem}>
          <View style={styles.courseIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color="#24458B" />
          </View>
          <View style={styles.courseDetails}>
            <Text style={styles.courseName}>{t('home.course_pacemaker')}</Text>
            <Text style={styles.courseDue}>{t('home.due_4_days')}</Text>
            <View style={styles.miniProgressTrack}>
               <View style={[styles.miniProgressBar, { width: '40%', backgroundColor: '#FFD700' }]} />
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#FFF5E6' }]}>
            <Text style={[styles.statusText, { color: '#FFA500' }]}>{t('home.pending')}</Text>
          </View>
        </View>

        <View style={styles.courseItem}>
          <View style={styles.courseIconContainer}>
            <Ionicons name="flask" size={24} color="#24458B" />
          </View>
          <View style={styles.courseDetails}>
            <Text style={styles.courseName}>{t('home.course_terminology')}</Text>
            <Text style={styles.courseDue}>{t('home.due_12_days')}</Text>
            <View style={styles.miniProgressTrack}>
               <View style={[styles.miniProgressBar, { width: '85%', backgroundColor: '#17B8A6' }]} />
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#E6F9F4' }]}>
            <Text style={[styles.statusText, { color: '#17B8A6' }]}>{t('home.started')}</Text>
          </View>
        </View>

        {/* Analytics Section */}
        <SectionHeader title={t('home.analytics')} />
        <View style={styles.analyticsRow}>
          <View style={styles.analyticsCard}>
            <View style={styles.circleChart}>
               <Text style={styles.circlePercentage}>75%</Text>
            </View>
            <Text style={styles.analyticsLabel}>{t('home.avg_score')}</Text>
          </View>
          <View style={styles.analyticsCard}>
            <View style={styles.barChartRow}>
              {[2, 4, 3, 6, 5, 3].map((val, i) => (
                <View key={i} style={[styles.bar, { flex: 1, height: val * 8, marginHorizontal: 1 }]} />
              ))}
            </View>
            <Text style={styles.analyticsLabel}>{t('home.time_spent')}</Text>
          </View>
        </View>

        {/* Latest Updates */}
        <SectionHeader title={t('home.latest_updates')} />
        <View style={styles.updateItem}>
          <View style={[styles.updateIcon, { backgroundColor: '#E6F0FF' }]}>
            <Ionicons name="add" size={24} color="#24458B" />
          </View>
          <View style={styles.updateDetails}>
            <Text style={styles.updateText}>{t('home.new_course_crispr')}</Text>
            <Text style={styles.updateTime}>{t('home.two_hours_ago')}</Text>
          </View>
        </View>
        <View style={styles.updateItem}>
          <View style={[styles.updateIcon, { backgroundColor: '#E6F9F4' }]}>
            <Ionicons name="ribbon-outline" size={24} color="#17B8A6" />
          </View>
          <View style={styles.updateDetails}>
            <Text style={styles.updateText}>{t('home.cert_earned')}</Text>
            <Text style={styles.updateTime}>{t('home.yesterday')}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={isLangModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLangModalVisible(false)}
      >
        <TouchableOpacity 
          style={modalStyles.overlay}
          activeOpacity={1}
          onPress={() => setIsLangModalVisible(false)}
        >
          <View style={modalStyles.content}>
            <Text style={modalStyles.title}>{t('common.select_language')}</Text>
            <FlatList
              data={[
                { code: 'en', label: 'English', native: 'English' },
                { code: 'hi', label: 'Hindi', native: 'हिंदी' },
                { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
              ]}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    modalStyles.item,
                    i18n.language === item.code && modalStyles.itemActive
                  ]}
                  onPress={() => changeLanguage(item.code)}
                >
                  <Text style={[
                    modalStyles.itemText,
                    i18n.language === item.code && modalStyles.itemTextActive
                  ]}>
                    {item.native} ({item.label})
                  </Text>
                  {i18n.language === item.code && (
                    <Text style={modalStyles.checkIcon}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemActive: {
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
    color: '#444',
  },
  itemTextActive: {
    color: '#24458B',
    fontWeight: '600',
  },
  checkIcon: {
    fontSize: 18,
    color: '#24458B',
    fontWeight: '700',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#24458B',
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 5,
    color: '#333',
  },
  notificationIcon: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    marginTop: 25,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  welcomeSub: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  successBanner: {
    backgroundColor: '#E6F9F4',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  successText: {
    color: '#17B8A6',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  curriculumCard: {
    width: '100%',
    backgroundColor: '#24458B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#24458B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  curriculumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  curriculumLevel: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4,
    flexShrink: 1,
  },
  curriculumTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 26,
    flexShrink: 1,
  },
  listIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 8,
    borderRadius: 12,
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 25,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressText: {
    color: '#FFF',
    fontSize: 13,
    opacity: 0.9,
  },
  progressPercentage: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  resumeButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  resumeButtonText: {
    color: '#24458B',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  sectionLink: {
    color: '#24458B',
    fontWeight: '700',
    fontSize: 14,
  },
  learningPathRow: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
  },
  pathCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pathCardActive: {
    borderColor: '#E6F9F4',
    borderWidth: 2,
  },
  pathIconCircle: {
    marginBottom: 12,
  },
  pathLevel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  pathStatusCompleted: {
    fontSize: 11,
    fontWeight: '800',
    color: '#17B8A6',
  },
  pathStatusLocked: {
    fontSize: 11,
    fontWeight: '800',
    color: '#DDD',
  },
  courseItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    gap: 12,
  },
  courseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  courseDue: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  miniProgressTrack: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    width: '100%',
  },
  miniProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  analyticsRow: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  circleChart: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 6,
    borderColor: '#24458B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  circlePercentage: {
    fontSize: 14,
    fontWeight: '800',
    color: '#24458B',
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 54,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 5,
  },
  bar: {
    backgroundColor: '#24458B',
    borderRadius: 4,
  },
  analyticsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  updateItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    gap: 12,
  },
  updateIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateDetails: {
    flex: 1,
  },
  updateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});
