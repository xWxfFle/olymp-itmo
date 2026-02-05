import { createRequest } from '@/api/requst';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function MatchScreen() {
  const { matchId } = useLocalSearchParams()
  const { data: matches, isFetching } = useQuery({
    queryKey: ['gamesList', matchId],
    queryFn: () => createRequest(`/Games/${matchId}`),
  })

  return (
    <ThemedView style={styles.content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Добро пожаловать! на матч</ThemedText>
        <HelloWave />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
   content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  matchCard: {
    marginVertical: 16,
    marginHorizontal: 4,
    gap: 4,
   }
});
