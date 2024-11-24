import "./App.css";
import { Route, Routes } from "react-router-dom";

import { UserProvider } from "./components/UserContext";
import BookDetailsPage from "./components/BookDetailsPage";
import AllBooksPage from "./components/AllBooksPage";
import Login from "./components/Login";
import Register from "./components/Register";
import FavoriteBooksPage from "./components/FavoriteBooksPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div className="App bg-darkPurple">
      <UserProvider>
        <Routes>
          <Route path="/" element={<AllBooksPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allbooks" element={<AllBooksPage />} />
          <Route path="/favorites" element={<FavoriteBooksPage />} />
          <Route path="/detail/:id" element={<BookDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
