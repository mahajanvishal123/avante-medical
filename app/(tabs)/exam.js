import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { wp, hp, ms, fs } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

const OPTIONS = [
  { id: 'A', text: 'Right Coronary Artery (RCA)' },
  { id: 'B', text: 'Left Anterior Descending (LAD)' },
  { id: 'C', text: 'Left Circumflex Artery (LCx)' },
  { id: 'D', text: 'Posterior Descending Artery (PDA)' },
];

const OptionItem = ({ opt, selected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.optionCard, selected && styles.optionCardSelected]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
       <View style={[styles.optionIcon, selected && styles.optionIconSelected]}>
          <Text style={[styles.optionIconText, selected && styles.optionIconTextSelected]}>{opt.id}</Text>
       </View>
       <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{opt.text}</Text>
    </TouchableOpacity>
  );
};

export default function ExamScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selected, setSelected] = useState('B');

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={[styles.header, { paddingTop: insets.top + hp(15) }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={ms(24)} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTexts}>
            <Text style={styles.headerSubtitle}>DEVICE INTRODUCTION & CORE CONCEPTS</Text>
            <Text style={styles.headerTitle}>Question 3 of 10</Text>
          </View>
          <View style={{ width: wp(40) }} />
        </View>

        <View style={styles.progressContainer}>
           <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '30%' }]} />
           </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(120) }}
      >
         <View style={styles.contentWrap}>
            <View style={styles.badge}>
               <Ionicons name="information-circle" size={ms(16)} color="#3069F7" />
               <Text style={styles.badgeText}>LEVEL EXAM</Text>
            </View>

            <Text style={styles.questionText}>
              A 54-year-old patient presents with acute chest pain. The ECG shows ST-segment elevation in leads V1-V4. Which coronary artery is most likely occluded?
            </Text>

            <View style={styles.optionsList}>
               {OPTIONS.map(opt => (
                  <OptionItem 
                     key={opt.id} 
                     opt={opt} 
                     selected={selected === opt.id} 
                     onPress={() => setSelected(opt.id)} 
                  />
               ))}
            </View>

            <View style={styles.noteBox}>
               <Text style={styles.noteBold}><Ionicons name="book" size={ms(14)} color="#17B8A6"/> Important Note</Text>
               <Text style={styles.noteLine}>👉 Firstly, You Need To Complete The Quick Assessments For Each Topic. These Are Designed To Help You Understand The Content Step By Step. 📝✨</Text>
               <Text style={styles.noteLine}>👉 Once You Finish All The Topics In A Level, You Will Need To Take A Final Exam. 🎯</Text>
               <Text style={styles.noteLine}>🏆 After Successfully Passing The Final Exam, You Will Earn Your Certificate. 🎓</Text>
               <Text style={styles.noteLine}>💡 Stay Consistent, Complete Each Step, And You'll Achieve Your Goal Smoothly! 🚀</Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/(tabs)/quiz-result')}>
               <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.navRow}>
               <TouchableOpacity style={styles.navBtn}>
                  <Ionicons name="play-skip-back" size={ms(20)} color="#333" />
                  <Text style={styles.navBtnText}>Previous</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.skipBtn}>
                  <Text style={styles.skipBtnText}>Skip</Text>
                  <Ionicons name="play-forward" size={ms(14)} color="#fff" style={{marginLeft: wp(4), marginTop: 2}} />
               </TouchableOpacity>

               <TouchableOpacity style={styles.navBtn}>
                  <Text style={styles.navBtnText}>Next</Text>
                  <Ionicons name="play-skip-forward" size={ms(20)} color="#333" />
               </TouchableOpacity>
            </View>
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
    paddingBottom: hp(20),
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    marginBottom: hp(15),
  },
  closeBtn: {
    width: wp(40),
    height: wp(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTexts: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: fs(10),
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: hp(4),
  },
  headerTitle: {
    color: AppColors.textWhite,
    fontSize: fs(16),
    fontWeight: '700',
  },
  progressContainer: {
    paddingHorizontal: wp(20),
  },
  progressBarBg: {
    height: hp(6),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: ms(3),
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: AppColors.teal,
    borderRadius: ms(3),
  },
  contentWrap: {
    padding: wp(24),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.badgePrimaryBg,
    alignSelf: 'flex-start',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: ms(20),
    marginBottom: hp(20),
  },
  badgeText: {
    color: AppColors.primary,
    fontSize: fs(12),
    fontWeight: '800',
    marginLeft: wp(6),
  },
  questionText: {
    fontSize: fs(19),
    fontWeight: '800',
    color: AppColors.textDark,
    lineHeight: fs(28),
    marginBottom: hp(30),
  },
  optionsList: {
    gap: hp(15),
    marginBottom: hp(30),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(16),
    borderRadius: ms(12),
    borderWidth: 1.5,
    borderColor: AppColors.border,
    backgroundColor: AppColors.backgroundWhite,
  },
  optionCardSelected: {
    borderColor: AppColors.primary,
    backgroundColor: '#F4F8FF',
  },
  optionIcon: {
    width: wp(36),
    height: wp(36),
    borderRadius: wp(18),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(15),
    backgroundColor: AppColors.backgroundWhite,
  },
  optionIconSelected: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  optionIconText: {
    fontSize: fs(14),
    fontWeight: '700',
    color: AppColors.placeholder,
  },
  optionIconTextSelected: {
    color: AppColors.textWhite,
  },
  optionText: {
    flex: 1,
    fontSize: fs(14),
    fontWeight: '600',
    color: AppColors.textDark,
  },
  optionTextSelected: {
    fontWeight: '800',
    color: AppColors.textDark,
  },
  noteBox: {
    backgroundColor: AppColors.badgeTealBg,
    padding: wp(20),
    borderRadius: ms(15),
    marginBottom: hp(30),
  },
  noteBold: {
    fontSize: fs(14),
    fontWeight: '800',
    color: AppColors.teal,
    marginBottom: hp(10),
  },
  noteLine: {
    fontSize: fs(12),
    fontWeight: '700',
    color: AppColors.teal,
    lineHeight: fs(22),
    marginBottom: hp(8),
  },
  submitButton: {
    height: hp(55),
    backgroundColor: AppColors.teal,
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(30),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: AppColors.textWhite,
    fontSize: fs(18),
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  navBtnText: {
    fontSize: fs(15),
    fontWeight: '700',
    color: AppColors.textDark,
  },
  skipBtn: {
    backgroundColor: AppColors.warning,
    paddingHorizontal: wp(25),
    paddingVertical: hp(12),
    borderRadius: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipBtnText: {
    color: AppColors.textWhite,
    fontSize: fs(16),
    fontWeight: '800',
  },
});
