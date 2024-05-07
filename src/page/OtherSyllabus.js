import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import EditIcon from '../images/icons/editIcon.svg'
import SearchIcon from '../images/icons/search.svg'

const OtherSyllabus = () => {
    const [subject, setSubject] = useState("")
    const navigate = useNavigate()
    const [syllabus, setSyllabus] = useState([])
    
    const getSyllabusOtherBySubject = () => {
        const token = localStorage.getItem("s_token")
        axios
            .get(`http://185.146.1.71/pdf/syllabus/others?subject=${subject}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setSyllabus(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getSyllabusOtherBySubject()  
      
    })
    return (
        <div className='container'>
            <div className='header'>
                <h1>Другие Syllabus</h1>
                <div className="seacrh__component">
                    <input 
                        className="search__input"
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                        placeholder="Поиск"
                    />
                    <img onClick={()=>getSyllabusOtherBySubject()} src={SearchIcon} alt=""/>
                </div>
            </div>
              
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
            </div>
        </div>
    );
};

export default OtherSyllabus;