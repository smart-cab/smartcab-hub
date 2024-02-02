import React, {useState} from 'react';
import './GradeCard.scss';
import Hiding from '../components/Hiding';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Voting(code) {
    axios.post('http://127.0.0.1:5000/new_vote', null, 
        {
            params: {
                vote: code, 
            }
        }
    ).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    })
};


function GradeButton({left, top, icon, color, onClick}) {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(true);
    };

    const handleRelease = () => {
        setIsPressed(false);
    };

    const buttonStyle = {
        width: isPressed ? '30%' : '20%', // Изменяем ширину изображения
        transition: 'width 0.4s', // Добавляем плавность анимации
        transform: 'translate(-50%, -50%)', // Центрируем изображение
        borderRadius: "40%", 
        left: left,
        top: top,
        zIndex: 51,
        borderWidth: 0,
        position: "fixied",
    };

    return (
        <div >
            <div className='shadow' 
                style={{
                    width: isPressed ? "23%" : "16%",
                    height: isPressed ? "23%" : "16%",
                    position: "fixed",
                    transition: 'width 0.2s', // Добавляем плавность анимации
                    zIndex: 50,
                    transform: 'translate(-50%, -50%)', // Центрируем изображение
                    left: left,
                    top: top,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color} 0%, ${color} 100%)` ,
                    filter: "blur(70px)",
                }}/>
            <img 
                className="GradeButton" 
                onClick={onClick}
                style={buttonStyle}
                onMouseDown={handlePress}
                onMouseUp={handleRelease}
                onMouseLeave={handleRelease}
                onTouchStart={handlePress}
                onTouchEnd={handleRelease}
                src={icon}
                alt="grade-best"
            />
        </div>
        
    )
}


function GradeCard() {
    const [isShown, setIsShown] = useState(true);

    const CloseHiding = _ => {
        setIsShown(false);
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
    }
        setOpen(false);
    };

    const [isFrozen, setFrozen] = useState(false);

    const freezePage = () => {
        setFrozen(true);
        setTimeout(() => {
        setFrozen(false);
        }, 2000);
    };

    return (
        <div>
            {isShown && (
                <div>
                    <Hiding layout="all"/>



                    <button className="CloseHiding" onClick={CloseHiding}>
                        <img width="45px" src="close.svg" alt="close"/>
                    </button>

                    {isFrozen && <div 
                        style={{ 
                            position: 'fixed', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            background: 'rgba(255, 255, 255, 0.0)', 
                            zIndex: 9999 }}></div>}

                    <Snackbar
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'down', horizontal: 'center' }}
                        style={{ top: "80%"}}
                    >
                        <Alert onClose={handleClose} severity="success">
                            Спасибо! Ваш голос учтён
                        </Alert>
                    </Snackbar>


                    <div className="card">
                        <h1 className="card-title">Как вам урок?</h1>

                        <GradeButton top="60%" left="15%" icon="grade-best.png" color="red" onClick={function(event){ 
                            Voting("beast"); 
                            handleOpen(); 
                            freezePage() }}/>
                        <GradeButton top="60%" left="38%" icon="grade-thinking.png" color="	#7F00FF" onClick={function(event){
                            Voting("thinking");
                            handleOpen();
                            freezePage() }}/>
                        <GradeButton top="60%" left="62%" icon="grade-sleep.png" color="#0096FF" onClick={function(event){ 
                            Voting("sleep");
                            handleOpen(); 
                            freezePage() }}/>
                        <GradeButton top="56%" left="85%" icon="grade-headboom.png" color="green" onClick={function(event){
                            Voting("headboom");
                            handleOpen();
                            freezePage() }}/>

                    </div>

                </div>
            )}
        </div>
    )
}


export default GradeCard;
