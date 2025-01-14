import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SudokuSolver from './Suduko'
import SudukoGrid from './Components/SudukoGrid'


function App() {


  return (
   <div className='h-screen w-full flex justify-center items-center'>
    {/* <SudokuSolver/> */}
    <SudukoGrid/>
   </div>
  )
}

export default App
