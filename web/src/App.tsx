import { useEffect, useState } from 'react'
import './styles/main.css'

import logoImg from './assets/logo.svg';
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import CreateAdModal from './components/CreateAdModal';
import * as Dialog from '@radix-ui/react-dialog'

export interface IGame {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error(error));
  }, [])

  return (
   <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
    <img src={logoImg}></img>
    <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>
   
    <div className="grid grid-cols-6 gap-6 mt-16">
      {games.map(game => {
        return (
          <GameBanner
            key={game.id}
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerURL}
          />
        )
      })}
    </div>
    <Dialog.Root>
      <CreateAdBanner></CreateAdBanner>
      <CreateAdModal></CreateAdModal>
    </Dialog.Root>

   </div>
  )
}

export default App
