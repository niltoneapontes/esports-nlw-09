import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

interface IGame {
  _count: {ads: number;};
  bannerURL: string; 
  id: string; 
  title: string;
}

export function Home() {
  const [games, setGames] = useState<IGame[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.243:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
    .catch(error => console.error(error));
  }, [])

  const handleOpenGame = ({id, title, bannerURL}: IGame) => {
    navigation.navigate('game', {id, title, bannerURL});
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.logo}></Image>
      <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..."></Heading>
      
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            onPress={() => {
              handleOpenGame(item);
            }}
            data={item}
          ></GameCard>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      ></FlatList>
    </SafeAreaView>
    </Background>
  );
}