import { createRequest } from '@/api/requst';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MatchCard } from '@/components/ui/match-card';
import { useQuery } from '@tanstack/react-query';
import dayjs, { ManipulateType } from 'dayjs';
import { useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Экран с поиском

// На данном экране пользователь должен выбрать следующие фильтры:

// Лига
// Временной отрезок ( день, неделя, месяц )
// После того, как пользователь выбрал все фильтры, ему должны отобразиться предстоящие матчи в данной лиге на данном временном отрезки ( например, предстоящие матчи в Ла-Лиге на ближайший месяц )

// Также должна быть доступна кнопка "Архив".По нажатию на эту кнопку перед пользователем отображаются все завершенные матчи в данной лиге.

const times = [{
  label: "День",
  value: 'day',
}, {
  label: "Неделя",
  value: 'week'
}, {
  label: 'Месяц',
  value: 'month'
}]

const getDate = (string: ManipulateType) => dayjs().add(1, string).toISOString().split('T')[0]

export default function Search() {
  const [upcoming, setUpcoming] = useState(true)
  const [leagueValue, setLeagueValue] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState<ManipulateType | null>(null);
  
  const { data: leagues } = useQuery({
    queryKey: ['leagues'],
    queryFn: () => createRequest(`/Leagues`),
  })

  const { data: matches, isFetching } = useQuery({
    queryKey: ['gamesList', leagueValue, upcoming, timeValue],
    enabled: !!leagueValue && !!timeValue,
    queryFn: () => createRequest(`/Games/list?LeagueId=${leagueValue}&${upcoming ? "Upcoming=True" : 'Ended=True'}&To=${getDate(timeValue!)}`),
  })

  return (
    <ThemedView style={styles.content}>
     <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={leagues ?? []}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder='Выберите лигу'
        searchPlaceholder="Поиск"
        disable={isFetching}
        value={leagueValue}
        onChange={item => {
          setLeagueValue(item.id);
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={times}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Выберите временной отрезок'
        value={timeValue}
        disable={isFetching}
        onChange={item => {
          setTimeValue(item.value);
        }}
      />
      <Button onPress={() => setUpcoming(state => !state)} title={upcoming ? 'Показать архив' : 'Показать будующие матчи'} color={'blue'} disabled={isFetching} />
      {isFetching && <ThemedText type='defaultSemiBold'>
        Загрузка...
      </ThemedText>}

      <FlatList
        data={matches}
        renderItem={({ item }) => <MatchCard {...item}/>}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  container: {
      padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'white',
  },
});
