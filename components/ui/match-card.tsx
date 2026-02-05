import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

export const MatchCard = (match: any) => {
  return <Link
    href={{
      pathname: '/matches/[matchId]',
      params: { matchId: match.id }
    }}
    asChild>
    <Pressable>
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
    </ThemedView>
    </Pressable>
  </Link>
} 

const styles = StyleSheet.create({
  matchCard: {
    marginVertical: 16,
    marginHorizontal: 4,
    gap: 4,
   }
});
