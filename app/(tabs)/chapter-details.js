import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { wp, hp, ms, fs } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

const TopicItem = ({ number, title, status, current = false }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity 
      style={[styles.topicCard, current && styles.topicCardCurrent]}
      onPress={() => current && router.push('/(tabs)/subtopic-list')}
      activeOpacity={0.9}
    >
      <View style={[
        styles.topicIconContainer, 
        status === 'Completed' ? styles.topicIconCompleted : styles.topicIconCurrent
      ]}>
         {status === 'Completed' ? (
           <Ionicons name="checkmark" size={ms(20)} color="#17B8A6" />
         ) : (
           <Ionicons name="play" size={ms(16)} color="#fff" style={{marginLeft: 3}} />
         )}
      </View>
      <View style={styles.topicDetails}>
        <Text style={[styles.topicMeta, current && styles.topicMetaCurrent]}>
          {t('chapters.topic_number', { number })} {current && t('modules.current')}
        </Text>
        <Text style={styles.topicTitle} numberOfLines={2}>{title}</Text>
      </View>
      {status === 'Completed' ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>{t('home.completed')}</Text>
        </View>
      ) : (current && (
        <TouchableOpacity 
          style={styles.resumeButtonMini}
          onPress={() => router.push('/(tabs)/subtopic-list')}
        >
          <Text style={styles.resumeButtonTextMini}>RESUME</Text>
        </TouchableOpacity>
      ))}
    </TouchableOpacity>
  );
};

export default function ChapterDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + hp(10) }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/module-details')} style={styles.headerIcon}>
            <Ionicons name="chevron-back" size={ms(24)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('chapters.details_title')}</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={ms(24)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(120) }}
      >
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <ImageBackground 
            source={require('../../assets/level-detail-1.png')} 
            style={styles.banner}
            resizeMode="cover"
          >
            <View style={styles.bannerOverlay}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerSubtitle}>{t('chapters.chapter_subtitle')}</Text>
                <Text style={styles.bannerTitle}>{t('chapters.chapter_title')}</Text>
              </View>
            </View>
          </ImageBackground>
          
          <View style={styles.avatarWrapper}>
             <View style={styles.avatarTail} />
             <Image 
               source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
               style={styles.avatar} 
             />
          </View>
        </View>

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
        <View style={[styles.section, { backgroundColor: '#F8F9FA' }]}>
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
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, hp(15)) }]}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/(tabs)/subtopic-list')}
          >
             <Text style={styles.continueButtonText}>{t('levels.continue_learning')}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.backgroundWhite,
  },
  header: {
    backgroundColor: AppColors.primary,
    paddingBottom: hp(15),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: wp(40),
    height: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fs(18),
    fontWeight: '700',
    color: AppColors.textWhite,
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
    height: hp(200),
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingLeft: wp(25),
  },
  bannerTextContainer: {
    marginTop: hp(40),
  },
  bannerSubtitle: {
    color: AppColors.textWhite,
    fontSize: fs(18),
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: hp(5),
    opacity: 0.9,
  },
  bannerTitle: {
    color: AppColors.textWhite,
    fontSize: fs(26),
    fontWeight: '800',
  },
  avatarWrapper: {
    position: 'absolute',
    top: hp(-30),
    alignSelf: 'center',
    width: wp(64),
    height: wp(64),
    borderRadius: wp(32),
    backgroundColor: AppColors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatarTail: {
    position: 'absolute',
    bottom: -6,
    left: wp(20),
    width: wp(20),
    height: wp(20),
    backgroundColor: AppColors.backgroundWhite,
    transform: [{ rotate: '45deg' }],
    borderRadius: ms(3),
  },
  avatar: {
    width: wp(56),
    height: wp(56),
    borderRadius: wp(28),
  },
  statsSection: {
    padding: wp(20),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: hp(15),
  },
  statsLabel: {
    fontSize: fs(11),
    fontWeight: '800',
    color: AppColors.placeholder,
    letterSpacing: 0.5,
    marginBottom: hp(5),
  },
  statsPercentage: {
    fontSize: fs(26),
    fontWeight: '800',
    color: AppColors.primary,
  },
  statsCount: {
    fontSize: fs(13),
    fontWeight: '600',
    color: AppColors.textSecondary,
    marginBottom: hp(5),
  },
  progressBarTrack: {
    height: hp(10),
    backgroundColor: '#F0F2F5',
    borderRadius: ms(5),
  },
  progressBar: {
    height: '100%',
    backgroundColor: AppColors.primary,
    borderRadius: ms(5),
  },
  section: {
    padding: wp(20),
  },
  sectionTitle: {
    fontSize: fs(18),
    fontWeight: '800',
    color: AppColors.textDark,
    marginBottom: hp(15),
  },
  sectionText: {
    fontSize: fs(15),
    color: AppColors.textSecondary,
    lineHeight: fs(24),
  },
  readMore: {
    color: AppColors.primary,
    fontWeight: '700',
    marginTop: hp(8),
    fontSize: fs(15),
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(16),
    borderRadius: ms(16),
    backgroundColor: AppColors.backgroundWhite,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: hp(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  topicCardCurrent: {
    borderColor: AppColors.primary,
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#3069F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  topicIconContainer: {
    width: wp(44),
    height: wp(44),
    borderRadius: wp(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(15),
  },
  topicIconCompleted: {
    backgroundColor: AppColors.badgeTealBg,
  },
  topicIconCurrent: {
    backgroundColor: '#24458B',
  },
  topicDetails: {
    flex: 1,
  },
  topicMeta: {
    fontSize: fs(12),
    fontWeight: '600',
    color: '#999',
    marginBottom: hp(4),
  },
  topicMetaCurrent: {
    color: '#3069F7',
  },
  topicTitle: {
    fontSize: fs(15),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  completedBadge: {
    backgroundColor: AppColors.badgeTealBg,
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: ms(8),
  },
  completedBadgeText: {
    color: AppColors.teal,
    fontSize: fs(12),
    fontWeight: '700',
  },
  resumeButtonMini: {
    backgroundColor: '#3069F7',
    paddingHorizontal: wp(16),
    paddingVertical: hp(10),
    borderRadius: ms(20),
  },
  resumeButtonTextMini: {
    color: '#fff',
    fontSize: fs(12),
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: wp(20),
    paddingTop: hp(15),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    height: hp(55),
    backgroundColor: AppColors.teal,
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: fs(18),
    fontWeight: '700',
  },
});
