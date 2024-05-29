import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useEffect, useState } from "react";
import axios from 'axios'

const EditMadeBy = () => {
    const [fullName, setFullName]= useState("")
    const [specialist, setSpecialist] = useState("")
    const [faculty, setFaculty] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [consultation, setConsultation] = useState("")
    const {syllabusId} = useParams()
    const navigate=useNavigate()

    const putCreateSyllabus = () => {
        if (!fullName.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!specialist.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!faculty.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!email.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!address.trim()) {
            alert("Заполните полное имя!");
            return;
        }if (!consultation.trim()) {
            alert("Заполните полное имя!");
            return;
        }

        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/preface/${syllabusId}`, {
                "preface" : {
                    "madeBy" : {
                        fullName,
                        specialist,
                        email,
                        address,
                        consultation,
                        faculty
                    },
                }
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                navigate(`/${syllabusId}/edit/step4`)
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
                setFullName(result.data.preface.madeBy.fullName)
                setEmail(result.data.preface.madeBy.email)
                setAddress(result.data.preface.madeBy.address)
                setFaculty(result.data.preface.madeBy.faculty)
                setConsultation(result.data.preface.madeBy.consultation)
                setSpecialist(result.data.preface.madeBy.specialist)
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
                    <h2>Общие сведения о преподавателе и дисциплине</h2>
                </div>
                <div className='add__container-form'>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={fullName}
                            onChange={e=>setFullName(e.target.value)}
                            required/>
                        <div className='labelline'>Ф.И.О преподавателя</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={specialist}
                            onChange={e=>setSpecialist(e.target.value)}
                            required/>
                        <div className='labelline'>Ученая степень, звание, должность</div>
                    </div>
                    <div className='input-box'>
                        <select onChange={e=>setFaculty(e.target.value)} className='input' required>
                            <option value={faculty}>{faculty}</option>
                            <option value="Технологический">Технологический</option>
                            <option value="Гуманитарный">Гуманитарный</option>
                        </select>
                        <div className='labelline'>Факультет</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required/>
                        <div className='labelline'>Почта</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={address}
                            onChange={e=>setAddress(e.target.value)}
                            required/>
                        <div className='labelline'>Адрес</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={consultation}
                            onChange={e=>setConsultation(e.target.value)}
                            required/>
                        <div className='labelline'>Сроки и время для консультации обучающихся</div>
                    </div>
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

export default EditMadeBy;