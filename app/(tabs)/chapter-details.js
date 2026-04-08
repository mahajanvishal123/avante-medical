import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const TopicCard = ({ 
  image, 
  title, 
  units, 
  progress, 
  status, 
  locked = false,
  requirement,
  onPress
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.card, locked && styles.cardLocked]}>
      <View style={styles.cardHeader}>
        <Image source={image} style={styles.topicImage} />
        <View style={styles.topicInfo}>
           <View style={styles.titleRow}>
              <Text style={styles.topicTitle}>{title}</Text>
              {!locked && status === 'Completed' && (
                <Ionicons name="checkmark-circle" size={24} color="#17B8A6" />
              )}
              {!locked && <Ionicons name="chevron-forward" size={20} color="#CCC" style={{marginLeft: 5}} />}
           </View>
           <Text style={styles.unitsText}>{t('chapters.learning_units', { count: units })}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
         <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              {status === 'Completed' ? 'COMPLETED' : (locked ? 'LOCKED' : t('chapters.current_progress'))}
            </Text>
            <Text style={[styles.progressPercentage, status === 'Completed' && {color: '#17B8A6'}]}>
              {progress}%
            </Text>
         </View>
         <View style={styles.progressBarTrack}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  width: `${progress}%`, 
                  backgroundColor: status === 'Completed' ? '#17B8A6' : (locked ? '#EEE' : '#FF6B00') 
                }
              ]} 
            />
         </View>
      </View>

      {!locked ? (
        status === 'Completed' ? (
          <View style={styles.completedActions}>
             <TouchableOpacity style={styles.quizButton} onPress={onPress}>
                <Text style={styles.quizButtonText}>{t('chapters.attempt_quiz')}</Text>
             </TouchableOpacity>
             <View style={styles.secondaryActions}>
                <TouchableOpacity style={styles.actionPill}>
                   <Ionicons name="refresh" size={18} color="#24458B" />
                   <Text style={styles.actionPillText}>{t('chapters.replay')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionPill}>
                   <Ionicons name="bar-chart" size={18} color="#24458B" />
                   <Text style={styles.actionPillText}>{t('chapters.performance')}</Text>
                </TouchableOpacity>
             </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.resumeButton} onPress={onPress}>
             <Text style={styles.resumeButtonText}>{t('chapters.resume_topic')}</Text>
             <Ionicons name="play-circle" size={24} color="#fff" />
          </TouchableOpacity>
        )
      ) : (
        <View style={styles.lockedFooter}>
           <Text style={styles.requirementText}>{t('chapters.requirement', { level: requirement })}</Text>
           <Ionicons name="lock-closed" size={18} color="#999" />
        </View>
      )}
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
          <View style={styles.headerTitleContainer}>
             <Text style={styles.headerSubtitle}>CHAPTER: PACEMAKER ECG PATTERNS</Text>
             <Text style={styles.headerTitle}>Topics</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.subHeader}>
           <Text style={styles.topicsCount}>{t('chapters.topics_in_module', { count: 3 })}</Text>
           <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Level 2</Text>
           </View>
        </View>

        <TopicCard 
          image={require('../../assets/brain_scan.png')}
          title={t('chapters.t1_title')}
          units={6}
          progress={100}
          status="Completed"
          onPress={() => router.push('/(tabs)/topic-details')}
        />

        <TopicCard 
          image={require('../../assets/level2_heart.png')}
          title={t('chapters.t2_title')}
          units={4}
          progress={50}
          status="Running"
          onPress={() => router.push('/(tabs)/topic-details')}
        />

        <TopicCard 
          image={require('../../assets/level1_heart.png')}
          title="Label paced ECG trace"
          units={8}
          progress={0}
          status="Locked"
          locked={true}
          requirement={3}
        />

        <TopicCard 
          image={require('../../assets/level1_heart.png')}
          title="Label paced ECG trace"
          units={8}
          progress={0}
          status="Locked"
          locked={true}
          requirement={3}
        />
      </ScrollView>

      {/* Footer is handled by TabLayout */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#24458B',
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  topicsCount: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  levelBadge: {
    backgroundColor: '#E6F9F4',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  levelBadgeText: {
    color: '#17B8A6',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardLocked: {
    opacity: 0.6,
    borderStyle: 'dashed',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    flex: 1,
  },
  unitsText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#999',
    letterSpacing: 0.5,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F0F2F5',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  resumeButton: {
    height: 55,
    backgroundColor: '#3069F7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  resumeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  completedActions: {
    gap: 12,
  },
  quizButton: {
    height: 55,
    backgroundColor: '#17B8A6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionPill: {
    flex: 1,
    height: 50,
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionPillText: {
    color: '#24458B',
    fontSize: 14,
    fontWeight: '700',
  },
  lockedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  requirementText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
  },
});
