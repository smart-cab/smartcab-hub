import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.scss";
import AppLayout from './AppLayout';
import ControlPage from "./ControlPage";
import GradeCard from "./GradeCard";


function getData() {
    return data
}


function App() {
	return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/scenaries' element={<ControlPage />} />
                    <Route path='/started' element={<GradeCard />} />
                    <Route path='/calendar' element={<div />} />
                    <Route path='/user' element={<div />} />
                    <Route path='/order' element={<div />} />
                </Route>
            </Routes>
        </BrowserRouter>
	);
}

export default App;
