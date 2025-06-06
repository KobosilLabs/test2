import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import HeroBanner from '@/components/HeroBanner';
import DaySummary from '@/components/DaySummary';
import { arcsData } from '@/data/habitsData';
import { Brain, Target, Trophy, Sparkles, Clock, Flame } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  const currentArc = arcsData[currentArcIndex];
  const currentDay = currentArc?.days[currentDayIndex] || { 
    dayNumber: 0, 
    habits: [], 
    totalXp: 0 
  };
  
  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (currentArcIndex > 0) {
      setCurrentArcIndex(currentArcIndex - 1);
      setCurrentDayIndex(arcsData[currentArcIndex - 1].days.length - 1);
    }
  };
  
  const handleNextDay = () => {
    if (currentDayIndex < currentArc.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else if (currentArcIndex < arcsData.length - 1) {
      setCurrentArcIndex(currentArcIndex + 1);
      setCurrentDayIndex(0);
    }
  };
  
  const completedHabits = currentDay.habits.filter(h => h.completed).length;
  const totalHabits = currentDay.habits.length;

  const dailyQuests = [
    {
      id: '1',
      title: 'Knowledge Seeker',
      description: 'Read for 45 minutes today',
      image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg',
      color: '#FF4E4E',
      timeLeft: '2h 30m',
      streak: 3
    },
    {
      id: '2',
      title: 'Mind Mastery',
      description: 'Complete 20-minute meditation',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
      color: '#7A00F3',
      timeLeft: '5h 45m',
      streak: 7
    },
    {
      id: '3',
      title: 'Physical Peak',
      description: 'High-intensity workout session',
      image: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg',
      color: '#00B4D8',
      timeLeft: '1h 15m',
      streak: 5
    }
  ];

  const achievements = [
    {
      title: 'First Victory',
      description: 'Complete your first quest',
      icon: Trophy,
      progress: 100,
      color: '#FFD700'
    },
    {
      title: 'Focus Master',
      description: '7-day meditation streak',
      icon: Target,
      progress: 70,
      color: '#7A00F3'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <HeroBanner
          arc={currentArc}
          dayNumber={currentDay.dayNumber}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
        />
        
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['rgba(122, 0, 243, 0.1)', 'rgba(255, 78, 78, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statsGradient}
          >
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedHabits}/{totalHabits}</Text>
              <Text style={styles.statLabel}>TODAY'S PROGRESS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,250</Text>
              <Text style={styles.statLabel}>XP EARNED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>DAY STREAK</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DAILY QUESTS</Text>
          <View style={styles.questsContainer}>
            {dailyQuests.map((quest) => (
              <View key={quest.id} style={styles.questCard}>
                <Image
                  source={{ uri: quest.image }}
                  style={styles.questImage}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                  style={styles.questOverlay}
                >
                  <View style={styles.questContent}>
                    <View style={styles.questHeader}>
                      <Text style={styles.questTitle}>{quest.title}</Text>
                      <Text style={styles.questDescription}>{quest.description}</Text>
                    </View>
                    
                    <View style={styles.questMetrics}>
                      <View style={styles.metricItem}>
                        <Clock size={14} color={quest.color} />
                        <Text style={[styles.metricText, { color: quest.color }]}>
                          {quest.timeLeft}
                        </Text>
                      </View>
                      <View style={styles.metricItem}>
                        <Flame size={14} color={quest.color} />
                        <Text style={[styles.metricText, { color: quest.color }]}>
                          {quest.streak} streak
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
                
                <View style={styles.questActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.skipButton]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.skipButtonText}>SKIP</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.actionButton, styles.doneButton]}
                    activeOpacity={0.8}
                  >
                    <Sparkles color="#4CAF50" size={16} />
                    <Text style={styles.doneButtonText}>COMPLETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <View key={index} style={styles.achievementCard}>
                  <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                    <Icon color={achievement.color} size={24} />
                  </View>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDesc}>{achievement.description}</Text>
                  <View style={styles.achievementProgress}>
                    <View style={[styles.progressBar, { backgroundColor: `${achievement.color}20` }]}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${achievement.progress}%`,
                            backgroundColor: achievement.color 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: achievement.color }]}>
                      {achievement.progress}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statsGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 10,
    color: '#DCDCDC',
    opacity: 0.7,
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(220, 220, 220, 0.1)',
    marginHorizontal: 10,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    marginBottom: 16,
    letterSpacing: 1,
  },
  questsContainer: {
    gap: 16,
  },
  questCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
    overflow: 'hidden',
    marginBottom: 16,
  },
  questImage: {
    width: '100%',
    height: 160,
  },
  questOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  questContent: {
    gap: 12,
  },
  questHeader: {
    gap: 4,
  },
  questTitle: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  questDescription: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 14,
    color: '#DCDCDC',
    opacity: 0.9,
  },
  questMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
  },
  questActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#5A5A5A',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  skipButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRightWidth: 1,
    borderRightColor: '#5A5A5A',
  },
  doneButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  doneButtonText: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    color: '#4CAF50',
    letterSpacing: 1,
  },
  skipButtonText: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    color: '#F44336',
    letterSpacing: 1,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#5A5A5A',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 12,
    color: '#DCDCDC',
    opacity: 0.7,
    marginBottom: 12,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
  },
});