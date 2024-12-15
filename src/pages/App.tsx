import { Route, Routes } from 'react-router'
import Home from './home'
import { GifProvider } from '../context/GifContext'
import Favourites from './favourites'
import SearchedTerm from './search'

function App() {
  return (
    <>
      <GifProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:term" element={<SearchedTerm />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </GifProvider>
    </>
  )
}

export default App
