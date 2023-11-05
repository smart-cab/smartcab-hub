import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.scss";
import AppLayout from './layout/AppLayout';
import ControlPage from "./ControlPage.js";

//
// const express = require("express")
// const app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//

function App() {
	return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/scenaries' element={<ControlPage />} />
                    <Route path='/started' element={<ControlPage />} />
                    <Route path='/calendar' element={<ControlPage />} />
                    <Route path='/user' element={<ControlPage />} />
                    <Route path='/order' element={<ControlPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
	);
}

export default App;
