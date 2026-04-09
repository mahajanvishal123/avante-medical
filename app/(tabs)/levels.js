import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { wp, hp, ms, fs } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

const LevelCard = ({ 
  image, title, stats, progress, status, buttonText, 
  buttonVariant = 'primary', locked = false, badgeText
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => !locked && router.push('/(tabs)/level-details')}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.levelImage} resizeMode="cover" />
        {badgeText && (
          <View style={[styles.badge, 
            status === 'Completed' && { backgroundColor: AppColors.badgeTealBg },
            status === 'Running' && { backgroundColor: AppColors.badgePrimaryBg },
            status === 'Locked' && { backgroundColor: AppColors.backgroundLight },
          ]}>
             <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.levelTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.levelStats}>{stats}</Text>
        <View style={styles.progressContainer}>
           <Text style={styles.progressLabel}>{t('levels.level_progress')}</Text>
           <View style={styles.progressBarTrack}>
              <View style={[styles.progressBar, { 
                width: `${progress}%`, 
                backgroundColor: status === 'Completed' ? AppColors.primaryDark : (status === 'Running' ? AppColors.teal : AppColors.disabled) 
              }]} />
           </View>
           <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        <View style={[styles.actionButton, 
          buttonVariant === 'primary' && { backgroundColor: AppColors.primaryDark },
          buttonVariant === 'secondary' && { backgroundColor: AppColors.teal },
          buttonVariant === 'locked' && { backgroundColor: AppColors.backgroundWhite, borderWidth: 1.5, borderColor: AppColors.primaryDark },
          locked && { borderColor: AppColors.primaryDark }
        ]}>
          <Text style={[styles.buttonText, locked && { color: AppColors.primaryDark }]}>{buttonText}</Text>
          {locked && <Ionicons name="lock-closed" size={ms(18)} color={AppColors.textSecondary} style={{ marginLeft: wp(8) }} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function LevelsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + hp(10) }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={ms(24)} color={AppColors.textWhite} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('levels.all_levels')}</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={ms(24)} color={AppColors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'All' && styles.tabActive]} onPress={() => setActiveTab('All')}>
          <Text style={[styles.tabLabel, activeTab === 'All' && styles.tabLabelActive]}>{t('levels.all_levels')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Completed' && styles.tabActive]} onPress={() => setActiveTab('Completed')}>
          <Text style={[styles.tabLabel, activeTab === 'Completed' && styles.tabLabelActive]}>{t('levels.completed')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: hp(100) }]} showsVerticalScrollIndicator={false}>
        <LevelCard image={require('../../assets/my-level-1.png')} title={t('levels.title_f1')} stats={t('levels.stats_format', { hours: 4.5, modules: 2 })} progress={100} status="Completed" badgeText={t('levels.completed').toUpperCase()} buttonText={t('levels.take_exam')} buttonVariant="primary" />
        <LevelCard image={require('../../assets/my-level-2.png')} title={t('levels.title_f2')} stats={t('levels.stats_format', { hours: 4.5, modules: 2 })} progress={60} status="Running" badgeText={t('levels.running').toUpperCase()} buttonText={t('levels.continue')} buttonVariant="secondary" />
        <LevelCard image={require('../../assets/my-level-3.png')} title={t('levels.title_i1')} stats={t('levels.stats_format', { hours: 6.2, modules: 2 })} progress={0} status="Locked" badgeText={t('levels.locked').toUpperCase()} buttonText={t('levels.start_level')} buttonVariant="locked" locked={true} />
        <LevelCard image={require('../../assets/my-level-3.png')} title={t('levels.title_i2')} stats={t('levels.stats_format', { hours: 6.2, modules: 2 })} progress={0} status="Locked" badgeText={t('levels.locked').toUpperCase()} buttonText={t('levels.start_level')} buttonVariant="locked" locked={true} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.backgroundLight },
  header: { backgroundColor: AppColors.primaryDark, paddingBottom: hp(15) },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(20), justifyContent: 'space-between' },
  headerIcon: { width: wp(40), height: wp(40), borderRadius: wp(20), backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fs(20), fontWeight: '700', color: AppColors.textWhite },
  tabContainer: { flexDirection: 'row', backgroundColor: AppColors.backgroundWhite, paddingHorizontal: wp(20), paddingVertical: hp(15), gap: wp(15) },
  tab: { paddingHorizontal: wp(20), paddingVertical: hp(10), borderRadius: ms(20), backgroundColor: AppColors.backgroundLight },
  tabActive: { backgroundColor: AppColors.primaryDark },
  tabLabel: { fontSize: fs(14), fontWeight: '600', color: AppColors.textSecondary },
  tabLabelActive: { color: AppColors.textWhite },
  scrollContent: { padding: wp(20) },
  card: { backgroundColor: AppColors.backgroundWhite, borderRadius: ms(20), marginBottom: hp(20), overflow: 'hidden', elevation: 4, shadowColor: AppColors.cardShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  imageContainer: { height: hp(180), width: '100%' },
  levelImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: hp(15), right: wp(15), paddingHorizontal: wp(15), paddingVertical: hp(6), borderRadius: ms(8) },
  badgeText: { fontSize: fs(12), fontWeight: '800', color: AppColors.textDark },
  cardContent: { padding: wp(20) },
  levelTitle: { fontSize: fs(17), fontWeight: '800', color: AppColors.textDark, marginBottom: hp(8), lineHeight: fs(24) },
  levelStats: { fontSize: fs(13), color: AppColors.textSecondary, marginBottom: hp(20) },
  progressContainer: { marginBottom: hp(20) },
  progressLabel: { fontSize: fs(12), fontWeight: '600', color: AppColors.textSecondary, marginBottom: hp(8) },
  progressBarTrack: { height: hp(8), backgroundColor: AppColors.backgroundLight, borderRadius: ms(4), marginBottom: hp(5) },
  progressBar: { height: '100%', borderRadius: ms(4) },
  progressPercentage: { textAlign: 'right', fontSize: fs(12), fontWeight: '700', color: AppColors.textDark },
  actionButton: { height: hp(55), borderRadius: ms(12), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  buttonText: { fontSize: fs(16), fontWeight: '700', color: AppColors.textWhite },
});
