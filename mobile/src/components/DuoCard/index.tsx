import { GameController } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface IDuo {
    hourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface DuoCardProps {
  data: IDuo,
  onConnect: () => void;
}

export function DuoCard({
    data,
    onConnect
  }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      ></DuoInfo>
      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      ></DuoInfo>
      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      ></DuoInfo>
      <DuoInfo
        label='Chamada de áudio'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      ></DuoInfo>

      <TouchableOpacity
      onPress={onConnect}
        style={styles.button}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        ></GameController>
        <Text
          style={styles.buttonTitle}
        >
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}