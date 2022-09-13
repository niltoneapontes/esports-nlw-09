import { useState } from 'react'
import './styles/main.css'
import { MagnifyingGlassPlus } from 'phosphor-react'

import logoImg from './assets/logo.svg';

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
    <img src={logoImg}></img>
    <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>
   
    <div className="grid grid-cols-6 gap-6 mt-16">
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game1.png" alt="Game image" />
        <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game2.png" alt="Game image" />
      
              <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game3.png" alt="Game image" />
      
              <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game5.png" alt="Game image" />
      
              <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game6.png" alt="Game image" />
      
              <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
      <a href='' className='relative rounded-lg overflow-hidden'>
        <img src="/game7.png" alt="Game image" />
      
              <div className='w-full pt-16 pb-4 px-4 bg-box-gradient absolute bottom-0 left-0 right-0'>
          <strong className='font-bold text-white block'>League Of Legends</strong>
          <span className='text-zinc-300 text-sm block mt-1'>4 anúncios</span>
        </div>
      </a>
    </div>

    <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden'>
      <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
        <div>
          <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
          <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
        </div>

        <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
          <MagnifyingGlassPlus size={24}></MagnifyingGlassPlus>
          Publicar anúncio
        </button>
      </div>
    </div>
   </div>
  )
}

export default App
