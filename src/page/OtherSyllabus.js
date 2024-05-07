import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import EditIcon from '../images/icons/editIcon.svg'

const OtherSyllabus = () => {
    const [subject, setSubject] = useState("")
    const navigate = useNavigate()
    const [syllabus, setSyllabus] = useState([])
    const [click, setClick] = useState(false)
    
    const geSyllabusOther = () => {
        const token = localStorage.getItem("s_token")
        axios
            .get(`http://185.146.1.71/pdf/syllabus/others?subject=${subject}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setSyllabus(result.data)
                setClick(true)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='container'>
            <div className='header'>
                <h1>Другие Syllabus</h1>
            </div>
            {click===false ? 
            <div className='profile__container'>
                <div className='input-box'>
                    <input 
                        className='input' 
                        type="text"
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                        required/>
                    <div className='labelline'>Введите предмета</div>
                </div>
                <div className='add__container-buttons'>
                        <button onClick={()=>geSyllabusOther()} className='further__button'>Смотреть</button>
                    </div>
            </div> 
            : 
            <div className='syllabus__grid'>
                {syllabus.map(e => (
                    <div className='syllabus'>
                        <h3 onClick={()=>navigate(`/syllabus/${e.syllabusID}`)}>{e.mainInfo.subjectInfo.subjectName}</h3>
                        <p onClick={()=>navigate(`/syllabus/${e.syllabusID}`)}>{e.mainInfo.subjectInfo.specialityName}</p>
                        <div className='syllabus__footer'>
                            <p>{e.mainInfo.allHours} часов</p>
                            <div className="project__buttons">
                                <Link to={`/syllabus/${e.syllabusID}`}><img className="project__button" src={EditIcon} alt=""/></Link>
                            </div>
                        </div>
                    </div>
                ))}       
            </div>}
        </div>
    );
};

export default OtherSyllabus;