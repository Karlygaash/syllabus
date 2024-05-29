import { Link, useNavigate } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'

const AddStep1 = () => {
    const [subjectName, setSubjectName] = useState("")
    const [specialityName, setSpecialityName] = useState("")
    const [facultyName, setFacultyName] = useState("")
    const [kafedraName, setKafedraName] = useState("")
    const [courseNumber, setCourseNumber] = useState()
    const [creditNumber, setCreditNumber] = useState()
    const [srop, setSROP] = useState()
    const [allHours, setAllHours] = useState()
    const [lectureHours, setLectureHours] = useState()
    const [sro, setSRO] = useState()
    const [practiceLessons, setPracticeLessons] = useState()
    const [syllabusId, setSyllabusId] = useState(0);
    const navigate=useNavigate();

    const postCreateSyllabus = () => {
        if (!subjectName.trim()) {
            alert("Заполните название предмета!");
            return;
        }if (!specialityName.trim()) {
            alert("Заполните название специальности");
            return;
        }
        if (!facultyName.trim()) {
            alert("Заполните название факультета!");
            return;
        }if (!kafedraName.trim()) {
            alert("Заполните название кафедры");
            return;
        }
        if (lectureHours === undefined || lectureHours === null) {
            alert("Заполните количество лекций!");
            return;
        }if (allHours === undefined || allHours === null) {
            alert("Заполните количество часов!");
            return;
        }if (creditNumber === undefined || creditNumber === null) {
            alert("Заполните количество кредитов!");
            return;
        }if (courseNumber === undefined || courseNumber === null) {
            alert("Заполните курс!");
            return;
        }if (sro === undefined || sro === null) {
            alert("Заполните СРО!");
            return;
        }if (srop === undefined || srop === null) {
            alert("Заполните СРОП!");
            return;
        }if (practiceLessons === undefined || practiceLessons === null) {
            alert("Заполните количество практические занятие!");
            return;
        }

        const token = localStorage.getItem("s_token")
        axios
            .post("http://185.146.1.71/pdf/syllabus", {
                allHours,
                courseNumber,
                creditNumber,
                facultyName,
                kafedraName,
                lectureHours,
                practiceLessons,
                sro,
                srop,
                "subjectInfo" : {
                    subjectName,
                    specialityName
                }
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setSyllabusId(result.data.result)
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
                    <h2>Основная информация</h2>
                </div>
                <div className='add__container-form'>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={subjectName}
                            onChange={e=>setSubjectName(e.target.value)} required/>
                        <div className='labelline'> Название предмета</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            className='input' 
                            type="text"
                            value={specialityName}
                            onChange={e=>setSpecialityName(e.target.value)} required/>
                        <div className='labelline'> Название специальности</div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <select onChange={e=>setFacultyName(e.target.value)} className='input' required>
                                <option></option>
                                <option value="Технологический">Технологический</option>
                                <option value="Гуманитарный">Гуманитарный</option>
                            </select>
                            <div className='labelline'>Название факультета</div>
                        </div>
                        <div className='input-box'>
                            <select onChange={e=>setKafedraName(e.target.value)} className='input' required>
                                <option></option>
                                <option value="Информационные технологии">Информационные технологии</option>
                            </select>
                            <div className='labelline'>Название кафедры</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                value={courseNumber}
                                onChange={e=>setCourseNumber(e.target.valueAsNumber)}
                                type="number" required/>
                            <div className='labelline'>Курс</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="number" 
                                value={creditNumber}
                                onChange={e=>setCreditNumber(e.target.valueAsNumber)}
                                required/>
                            <div className='labelline'>Количество кредитов</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                value={allHours}
                                onChange={e=>setAllHours(e.target.valueAsNumber)}
                                type="number" required/>
                            <div className='labelline'>Количество часов</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input'
                                value={lectureHours}
                                onChange={e=>setLectureHours(e.target.valueAsNumber)} 
                                type="number" required/>
                            <div className='labelline'>Количество лекций</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                value={practiceLessons}
                                onChange={e=>setPracticeLessons(e.target.valueAsNumber)}
                                type="number" required/>
                            <div className='labelline'>Семинарские (практические) занятия</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                value={sro}
                                onChange={e=>setSRO(e.target.valueAsNumber)}
                                type="number" required/>
                            <div className='labelline'>CPO</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                value={srop}
                                onChange={e=>setSROP(e.target.valueAsNumber)}
                                type="number" required/>
                            <div className='labelline'>CPOП</div>
                        </div>
                    </div>
                    {syllabusId > 0 ? navigate(`/add/${syllabusId}/step2`) : ""}
                    <div className='add__container-buttons'>
                        <button onClick={()=>postCreateSyllabus()} className='further__button'>Далее</button>
                        <Link to="/"><button className='cancel__button'>Отмена</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStep1;