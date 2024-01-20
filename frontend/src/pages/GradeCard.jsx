import React, {useState} from 'react';
import './GradeCard.scss';
import Hiding from '../components/Hiding';


function GradeButton({left, top, icon, color}) {
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
                // onClick={}
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
    // setIsShown(current => !current);
        setIsShown(false);
    };



    return (
        <div>
            {isShown && (
                <div>
                    <Hiding layout="all"/>

                    <button className="CloseHiding" onClick={CloseHiding}>
                        <img width="65px" src="close.svg" alt="close"/>
                    </button>

                    <div className="card">
                        <h1 className="card-title">Как вам урок?</h1>

                        <GradeButton top="60%" left="15%" icon="grade-best.png" color="red" />
                        <GradeButton top="60%" left="38%" icon="grade-thinking.png" color="	#7F00FF"/>
                        <GradeButton top="60%" left="62%" icon="grade-sleep.png" color="#0096FF"/>
                        <GradeButton top="56%" left="85%" icon="grade-headboom.png" color="green"/>

                    </div>

                </div>
            )}
        </div>
    )
}


export default GradeCard;
