import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '🫩', label: 'Tired' },
    { emoji: '😞', label: 'Drained' },
    { emoji: '🤔', label: 'Confused' },
    { emoji: '🤍', label: 'Neutral' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hi Swechchha 💛</Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood.label && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood.label)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <>
          <Text style={styles.selectedText}>
            You selected: <Text style={{ fontWeight: 'bold' }}>{selectedMood}</Text>
          </Text>

          <Text style={styles.selectedText}>
            Would you like to journal about your feelings or get a simple, heartfelt message?
          </Text>

          <View style={{ marginBottom: 10 }}>
            <Button 
              title="Journal"
              onPress={() => alert('Journal feature coming soon!')}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Button 
              title="Heartfelt Message"
              onPress={() => alert('Here is a heartfelt message for you!')}
              color="#FF6347"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFBEA',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    width: 90,
    height: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  selectedMood: {
    backgroundColor: '#FFEBB7',
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
  selectedText: {
    marginTop: 30,
    fontSize: 18,
    color: '#333',
  },
});