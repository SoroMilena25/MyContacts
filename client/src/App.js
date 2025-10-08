import axios from 'axios';
import './App.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './Pages/Connexion'
import Inscription from './Pages/Inscription'
import Contacts from './Pages/Contacts'
import AddContact from './Pages/AddContact'
import ModifierContact from './Pages/ModifierContact'

function App() {

  const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    console.log(data)
  })
}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />}></Route>
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/ajoutContact" element={<AddContact />} />
          <Route path="/modifierContact/:id" element={<ModifierContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
