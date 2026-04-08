import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const LevelCard = ({ 
  image, 
  title, 
  stats, 
  progress, 
  status, 
  buttonText, 
  buttonVariant = 'primary',
  locked = false,
  badgeText
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => !locked && router.push('/(tabs)/level-details')}
      activeOpacity={0.9}
    >
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.levelImage} resizeMode="cover" />
        {badgeText && (
          <View style={[styles.badge, styles[`badge${status}`]]}>
             <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.cardContent}>
        <Text style={styles.levelTitle}>{title}</Text>
        <Text style={styles.levelStats}>{stats}</Text>
        
        <View style={styles.progressContainer}>
           <Text style={styles.progressLabel}>{t('levels.level_progress')}</Text>
           <View style={styles.progressBarTrack}>
              <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: status === 'Completed' ? '#24458B' : (status === 'Running' ? '#17B8A6' : '#EEE') }]} />
           </View>
           <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>

        <View 
          style={[
            styles.actionButton, 
            styles[`button${buttonVariant}`],
            locked && styles.buttonLocked
          ]}
        >
          <Text style={[styles.buttonText, locked && styles.buttonTextLocked]}>{buttonText}</Text>
          {locked && <Ionicons name="lock-closed" size={18} color="#999" style={{ marginLeft: 8 }} />}
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
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('levels.all_levels')}</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'All' && styles.tabActive]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.tabLabel, activeTab === 'All' && styles.tabLabelActive]}>{t('levels.all_levels')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Completed' && styles.tabActive]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabLabel, activeTab === 'Completed' && styles.tabLabelActive]}>{t('levels.completed')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <LevelCard 
          image={require('../../assets/level1_heart.png')}
          title={t('levels.title_f1')}
          stats={t('levels.stats_format', { hours: 4.5, modules: 2 })}
          progress={100}
          status="Completed"
          badgeText={t('levels.completed').toUpperCase()}
          buttonText={t('levels.take_exam')}
          buttonVariant="primary"
        />

        <LevelCard 
          image={require('../../assets/level2_heart.png')}
          title={t('levels.title_f2')}
          stats={t('levels.stats_format', { hours: 4.5, modules: 2 })}
          progress={60}
          status="Running"
          badgeText={t('levels.running').toUpperCase()}
          buttonText={t('levels.continue')}
          buttonVariant="secondary"
        />

        <LevelCard 
          image={require('../../assets/brain_scan.png')}
          title={t('levels.title_i1')}
          stats={t('levels.stats_format', { hours: 6.2, modules: 2 })}
          progress={0}
          status="Locked"
          badgeText={t('levels.locked').toUpperCase()}
          buttonText={t('levels.start_level')}
          buttonVariant="locked"
          locked={true}
        />

        <LevelCard 
          image={require('../../assets/brain_scan.png')}
          title={t('levels.title_i2')}
          stats={t('levels.stats_format', { hours: 6.2, modules: 2 })}
          progress={0}
          status="Locked"
          badgeText={t('levels.locked').toUpperCase()}
          buttonText={t('levels.start_level')}
          buttonVariant="locked"
          locked={true}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
  },
  tabActive: {
    backgroundColor: '#24458B',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabLabelActive: {
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 180,
    width: '100%',
  },
  levelImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  badgeCompleted: {
    backgroundColor: '#E6F9F4',
  },
  badgeRunning: {
    backgroundColor: '#E6F2FF',
  },
  badgeLocked: {
    backgroundColor: '#F5F5F5',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#333',
  },
  cardContent: {
    padding: 20,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 24,
  },
  levelStats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#F0F2F5',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  actionButton: {
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonprimary: {
    backgroundColor: '#24458B',
  },
  buttonsecondary: {
    backgroundColor: '#17B8A6',
  },
  buttonlocked: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  buttonLocked: {
    borderColor: '#24458B', // Blue border for locked button as per mockup
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  buttonTextLocked: {
    color: '#24458B',
  },
});
