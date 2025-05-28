import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Arc } from '@/data/habitsData';

interface ActProgressionProps {
  arcs: Arc[];
  currentArcIndex: number;
  onSelectArc: (index: number) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function ActProgression({ 
  arcs, 
  currentArcIndex,
  onSelectArc 
}: ActProgressionProps) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.timeline}>
        <View style={styles.line} />
        
        {arcs.map((arc, index) => {
          const isCompleted = index < currentArcIndex;
          const isCurrent = index === currentArcIndex;
          
          return (
            <View key={arc.id} style={styles.arcContainer}>
              <View style={styles.connector}>
                <View style={[
                  styles.dot,
                  isCompleted && styles.completedDot,
                  isCurrent && styles.currentDot
                ]} />
              </View>
              
              <TouchableOpacity
                style={[
                  styles.card,
                  isCurrent && styles.currentCard
                ]}
                onPress={() => onSelectArc(index)}
                activeOpacity={0.8}
              >
                <Image 
                  source={{ uri: arc.imageUrl }}
                  style={styles.image}
                />
                
                <LinearGradient
                  colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                  style={styles.overlay}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.arcName}>{arc.name}</Text>
                    <Text style={styles.arcDescription}>{arc.description}</Text>
                    
                    <View style={[
                      styles.status,
                      isCompleted && styles.completedStatus,
                      isCurrent && styles.currentStatus
                    ]}>
                      <Text style={[
                        styles.statusText,
                        isCompleted && styles.completedStatusText,
                        isCurrent && styles.currentStatusText
                      ]}>
                        {isCompleted ? 'COMPLETED' : isCurrent ? 'IN PROGRESS' : 'LOCKED'}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    paddingVertical: 40,
  },
  timeline: {
    paddingHorizontal: 20,
  },
  line: {
    position: 'absolute',
    left: 29,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#333',
  },
  arcContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  connector: {
    width: 60,
    alignItems: 'center',
    paddingTop: 20,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    borderWidth: 3,
    borderColor: '#0F0F0F',
  },
  completedDot: {
    backgroundColor: '#7A00F3',
    borderColor: '#7A00F3',
  },
  currentDot: {
    backgroundColor: '#FF4E4E',
    borderColor: '#FF4E4E',
  },
  card: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  currentCard: {
    borderColor: '#FF4E4E',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  cardContent: {
    gap: 8,
  },
  arcName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  arcDescription: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 16,
    color: '#DCDCDC',
    opacity: 0.8,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    borderRadius: 4,
    marginTop: 8,
  },
  completedStatus: {
    backgroundColor: 'rgba(122, 0, 243, 0.2)',
  },
  currentStatus: {
    backgroundColor: 'rgba(255, 78, 78, 0.2)',
  },
  statusText: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
  },
  completedStatusText: {
    color: '#7A00F3',
  },
  currentStatusText: {
    color: '#FF4E4E',
  },
});