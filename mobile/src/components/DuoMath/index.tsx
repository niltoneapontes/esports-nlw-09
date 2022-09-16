import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMath({discord, onClose, ...rest}: DuoMatchProps) {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord copiado!', 'Agora é só colar no discord e iniciar os jogos :)');
    setIsCopying(false);
  }

  return (
    <Modal 
      animationType='fade'
      transparent 
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            onPress={() => onClose()}
            style={styles.closeIcon}>
              <MaterialIcons
                name='close'
                size={20}
                color={THEME.COLORS.CAPTION_500}
              ></MaterialIcons>
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          ></CheckCircle>

          <Heading 
            title="Let's play" 
            subtitle='Agora é só começar a jogar!'
            style={{alignItems: 'center', marginTop: 24}}
          ></Heading>

          <Text
            style={styles.label}
          >
            Adicione no discord
          </Text>

          <TouchableOpacity 
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}></ActivityIndicator> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}