import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify"

const EditStep2 = () => {
    const navigate=useNavigate()
    const {syllabusId} = useParams();
    const [fullName1, setFullName1] = useState("")
    const [speciality1, setSpeciality1] = useState("")
    const [fullName2, setFullName2] = useState("")
    const [speciality2, setSpeciality2] = useState("")
    const [fullName3, setFullName3] = useState("")
    const [speciality3, setSpeciality3] = useState("")
    const [fullName4, setFullName4] = useState("")
    const [speciality4, setSpeciality4] = useState("")
    const [discussion1, setDiscussion1] = useState("")
    const [discussion2, setDiscussion2] = useState("")

    const putCreateSyllabus = () => {
        if (!fullName1.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!fullName2.trim()) {
            alert("Заполните полное имя!");
            return;
        }
        if (!fullName3.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!fullName4.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!speciality1.trim()) {
            alert("Заполните специальности");
            return;
        }if (!speciality2.trim()) {
            alert("Заполните специальности");
            return;
        }
        if (!speciality3.trim()) {
            alert("Заполните специальности");
            return;
        }if (!speciality4.trim()) {
            alert("Заполните специальности");
            return;
        }
        
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/preface/${syllabusId}`, {
                "preface" : {
                    "madeBy" : {
                        "fullname" : fullName1,
                        "specialist" : speciality1
                    },
                    discussion1,
                    discussion2,
                    "discussedBy1" : {
                        "fullname" : fullName2,
                        "specialist" : speciality2
                    },
                    "discussedBy2" : {
                        "fullname" : fullName3,
                        "specialist" : speciality3
                    },
                    "confirmedBy" : {
                        "fullname" : fullName4,
                        "specialist" : speciality4
                    }
                }
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
            })
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
                setDiscussion1(result.data.preface.discussion1)
                setDiscussion2(result.data.preface.discussion2)
                setFullName1(result.data.preface.madeBy.fullName)
                setFullName2(result.data.preface.discussedBy1.fullName)
                setFullName3(result.data.preface.discussedBy2.fullName)
                setFullName4(result.data.preface.confirmedBy.fullName)
                setSpeciality1(result.data.preface.madeBy.specialist)
                setSpeciality2(result.data.preface.discussedBy1.specialist)
                setSpeciality3(result.data.preface.discussedBy2.specialist)
                setSpeciality4(result.data.preface.confirmedBy.specialist)
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
                    <h2>Предисловие</h2>
                </div>
                <div className='add__container-form'>
                    <h3>1. Разработал</h3>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName1}
                                onChange={e=>setFullName1(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={speciality1}
                                onChange={e=>setSpeciality1(e.target.value)}
                                required/>
                            <div className='labelline'>Специальности</div>
                        </div>
                    </div>
                    <h3>2. Обсуждено</h3>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={discussion1}
                            onChange={e=>setDiscussion1(e.target.value)}
                            required/>
                        <div className='labelline'>2.1</div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName2}
                                onChange={e=>setFullName2(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={speciality2}
                                onChange={e=>setSpeciality2(e.target.value)}
                                required/>
                            <div className='labelline'>Специальности</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={discussion2}
                            onChange={e=>setDiscussion2(e.target.value)}
                            required/>
                        <div className='labelline'>2.2</div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName3}
                                onChange={e=>setFullName3(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={speciality3}
                                onChange={e=>setSpeciality3(e.target.value)}
                                required/>
                            <div className='labelline'>Специальности</div>
                        </div>
                    </div>
                    <h3>3. Утверждено</h3>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName4}
                                onChange={e=>setFullName4(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={speciality4}
                                onChange={e=>setSpeciality4(e.target.value)}
                                required/>
                            <div className='labelline'>Специальности</div>
                        </div>
                    </div>
                    <div className='add__container-buttons'>
                        <button onClick={()=>putCreateSyllabus()} className="save__button">Сохранить</button>
                        <button onClick={()=>navigate(`/${syllabusId}/edit/step3`)} className='further__button'>Далее</button>
                        <Link to={`/${syllabusId}`}><button className='cancel__button'>Отмена</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStep2;