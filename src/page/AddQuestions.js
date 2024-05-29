import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'
import DeleteIcon from '../images/icons/deleteIcon.svg'

const AddQuestions = () => {
    const {syllabusId} = useParams()
    const [questions1, setQuestions1] = useState([""])
    const [questions2, setQuestions2] = useState([""])
    const navigate = useNavigate()

    const UpdateState1 = (index) => (e)=> {
        const newArray = [...questions1]
        newArray[index]=e.target.value
        setQuestions1(newArray)
    }

    const Delete1 = (index) => {
        const newArray = [...questions1]
        newArray.splice(index, 1)
        setQuestions1(newArray)
    }

    const AddQuestions1 = () => {
        const newArray = [...questions1]
        newArray.push("")
        setQuestions1(newArray)
    }

    const UpdateState2 = (index) => (e)=> {
        const newArray = [...questions2]
        newArray[index]=e.target.value
        setQuestions2(newArray)
    }

    const Delete2 = (index) => {
        const newArray = [...questions2]
        newArray.splice(index, 1)
        setQuestions2(newArray)
    }

    const AddQuestions2 = () => {
        const newArray = [...questions2]
        newArray.push("")
        setQuestions2(newArray)
    }

    const putCreateSyllabus = () => {
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/question/${syllabusId}`, {
                "question1": {
                    "questions" : questions1
                },
                "question2": {
                    "questions" : questions2
                }
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate(`/add/${syllabusId}/step5`)
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
                    <h2>Вопросы</h2>
                </div>
                <div className='add__container-form'>
                    <h3>Вопросы к рубежному контролю №1</h3>
                    {questions1.map((e, index) => (
                    <div className="step2__input">
                        <div className='input-box'>
                            <input
                                className='input' 
                                type="text"
                                value={e}
                                onChange={UpdateState1(index)}
                                required/>
                            <div className='labelline'>{index+1}</div>
                        </div>
                        <img onClick={()=>Delete1(index)} src={DeleteIcon} alt=""/>
                    </div>
                    ))}
                    <p onClick={()=>AddQuestions1()} className="add_to__module">Добавить вопросы к рубежному контролю №1</p>
                    <div className="line"></div>
                    <h3>Вопросы к рубежному контролю №2</h3>
                    {questions2.map((e, index) => (
                    <div className="step2__input">
                        <div className='input-box'>
                            <input
                                className='input' 
                                type="text"
                                value={e}
                                onChange={UpdateState2(index)}
                                required/>
                            <div className='labelline'>{index+1}</div>
                        </div>
                        <img onClick={()=>Delete2(index)} src={DeleteIcon} alt=""/>
                    </div>
                    ))}
                    <p onClick={()=>AddQuestions2()} className="add_to__module">Добавить вопросы к рубежному контролю №2</p>
                </div>
                <div className='add__container-buttons'>
                    <button onClick={()=>putCreateSyllabus()} className='further__button'>Далее</button>
                    <Link to="/"><button className='cancel__button'>Отмена</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AddQuestions;