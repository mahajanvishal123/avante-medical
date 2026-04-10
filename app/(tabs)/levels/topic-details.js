import React from 'react';
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
import { wp, hp, ms, fs } from '../../../utils/responsive';
import { AppColors } from '../../../constants/Theme';

export default function TopicDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + hp(5) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={ms(24)} color="#fff" />
        </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
             <Text style={styles.headerSubtitle}>TOPIC: HEART CHAMBERS</Text>
             <Text style={styles.headerTitle}>{t('chapters.topics_details')}</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={ms(24)} color="#fff" />
          </TouchableOpacity>
        </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(120) }}
      >
        <View style={styles.textContent}>
           <Text style={styles.mainTitle}>{t('chapters.t1_title')}</Text>
           <Text style={styles.description}>
             {t('chapters.chapter_desc')}
           </Text>
        </View>

        {/* Content Image */}
        <View style={styles.imageCard}>
            <Image 
              source={require('../../../assets/topic-detaisl-1.jpg')} 
              style={styles.contentImage}
              resizeMode="cover"
            />
        </View>

        {/* Video Player Section */}
        <View style={styles.videoPlayer}>
            <Image 
              source={require('../../../assets/topic-details-2.png')} 
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
           <View style={styles.videoOverlay}>
              <TouchableOpacity style={styles.playButton}>
                 <Ionicons name="play" size={ms(40)} color="#fff" />
              </TouchableOpacity>
              <View style={styles.videoControls}>
                 <View style={styles.timeRow}>
                    <Text style={styles.timeText}>08:42</Text>
                    <Text style={styles.timeText}>24:15</Text>
                 </View>
                 <View style={styles.videoTrack}>
                    <View style={styles.videoProgress} />
                    <View style={styles.progressKnob} />
                 </View>
              </View>
           </View>
        </View>

        {/* Meta Info */}
        <View style={styles.metaRow}>
           <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>UNIT 2 OF 4</Text>
           </View>
           <Text style={styles.metaText}>• Advanced Cardiac Life Support</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.quizButton} onPress={() => router.push('/(tabs)/levels/exam')}>
           <Text style={styles.quizButtonText}>{t('chapters.attempt_quiz')}</Text>
        </TouchableOpacity>

        {/* Navigation Controls */}
        <View style={styles.navRow}>
           <TouchableOpacity style={styles.navButton}>
              <Ionicons name="play-back" size={ms(20)} color="#333" />
              <Text style={styles.navButtonText}>{t('chapters.previous')}</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.allTopicsButton}>
              <Text style={styles.allTopicsText}>{t('chapters.all_topics_btn')}</Text>
              <Ionicons name="list" size={ms(20)} color="#fff" />
           </TouchableOpacity>

           <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>{t('chapters.next')}</Text>
              <Ionicons name="play-forward" size={ms(20)} color="#333" />
           </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: AppColors.primaryDark,
    paddingBottom: hp(20),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  headerIcon: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: fs(10),
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: hp(2),
  },
  headerTitle: {
    fontSize: fs(20),
    fontWeight: '700',
    color: AppColors.textWhite,
  },
  content: {
    flex: 1,
    padding: wp(20),
  },
  textContent: {
    marginBottom: hp(25),
  },
  mainTitle: {
    fontSize: fs(26),
    fontWeight: '900',
    color: AppColors.textDark,
    marginBottom: hp(15),
  },
  description: {
    fontSize: fs(15),
    color: AppColors.textSecondary,
    lineHeight: fs(24),
    opacity: 0.8,
  },
  imageCard: {
    width: '100%',
    height: hp(200),
    borderRadius: ms(20),
    overflow: 'hidden',
    marginBottom: hp(25),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  contentImage: {
    width: '100%',
    height: '100%',
  },
  videoPlayer: {
    width: '100%',
    height: hp(220),
    borderRadius: ms(20),
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: hp(25),
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    backgroundColor: AppColors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  videoControls: {
    position: 'absolute',
    bottom: hp(20),
    left: wp(20),
    right: wp(20),
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(10),
  },
  timeText: {
    color: AppColors.textWhite,
    fontSize: fs(12),
    fontWeight: '700',
  },
  videoTrack: {
    height: hp(4),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: ms(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoProgress: {
    width: '40%',
    height: '100%',
    backgroundColor: AppColors.warning,
    borderRadius: ms(2),
  },
  progressKnob: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: AppColors.warning,
    marginLeft: -2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(30),
    gap: wp(10),
  },
  unitBadge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: ms(8),
    borderWidth: 1,
    borderColor: '#FFDAB9',
  },
  unitBadgeText: {
    color: AppColors.warning,
    fontSize: fs(11),
    fontWeight: '800',
  },
  metaText: {
    fontSize: fs(13),
    color: AppColors.placeholder,
    fontWeight: '600',
    flex: 1,
  },
  quizButton: {
    height: hp(60),
    borderRadius: ms(15),
    borderWidth: 1.5,
    borderColor: '#24458B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(30),
  },
  quizButtonText: {
    color: AppColors.primaryDark,
    fontSize: fs(18),
    fontWeight: '800',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(20),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  navButtonText: {
    fontSize: fs(15),
    fontWeight: '700',
    color: AppColors.textDark,
  },
  allTopicsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    paddingHorizontal: wp(20),
    paddingVertical: hp(12),
    borderRadius: ms(12),
    gap: wp(8),
  },
  allTopicsText: {
    color: '#fff',
    fontSize: fs(14),
    fontWeight: '800',
  },
});
