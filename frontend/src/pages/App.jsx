import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.scss";
import AppLayout from './AppLayout';
import ControlPage from "./ControlPage";
import GradeCard from "./GradeCard";
import Pin from "../components/Pin";

function App() {
	return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route path='/scenaries' element={<ControlPage />} />
                    <Route path='/grade' element={<GradeCard />} />
                    <Route path='/pin' element={<Pin />} />
                    <Route path='/settings' element={<div />} />
                </Route>
            </Routes>
        </BrowserRouter>
	);
}

export default App;
