import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const TopicItem = ({ number, title, status, current = false }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.topicCard, current && styles.topicCardCurrent]}>
      <View style={[styles.topicIconContainer, status === 'Completed' && styles.topicIconCompleted]}>
         {status === 'Completed' ? (
           <Ionicons name="checkmark-circle" size={32} color="#17B8A6" />
         ) : (
           <Ionicons name="play-circle" size={32} color="#24458B" />
         )}
      </View>
      <View style={styles.topicDetails}>
        <Text style={styles.topicMeta}>{t('chapters.topic_number', { number })} {current && t('modules.current')}</Text>
        <Text style={styles.topicTitle}>{title}</Text>
      </View>
      {status === 'Completed' ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>{t('levels.completed')}</Text>
        </View>
      ) : (current && (
        <TouchableOpacity style={styles.resumeButtonMini}>
          <Text style={styles.resumeButtonTextMini}>{t('home.started').toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function ChapterDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/module-details')} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('chapters.details_title')}</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Banner Section */}
        <ImageBackground 
          source={require('../../assets/level2_heart.png')} 
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay}>
            <View style={styles.avatarSection}>
               <View style={styles.avatarBorder}>
                 <Image 
                    source={{ uri: 'https://i.pravatar.cc/100' }} 
                    style={styles.avatar}
                 />
               </View>
            </View>
            <Text style={styles.bannerSubtitle}>{t('chapters.chapter_subtitle')}</Text>
            <Text style={styles.bannerTitle}>{t('chapters.chapter_title')}</Text>
          </View>
        </ImageBackground>

        {/* Completion Section */}
        <View style={styles.statsSection}>
           <View style={styles.statsHeader}>
              <View>
                <Text style={styles.statsLabel}>{t('levels.overall_completion')}</Text>
                <Text style={styles.statsPercentage}>65%</Text>
              </View>
              <Text style={styles.statsCount}>{t('chapters.topic_complete', { completed: 1, total: 3 })}</Text>
           </View>
           <View style={styles.progressBarTrack}>
              <View style={[styles.progressBar, { width: '65%' }]} />
           </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('chapters.about_chapter')}</Text>
          <Text style={styles.sectionText}>
            {t('chapters.chapter_desc')}
          </Text>
          <TouchableOpacity>
             <Text style={styles.readMore}>{t('levels.read_more')}</Text>
          </TouchableOpacity>
        </View>

        {/* Topics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('chapters.all_topics')}</Text>
          
          <TopicItem 
            number={1} 
            title={t('chapters.t1_title')} 
            status="Completed" 
          />

          <TopicItem 
            number={2} 
            title={t('chapters.t2_title')} 
            status="Completed" 
          />

          <TopicItem 
            number={3} 
            title={t('chapters.t3_title')} 
            status="Running"
            current={true} 
          />
        </View>
      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 15) }]}>
          <TouchableOpacity style={styles.continueButton}>
             <Text style={styles.continueButtonText}>{t('levels.continue_learning')}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#24458B',
    paddingBottom: 15,
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
  content: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  avatarSection: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  avatarBorder: {
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
    opacity: 0.9,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
  },
  statsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 5,
  },
  statsPercentage: {
    fontSize: 28,
    fontWeight: '800',
    color: '#24458B',
  },
  statsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#F0F2F5',
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#24458B',
    borderRadius: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  readMore: {
    color: '#24458B',
    fontWeight: '700',
    marginTop: 5,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
  },
  topicCardCurrent: {
    borderColor: '#24458B',
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#24458B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  topicIconContainer: {
    marginRight: 15,
  },
  topicDetails: {
    flex: 1,
  },
  topicMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#24458B',
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    lineHeight: 20,
  },
  completedBadge: {
    backgroundColor: '#E6F9F4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  completedBadgeText: {
    color: '#17B8A6',
    fontSize: 12,
    fontWeight: '700',
  },
  resumeButtonMini: {
    backgroundColor: '#24458B',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resumeButtonTextMini: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    height: 55,
    backgroundColor: '#17B8A6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
