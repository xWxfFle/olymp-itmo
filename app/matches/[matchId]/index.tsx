import { createRequest } from '@/api/requst';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function MatchScreen() {
  const { matchId } = useLocalSearchParams()
  const { data: data } = useQuery({
    queryKey: ['gamesList', matchId],
    queryFn: () => createRequest(`/Games/${matchId}`),
  })

  const match = data?.game

  if (!match) {
    return <ThemedView>
      <ThemedText>
        Загрузка...
     </ThemedText>
   </ThemedView>
  }
  
  return (
    <ThemedView style={styles.content} >
     <ThemedView style={styles.matchCard}>
    <ThemedText>
      Домашняя команда - Гостевая команда
    </ThemedText>
    <ThemedText type='title' >
      {match.homeTeam.name} - {match.awayTeam.name}
    </ThemedText>
    <ThemedText type='defaultSemiBold'>
      Страна: {match.season.league.country.name}
    </ThemedText>
    <ThemedText type='defaultSemiBold'>
      Сезон: {match.season.league.name}
    </ThemedText>
    <ThemedText type='subtitle'>
      {new Date(match.date).toLocaleString()}
    </ThemedText>
    <ThemedText type='defaultSemiBold'>
      Статус: {match.statusName === "Finished" ? 'Завершен' : "Еще не начался"}
    </ThemedText>
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
