import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Recipe } from './pages/Recipe';
import { Profile } from './pages/Profile';
import { CreateRecipe } from './pages/CreateRecipe';
import { Search } from './pages/Search';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 pt-20 pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;