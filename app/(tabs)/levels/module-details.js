import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { wp, hp, ms, fs } from '../../../utils/responsive';
import { AppColors } from '../../../constants/Theme';

const ChapterItem = ({ number, title, status, current = false }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity 
      style={[styles.chapterCard, current && styles.chapterCardCurrent]}
      onPress={() => current && router.push('/(tabs)/levels/chapter-details')}
      activeOpacity={0.9}
    >
      <View style={[styles.chapterIconContainer, status === 'Completed' && styles.chapterIconCompleted]}>
         {status === 'Completed' ? (
           <Ionicons name="checkmark-circle" size={ms(32)} color="#17B8A6" />
         ) : (
           <Ionicons name="play-circle" size={ms(32)} color="#24458B" />
         )}
      </View>
      <View style={styles.chapterDetails}>
        <Text style={styles.chapterMeta}>{t('modules.chapter_number', { number })} {current && t('modules.current')}</Text>
        <Text style={styles.chapterTitle} numberOfLines={2}>{title}</Text>
      </View>
      {status === 'Completed' ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>{t('levels.completed')}</Text>
        </View>
      ) : (current && (
        <View style={styles.resumeButtonMini}>
          <Text style={styles.resumeButtonTextMini}>{t('home.started').toUpperCase()}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

export default function ModuleDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + hp(10) }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={ms(24)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('modules.details_title')}</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={ms(24)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(120) }}
      >
        {/* Banner Section */}
        <ImageBackground 
          source={require('../../../assets/level-detail-1.png')} 
          style={styles.banner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerSubtitle}>{t('modules.module_subtitle')}</Text>
            <Text style={styles.bannerTitle}>{t('modules.module_title')}</Text>
          </View>
        </ImageBackground>

        {/* Completion Section */}
        <View style={styles.statsSection}>
           <View style={styles.statsHeader}>
              <View>
                <Text style={styles.statsLabel}>{t('levels.overall_completion')}</Text>
                <Text style={styles.statsPercentage}>65%</Text>
              </View>
              <Text style={styles.statsCount}>{t('modules.chapter_complete', { completed: 1, total: 2 })}</Text>
           </View>
           <View style={styles.progressBarTrack}>
              <View style={[styles.progressBar, { width: '65%' }]} />
           </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('modules.about_module')}</Text>
          <Text style={styles.sectionText}>
            {t('modules.module_desc')}
          </Text>
          <TouchableOpacity>
             <Text style={styles.readMore}>{t('levels.read_more')}</Text>
          </TouchableOpacity>
        </View>

        {/* Chapters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('modules.all_chapters')}</Text>
          
          <ChapterItem 
            number={1} 
            title={t('modules.c1_title')} 
            status="Completed" 
          />

          <ChapterItem 
            number={2} 
            title={t('modules.c2_title')} 
            status="Running"
            current={true} 
          />
        </View>
      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, hp(15)) }]}>
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
    backgroundColor: AppColors.backgroundWhite,
  },
  header: {
    backgroundColor: AppColors.primaryDark,
    paddingBottom: hp(15),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fs(20),
    fontWeight: '700',
    color: AppColors.textWhite,
  },
  content: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: hp(220),
    justifyContent: 'flex-end',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(36, 69, 139, 0.7)',
    padding: wp(20),
  },
  bannerSubtitle: {
    color: AppColors.gold,
    fontSize: fs(14),
    fontWeight: '700',
    marginBottom: hp(5),
  },
  bannerTitle: {
    color: AppColors.textWhite,
    fontSize: fs(22),
    fontWeight: '800',
    lineHeight: fs(30),
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
    fontSize: fs(12),
    fontWeight: '700',
    color: AppColors.placeholder,
    letterSpacing: 1,
    marginBottom: hp(5),
  },
  statsPercentage: {
    fontSize: fs(28),
    fontWeight: '800',
    color: AppColors.primaryDark,
  },
  statsCount: {
    fontSize: fs(14),
    fontWeight: '600',
    color: AppColors.textSecondary,
    marginBottom: hp(5),
  },
  progressBarTrack: {
    height: hp(10),
    backgroundColor: AppColors.backgroundLight,
    borderRadius: ms(5),
  },
  progressBar: {
    height: '100%',
    backgroundColor: AppColors.primaryDark,
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
    color: AppColors.primaryDark,
    fontWeight: '700',
    marginTop: hp(5),
    fontSize: fs(14),
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(15),
    borderRadius: ms(16),
    backgroundColor: AppColors.backgroundWhite,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: hp(15),
  },
  chapterCardCurrent: {
    borderColor: AppColors.primaryDark,
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#24458B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  chapterIconContainer: {
    marginRight: wp(15),
  },
  chapterDetails: {
    flex: 1,
  },
  chapterMeta: {
    fontSize: fs(12),
    fontWeight: '600',
    color: '#24458B',
    marginBottom: hp(4),
  },
  chapterTitle: {
    fontSize: fs(15),
    fontWeight: '700',
    color: '#333',
    lineHeight: fs(20),
  },
  completedBadge: {
    backgroundColor: AppColors.badgeTealBg,
    paddingHorizontal: wp(10),
    paddingVertical: hp(5),
    borderRadius: ms(8),
  },
  completedBadgeText: {
    color: AppColors.teal,
    fontSize: fs(12),
    fontWeight: '700',
  },
  resumeButtonMini: {
    backgroundColor: '#24458B',
    paddingHorizontal: wp(15),
    paddingVertical: hp(10),
    borderRadius: ms(10),
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
