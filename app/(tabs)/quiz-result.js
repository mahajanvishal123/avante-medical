import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { wp, hp, ms, fs, SCREEN_WIDTH } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

const ConfettiBackground = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <View style={[styles.shape, { top: hp(50), left: wp(20), width: wp(40), height: hp(12), backgroundColor: '#FFB74D', transform: [{ rotate: '45deg' }] }]} />
    <View style={[styles.shape, { top: hp(30), left: SCREEN_WIDTH / 2 - wp(50), width: wp(30), height: hp(10), backgroundColor: '#EC407A', transform: [{ rotate: '-30deg' }, { scaleX: -1 }] }]} />
    <View style={[styles.shape, { top: hp(90), right: wp(-15), width: wp(45), height: hp(12), backgroundColor: '#E91E63', transform: [{ rotate: '-45deg' }] }]} />
    <View style={[styles.shape, { top: hp(120), left: wp(30), width: wp(35), height: hp(10), backgroundColor: '#5E35B1', transform: [{ rotate: '30deg' }] }]} />
    <View style={[styles.shape, { top: hp(200), right: wp(40), width: wp(40), height: hp(12), backgroundColor: '#FFA726', transform: [{ rotate: '50deg' }] }]} />
    <View style={[styles.shape, { top: hp(350), left: wp(10), width: wp(50), height: hp(14), backgroundColor: '#FF8A65', transform: [{ rotate: '-25deg' }] }]} />
    <View style={[styles.shape, { top: hp(400), right: wp(30), width: wp(50), height: hp(14), backgroundColor: '#7E57C2', transform: [{ rotate: '60deg' }] }]} />
    <View style={[styles.shape, { top: hp(450), left: '40%', width: wp(40), height: hp(12), backgroundColor: '#5C6BC0', transform: [{ rotate: '80deg' }] }]} />
  </View>
);

export default function QuizResultScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + hp(5) }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/exam')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={ms(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Result</Text>
        <View style={{ width: wp(40) }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ConfettiBackground />
        
        {/* Score Circle */}
        <View style={styles.scoreSection}>
           <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>85%</Text>
              <Text style={styles.scoreLabel}>SCORE</Text>
           </View>
        </View>

        {/* Congrats Box */}
        <View style={styles.congratsBox}>
           <Text style={styles.congratsTitle}>Congratulations!</Text>
           <Text style={styles.congratsDesc}>
              You have successfully passed the Cardiology{'\n'}Module Quiz.
           </Text>
        </View>

        <Text style={styles.sectionTitle}>PERFORMANCE DETAILS</Text>

        <View style={styles.statsRow}>
           <View style={styles.statCardHalf}>
              <View style={[styles.statIconBadge, { backgroundColor: '#E6F9F4' }]}>
                 <Ionicons name="checkmark" size={ms(16)} color="#17B8A6" />
              </View>
              <View style={styles.statTexts}>
                 <Text style={styles.statValue}>17</Text>
                 <Text style={styles.statLabel}>Correct</Text>
              </View>
           </View>

           <View style={styles.statCardHalf}>
              <View style={[styles.statIconBadge, { backgroundColor: '#FDECEE' }]}>
                 <Ionicons name="close" size={ms(16)} color="#E53935" />
              </View>
              <View style={styles.statTexts}>
                 <Text style={styles.statValue}>3</Text>
                 <Text style={styles.statLabel}>Incorrect</Text>
              </View>
           </View>
        </View>

        <View style={styles.statCardFull}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.statIconBadge, { backgroundColor: '#F0F5FF' }]}>
                 <Ionicons name="time" size={ms(16)} color="#3069F7" />
              </View>
              <Text style={styles.fullStatLabel}>Total Attempts</Text>
           </View>
           <Text style={styles.fullStatValue}>2</Text>
        </View>

        <TouchableOpacity style={styles.certButton} onPress={() => router.push('/(tabs)/certificate')}>
           <Text style={styles.certButtonText}>Earn Your Certificate</Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
           <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="eye-outline" size={ms(18)} color="#333" />
              <Text style={styles.actionBtnText}>Review</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="refresh-outline" size={ms(18)} color="#333" />
              <Text style={styles.actionBtnText}>Retry</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
           <Text style={styles.footerText}>Quiz ID: #CAR-1092-24 • Completed on Oct 24, 2023</Text>
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
    backgroundColor: AppColors.primary,
    paddingBottom: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
  },
  backBtn: {
    width: wp(40),
    height: wp(40),
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: AppColors.textWhite,
    fontSize: fs(16),
    fontWeight: '700',
  },
  content: {
    padding: wp(16),
    paddingBottom: hp(15),
  },
  shape: {
    position: 'absolute',
    borderRadius: ms(20),
    opacity: 0.8,
  },
  scoreSection: {
    alignItems: 'center',
    marginTop: hp(10),
    marginBottom: hp(15),
  },
  scoreCircle: {
    width: wp(110),
    height: wp(110),
    borderRadius: wp(55),
    borderWidth: 5,
    borderColor: AppColors.teal,
    backgroundColor: AppColors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: AppColors.teal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  scoreText: {
    fontSize: fs(30),
    fontWeight: '900',
    color: AppColors.textDark,
  },
  scoreLabel: {
    fontSize: fs(10),
    fontWeight: '800',
    color: AppColors.textSecondary,
    letterSpacing: 2,
    marginTop: hp(2),
  },
  congratsBox: {
    backgroundColor: '#F0FCFA',
    padding: wp(14),
    borderRadius: ms(14),
    alignItems: 'center',
    marginBottom: hp(15),
  },
  congratsTitle: {
    color: '#10967E',
    fontSize: fs(16),
    fontWeight: '800',
    marginBottom: hp(4),
  },
  congratsDesc: {
    color: '#10967E',
    fontSize: fs(13),
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: fs(20),
  },
  sectionTitle: {
    fontSize: fs(10),
    fontWeight: '800',
    color: '#8A94A6',
    letterSpacing: 1.2,
    marginBottom: hp(10),
  },
  statsRow: {
    flexDirection: 'row',
    gap: wp(10),
    marginBottom: hp(10),
  },
  statCardHalf: {
    flex: 1,
    backgroundColor: AppColors.backgroundWhite,
    borderRadius: ms(12),
    padding: wp(12),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  statIconBadge: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(12),
  },
  statTexts: {
    flex: 1,
  },
  statValue: {
    fontSize: fs(20),
    fontWeight: '800',
    color: AppColors.textDark,
  },
  statLabel: {
    fontSize: fs(11),
    fontWeight: '600',
    color: AppColors.placeholder,
  },
  statCardFull: {
    backgroundColor: AppColors.backgroundWhite,
    borderRadius: ms(12),
    padding: wp(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  fullStatLabel: {
    fontSize: fs(14),
    fontWeight: '700',
    color: AppColors.textDark,
    marginLeft: wp(12),
  },
  fullStatValue: {
    fontSize: fs(18),
    fontWeight: '800',
    color: AppColors.textDark,
  },
  certButton: {
    height: hp(48),
    backgroundColor: AppColors.teal,
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  certButtonText: {
    color: '#fff',
    fontSize: fs(16),
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: wp(10),
    marginTop: hp(10),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    height: hp(45),
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionBtnText: {
    fontSize: fs(15),
    fontWeight: '700',
    color: '#333',
    marginLeft: wp(8),
  },
  footerContainer: {
    marginTop: hp(20),
    alignItems: 'center',
  },
  footerText: {
    fontSize: fs(11),
    color: '#999',
    fontWeight: '500',
  },
});
