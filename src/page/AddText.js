import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'

const AddText = () => {
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    const [text4, setText4] = useState('')
    const [text5, setText5] = useState('')
    const [text6, setText6] = useState('')
    const [text7, setText7] = useState('')
    const [text8, setText8] = useState('')
    const {syllabusId} = useParams()
    const navigate=useNavigate()

    const putCreateSyllabus = () => {
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/text/${syllabusId}`, {
                "text": {
                    text2,
                    text3,
                    text4,
                    text5,
                    text6,
                    text7,
                    text8
                }
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate(`/add/${syllabusId}/step4`)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return(
        <div className="container">
            <div className="section__navigation">
                <Link to="/"><p className="last-page">Главное</p></Link>
                <img src={RightIcon} alt=""/>
                <p className="current-page">Добавить syllabus</p>
            </div>
            <div className='add__container'>
                <div className='add__container-title'>
                    <Link to="/projects"><img src={Button} alt=""/></Link>
                    <h2>Общие положения</h2>
                </div>
                <div className='add__container-form'>
                    <h3>Краткое описание содержания дисциплины</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text2}
                            onChange={e=>setText2(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Цель преподавания дисциплины</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text3}
                            onChange={e=>setText3(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Задача дисциплины</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text4}
                            onChange={e=>setText4(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Ожидаемые результаты обучения и формируемые компетенции</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text5}
                            onChange={e=>setText5(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Пререквизиты курса</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text6}
                            onChange={e=>setText6(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Постреквизиты курса</h3>
                   
                    <div className='textarea-box'>
                        <textarea 
                            className='textarea' 
                            type="text"
                            value={text7}
                            onChange={e=>setText7(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <h3>Формат обучения</h3>
                   
                    <div className='input-box'>
                        <input
                            className='input' 
                            type="text"
                            value={text8}
                            onChange={e=>setText8(e.target.value)}
                            required/>
                        <div className='labelline'>Заполните поля</div>
                    </div>
                    <div className='add__container-buttons'>
                        <button onClick={()=>putCreateSyllabus()} className='further__button'>Далее</button>
                        <Link to="/"><button className='cancel__button'>Отмена</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddText;