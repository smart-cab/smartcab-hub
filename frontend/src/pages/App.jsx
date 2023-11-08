import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.scss";
import AppLayout from './AppLayout';
import ControlPage from "./ControlPage";


// const express = require("express")
// const app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

function getData() {


    return data
}


function App() {
	return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/scenaries' element={<ControlPage />} />
                    <Route path='/started' element={<div />} />
                    <Route path='/calendar' element={<div />} />
                    <Route path='/user' element={<div />} />
                    <Route path='/order' element={<div />} />
                </Route>
            </Routes>
        </BrowserRouter>
	);
}

export default App;
