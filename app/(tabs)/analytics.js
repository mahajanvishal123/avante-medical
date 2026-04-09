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
import { wp, hp, ms, fs, SCREEN_WIDTH } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + hp(10) }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
            <Ionicons name="chevron-back" size={ms(22)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('home.analytics')}</Text>
          <View style={{ width: wp(40) }} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(100) }}
      >
        {/* Stats Cards */}
        <View style={styles.statsCardsRow}>
          <View style={styles.statsCard}>
            <View style={styles.statsCardHeader}>
              <Text style={styles.statsCardNumber}>1</Text>
              <View style={[styles.statsCardIconCircle, { backgroundColor: '#E8F0FE' }]}>
                <Ionicons name="school" size={ms(16)} color="#3069F7" />
              </View>
            </View>
            <Text style={styles.statsCardLabel}>{t('home.level_1').toUpperCase()}</Text>
            <Text style={styles.statsCardStatus}>{t('home.completed')}</Text>
          </View>

          <View style={styles.statsDivider} />

          <View style={styles.statsCard}>
            <View style={styles.statsCardHeader}>
              <Text style={styles.statsCardNumber}>2</Text>
              <View style={[styles.statsCardIconCircle, { backgroundColor: '#F0F0F0' }]}>
                <Ionicons name="time" size={ms(16)} color="#999" />
              </View>
            </View>
            <Text style={styles.statsCardLabel}>{t('home.level_2').toUpperCase()}</Text>
            <Text style={[styles.statsCardStatus, { color: '#FF5252' }]}>{t('home.pending')}</Text>
          </View>
        </View>

        {/* AVG Score Section */}
        <View style={styles.avgScoreSection}>
          <View style={styles.avgScoreHeader}>
            <Text style={styles.avgScoreLabel}>{t('home.avg_score')}</Text>
            <Ionicons name="trending-up" size={ms(18)} color="#3069F7" />
          </View>
          <View style={styles.avgScoreRow}>
            <View>
              <Text style={styles.avgScoreValue}>75%</Text>
              <Text style={styles.avgScoreCompare}>+12.5% vs last month</Text>
            </View>
            <View style={styles.scoreChartPlaceholder}>
               <View style={[styles.scoreBar, { height: '30%' }]} />
               <View style={[styles.scoreBar, { height: '50%' }]} />
               <View style={[styles.scoreBar, { height: '80%', backgroundColor: AppColors.primary }]} />
               <View style={[styles.scoreBar, { height: '65%' }]} />
               <View style={[styles.scoreBar, { height: '90%', backgroundColor: AppColors.primary }]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.backgroundLight },
  header: { backgroundColor: AppColors.primary, paddingBottom: hp(18) },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(15), justifyContent: 'space-between' },
  headerBackBtn: { width: wp(40), height: wp(40), borderRadius: wp(20), backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fs(18), fontWeight: '700', color: AppColors.textWhite, letterSpacing: 0.3 },
  content: { flex: 1 },
  statsCardsRow: { flexDirection: 'row', backgroundColor: AppColors.backgroundWhite, marginHorizontal: wp(20), marginTop: hp(20), borderRadius: ms(16), padding: wp(20), elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  statsCard: { flex: 1, alignItems: 'flex-start' },
  statsDivider: { width: 1, backgroundColor: '#EEE', marginHorizontal: wp(15) },
  statsCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: hp(8) },
  statsCardNumber: { fontSize: fs(36), fontWeight: '800', color: AppColors.textDark },
  statsCardIconCircle: { width: wp(32), height: wp(32), borderRadius: wp(16), alignItems: 'center', justifyContent: 'center' },
  statsCardLabel: { fontSize: fs(10), fontWeight: '700', color: AppColors.textSecondary, letterSpacing: 1, marginBottom: hp(2) },
  statsCardStatus: { fontSize: fs(11), fontWeight: '800', color: AppColors.teal },
  avgScoreSection: { backgroundColor: AppColors.backgroundWhite, marginHorizontal: wp(20), marginTop: hp(20), borderRadius: ms(16), padding: wp(20), elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  avgScoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(15) },
  avgScoreLabel: { fontSize: fs(12), fontWeight: '700', color: AppColors.textSecondary, letterSpacing: 0.5 },
  avgScoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  avgScoreValue: { fontSize: fs(32), fontWeight: '800', color: AppColors.textDark },
  avgScoreCompare: { fontSize: fs(11), color: AppColors.teal, fontWeight: '600', marginTop: hp(4) },
  scoreChartPlaceholder: { flexDirection: 'row', alignItems: 'flex-end', gap: wp(6), height: hp(60) },
  scoreBar: { width: wp(8), backgroundColor: '#E0E7FF', borderRadius: ms(4) },
});
