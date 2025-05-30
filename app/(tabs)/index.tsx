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
import { BookOpen, Dumbbell, Brain, Target, Trophy, Sparkles } from 'lucide-react-native';
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
      icon: BookOpen,
      color: '#FF4E4E',
      xp: 150,
      progress: 0.7
    },
    {
      id: '2',
      title: 'Mind Mastery',
      description: 'Complete 20-minute meditation',
      icon: Brain,
      color: '#7A00F3',
      xp: 100,
      progress: 0.4
    },
    {
      id: '3',
      title: 'Physical Peak',
      description: 'High-intensity workout session',
      icon: Dumbbell,
      color: '#00B4D8',
      xp: 200,
      progress: 0.9
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
            {dailyQuests.map((quest) => {
              const Icon = quest.icon;
              return (
                <View key={quest.id} style={styles.questCard}>
                  <View style={styles.questMain}>
                    <View style={[styles.questIcon, { backgroundColor: `${quest.color}20` }]}>
                      <Icon color={quest.color} size={24} />
                    </View>
                    <View style={styles.questContent}>
                      <Text style={styles.questTitle}>{quest.title}</Text>
                      <Text style={styles.questDescription}>{quest.description}</Text>
                      <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { backgroundColor: `${quest.color}20` }]}>
                          <View 
                            style={[
                              styles.progressFill, 
                              { 
                                width: `${quest.progress * 100}%`,
                                backgroundColor: quest.color 
                              }
                            ]} 
                          />
                        </View>
                        <Text style={[styles.xpText, { color: quest.color }]}>
                          +{quest.xp} XP
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.questActions}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.doneButton]}
                      activeOpacity={0.8}
                    >
                      <Sparkles color="#4CAF50" size={16} />
                      <Text style={styles.doneButtonText}>COMPLETE</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.skipButton]}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.skipButtonText}>SKIP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
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
  },
  questMain: {
    flexDirection: 'row',
    padding: 16,
  },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  questContent: {
    flex: 1,
  },
  questTitle: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  questDescription: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 14,
    color: '#DCDCDC',
    opacity: 0.7,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  xpText: {
    fontFamily: 'SpaceMono-Bold',
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
  doneButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRightWidth: 1,
    borderRightColor: '#5A5A5A',
  },
  skipButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
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
  progressText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
  },
});