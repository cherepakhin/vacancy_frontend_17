import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddVacancy from "./components/add-vacancy.component";
import Vacancy from "./components/vacancy.component";
import VacancyList from "./components/vacancy-list.component";

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/vacancy"} className="nav-link">
                Список вакансий
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Добавить
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<VacancyList/>} />
            <Route path="/vacancy" element={<VacancyList/>} />
            <Route path="/add" element={<AddVacancy/>} />
            <Route path="/vacancies/:n" element={<Vacancy/>} />
          </Routes>
        </div>
      </div>
  );
}


export default App;
