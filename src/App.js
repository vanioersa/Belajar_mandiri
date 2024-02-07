import './App.css';
import Navbar from './component/navbar';
import Map from "./crud/Table";
import TambahProduk from './crud/Tambah';
import Edit from "./crud/Edit";
import Detail from "./page/Detail";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />  
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/tambah" element={<TambahProduk />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
