import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, IDuo } from '../../components/DuoCard';
import { DuoMath } from '../../components/DuoMath';

interface GameProps {
  id: string;
  title: string;
  bannerURL: string;
}

export function Game() {
  const [duos, setDuos] = useState<IDuo[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameProps;

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.243:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => {
      setDiscordDuoSelected(data.discord)
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    fetch(`http://192.168.0.243:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
    .catch(error => console.error(error));
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View
         style={styles.header}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Entypo 
              name='chevron-thin-left' 
              color={THEME.COLORS.CAPTION_300}
              size={20}
            ></Entypo>
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          ></Image>

          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerURL}}
          style={styles.cover}
          resizeMode='cover'
        ></Image>

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        ></Heading>
        
        <FlatList
          data={duos}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <DuoCard
                onConnect={async() => {
                  await getDiscordUser(item.id);
                }}
                data={item}
              ></DuoCard>
            )
          }}
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContainer]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios ativos para esse jogo. :(
            </Text>
          )}
        ></FlatList>

        <DuoMath
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => {
            setDiscordDuoSelected('');
          }}
        ></DuoMath>
      </SafeAreaView>
    </Background>
  );
}