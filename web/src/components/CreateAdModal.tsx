import React, { FormEvent, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { CaretDown, CaretRight, Check, GameController } from 'phosphor-react';
import Input from './Form/Input';
import { IGame } from '../App';
import axios from 'axios';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectGame] = useState<string>('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateAd = (event: FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);

    if(!selectedGame.length || !data.name || !data.discord) {
      MySwal.fire({
        title: 'Todos os campos são obrigatórios',
        showCloseButton: true,
        icon: 'error',
        background: '#f66060',
        iconColor: '#FFF',
        color: "#FFF",
        showConfirmButton: false,
        toast: true,
        allowOutsideClick: true,
        position: 'top-right'
      })
      return;
    }

    try {
      axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel
      });
  
      MySwal.fire({
        title: 'Anúncio criado com sucesso',
        showCloseButton: true,
        icon: 'success',
        background: '#8b5cf6',
        color: "#FFF",
        showConfirmButton: false,
        toast: true,
        allowOutsideClick: true,
        position: 'top-right'
      })
    } catch(error) {
      MySwal.fire({
        title: 'Não foi possível criar o seu anúncio',
        showCloseButton: true,
        icon: 'error',
        background: '#f66060',
        iconColor: '#FFF',
        color: "#FFF",
        showConfirmButton: false,
        toast: true,
        allowOutsideClick: true,
        position: 'top-right'
      });
      console.error('Error: ', error)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-black/25 w-[480px]'>
        <Dialog.Title className='text-3xl text-white font-black'>
          Publique um anúncio
        </Dialog.Title>

          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="game" className='font-semibold'>Qual o game?</label>
              <Select.Root onValueChange={(value) => {
                setSelectGame(value);
              }}>
                <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex justify-between items-center'>
                  <Select.Value  placeholder="Selecione o game que deseja jogar"/>
                  <Select.Icon>
                    <CaretDown></CaretDown>
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal className='mt-12 bg-zinc-900 rounded-lg top-0 shadow-black'>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport  className='text-white'>
                      {games.map(game => {
                        return (
                          <Select.Item value={game.id} className='p-4 hover:bg-zinc-700 cursor-pointer'>
                            <Select.ItemText>{game.title}</Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        )
                      })}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input name='name' id='name' type='text' placeholder='Como te chamam dentro do game?'/>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO'/>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input name='discord' id='discord' type='text' placeholder='Usuario#0000'/>
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <ToggleGroup.Root 
                    type='multiple'
                    className='grid grid-cols-4 gap-2'
                    onValueChange={setWeekDays}
                    value={weekDays}
                  >
                    <ToggleGroup.Item
                      key={0}
                      value='0' 
                      title='Domingo'
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={1}
                      value='1' 
                      title='Segunda'
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={2}
                      value='2' 
                      title='Terça'
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={3}
                      value='3'
                      title='Quarta'
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={4}
                      value='4'
                      title='Quinta'
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={5}
                      value='5'
                      title='Sexta'
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      key={6}
                      value='6'
                      title='Sábado'
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input name='hourStart' id='hourStart' type='time' placeholder='De'></Input>
                  <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até'></Input>
                </div>
              </div>
            </div>

            <div className='mt-2 flex gap-2 text-sm items-center'> 
              <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if(checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                className='w-6 h-6 rounded  p-1 bg-zinc-900'>
                <Checkbox.Indicator>
                  <Check className='w-4 h-4 text-emerald-400'></Check>
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </div>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
              <button 
                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' 
                type="submit"
              >
                <GameController size={24}></GameController>
                Encontrar duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CreateAdModal