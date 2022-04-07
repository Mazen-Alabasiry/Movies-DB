import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Movie from './pages/MoviePage'
import NotFound from './pages/NotFound'
function App() {
  return <main>
    <Switch>
      <Route exact path='/'><Home /></Route>
      <Route path='/movie/:id'><Movie /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </main>
}

export default App
