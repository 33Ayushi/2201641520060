import { Routes, Route, Link } from 'react-router-dom'
import Home from './routes/Home'
import Stats from './routes/Stats'
import Redirector from './routes/Redirector'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<Redirector />} />
      </Routes>
    </>
  )
}

export default App
