import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'
import DeleteIcon from '../images/icons/deleteIcon.svg'
import { toast } from "react-toastify"

const EditStep3 = () => {
    const navigate=useNavigate()
    const {syllabusId} = useParams();
    const [topics, setTopics] = useState([])

    const putCreateSyllabus = () => {
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/topic/${syllabusId}`, {
                topics
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                toast.success("Успешно изменился")
            })
            .catch(error => {
                console.log(error)
                toast.error("Error")
            })
    }

    const updateStateModule = (index) => (e)=> {
        const newArray = [...topics]
        newArray[index].moduleName=e.target.value;
        setTopics(newArray)
    }

    const updateStateTopicName = (index, i) => (e)=> {
        const newArray = [...topics]
        newArray[index].topic[i].topicName=e.target.value;
        setTopics(newArray)
    }

    const updateStateLK = (index, i) => (e)=> {
        const newArray = [...topics]
        newArray[index].topic[i].LK=e.target.valueAsNumber;
        setTopics(newArray)
    }

    const updateStateSPZ = (index, i) => (e)=> {
        const newArray = [...topics]
        newArray[index].topic[i].SPZ=e.target.valueAsNumber;
        setTopics(newArray)
    }

    const updateStateSRO = (index, i) => (e)=> {
        const newArray = [...topics]
        newArray[index].topic[i].SRO=e.target.valueAsNumber;
        setTopics(newArray)
    }

    const updateStateLiterature = (index, i) => (e)=> {
        const newArray = [...topics]
        newArray[index].topic[i].literature=e.target.value;
        setTopics(newArray)
    }

    const AddToModule = () => {
        const newArray = [...topics]
        newArray.push({"moduleName" : "",
        "topic" : [{
            "topicName" : "",
            "literature" : "", 
            "LK" : '',
            "SPZ" : '',
            "SRO" : ''
        }]})
        setTopics(newArray)
    }

    const AddToTopic = (index) => {
        const newArray = [...topics]
        newArray[index].topic.push({
            "topicName" : "",
            "literature" : "", 
            "LK" : '',
            "SPZ" : '',
            "SRO" : ''
        })
        setTopics(newArray)
    }

    const DeleteModule = (index) => {
        const newArray = [...topics]
        newArray.splice(index, 1)
        setTopics(newArray)
    }

    const DeleteTopic = (index, i) => {
        const newArray = [...topics]
        newArray[index].topic.splice(i, 1)
        setTopics(newArray)
    }

    const getSyllabusById = () => {
        const token = localStorage.getItem("s_token")
		axios
			.get(`http://185.146.1.71/pdf/syllabus/${syllabusId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                setTopics(result.data.topics)
			})
			.catch(error => {
                console.log(error)
			})
    }

    useEffect(()=>{
        getSyllabusById()
    }, [])

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
                    <h2>Тематическое содержание дисциплины и распределение
                    часов по видам занятий</h2>
                </div>
                <div className='add__container-form'>
                    {topics.map((e, index) =>(
                    <div>
                    <h3>{index+1}. Модуль</h3>
                    <div className="step2__input">
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={e.moduleName}
                                onChange={updateStateModule(index)}
                                required/>
                            <div className='labelline'>Название модуля</div>
                        </div>
                        <img onClick={()=>DeleteModule(index)} src={DeleteIcon} alt=""/>
                    </div>
                    {e.topic.map((j, i)=>(
                    <div>
                    <div className="step2__input">
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={j.topicName}
                                onChange={updateStateTopicName(index, i)}
                                required/>
                            <div className='labelline'>Тема {i+1}</div>
                        </div>
                        <img onClick={()=>DeleteTopic(index,i)} src={DeleteIcon} alt=""/>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="number"
                                value={j.LK}
                                onChange={updateStateLK(index, i)}
                                required/>
                            <div className='labelline'>ЛК</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="number"
                                value={j.SPZ}
                                onChange={updateStateSPZ(index, i)}
                                required/>
                            <div className='labelline'>СПЗ</div>
                        </div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="number"
                                value={j.SRO}
                                onChange={updateStateSRO(index, i)}
                                required/>
                            <div className='labelline'>СРО</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={j.literature}
                                onChange={updateStateLiterature(index, i)}
                                required/>
                            <div className='labelline'>Литература</div>
                        </div>
                    </div>
                    </div>
                    ))}
                    <p onClick={()=>AddToTopic(index)} className="add_to__module">Добавить темы</p>
                    </div>
                    ))}
                    <div className="line"></div>
                    <p onClick={()=>AddToModule()} className="add_to__module">Добавить модуль</p>
                    <div className='add__container-buttons'>
                        <button onClick={()=>putCreateSyllabus()} className="save__button">Сохранить</button>
                        <button onClick={()=>navigate(`/${syllabusId}/edit/step4`)} className='further__button'>Далее</button>
                        <Link to={`/${syllabusId}`}><button className='cancel__button'>Отмена</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStep3;