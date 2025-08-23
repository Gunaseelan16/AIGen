import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WriteArticle from './pages/WriteArticle'
import Dashboard from './pages/Dashboard'
import VideoGen from './pages/VideoGen'
import RemoveObject from './pages/RemoveObjects'
import RemoveBackground from './pages/RemoveBackground'
import Layout from './pages/Layout'
import GenerateImages from './pages/GenerateImages'
import Community from './pages/Community'
import { useAuth } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

const App = () => {
 


  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='video-gen' element={<VideoGen />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='generate-image' element={<GenerateImages />} />
          <Route path='community' element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
