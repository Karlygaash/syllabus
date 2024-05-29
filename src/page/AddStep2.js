import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'

const AddStep2 = () => {
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

    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date2, setDate2] = useState('');
    const [day2, setDay2] = useState('');
    const [month2, setMonth2] = useState('');
    const [year2, setYear2] = useState('');

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
        }if (!date.trim()) {
            alert("Заполните date");
            return;
        }
        if (!date2.trim()) {
            alert("Заполните date");
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
                    "discussion1" : `"${day}" ${month} ${year} года`,
                    "discussion2" : `"${day2}" ${month2} ${year2} года`,
                    "discussedBy1" : {
                        "fullname" : fullName2,
                    },
                    "discussedBy2" : {
                        "fullname" : fullName3,
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
                navigate(`/add/${syllabusId}/step3`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        setDate(inputDate);
    
        if (inputDate) {
          const [year, month, day] = inputDate.split('-');
          setDay(day);
          if(month=== '01'){
            setMonth('января')
          }else if(month === '02'){
            setMonth('февраля')
          }else if(month === '03'){
            setMonth('марта')
          }else if(month === '04'){
            setMonth('апреля')
          }else if(month === '05'){
            setMonth('мая')
          }else if(month === '06'){
            setMonth('июня')
          }else if(month === '07'){
            setMonth('июля')
          }else if(month === '08'){
            setMonth('августа')
          }else if(month === '09'){
            setMonth('сентября')
          }else if(month === '10'){
            setMonth('октября')
          }else if(month === '11'){
            setMonth('ноября')
          }else if(month === '12'){
            setMonth('декабря')
          }
          setYear(year);
        } else {
          setDay('');
          setMonth('');
          setYear('');
        }
    };

    const handleDateChange2 = (event) => {
        const inputDate = event.target.value;
        setDate2(inputDate);
    
        if (inputDate) {
          const [year, month, day] = inputDate.split('-');
          setDay2(day);
          if(month=== '01'){
            setMonth2('января')
          }else if(month === '02'){
            setMonth2('февраля')
          }else if(month === '03'){
            setMonth2('марта')
          }else if(month === '04'){
            setMonth2('апреля')
          }else if(month === '05'){
            setMonth2('мая')
          }else if(month === '06'){
            setMonth2('июня')
          }else if(month === '07'){
            setMonth2('июля')
          }else if(month === '08'){
            setMonth2('августа')
          }else if(month === '09'){
            setMonth2('сентября')
          }else if(month === '10'){
            setMonth2('октября')
          }else if(month === '11'){
            setMonth2('ноября')
          }else if(month === '12'){
            setMonth2('декабря')
          }
          setYear2(year);
        } else {
          setDay2('');
          setMonth2('');
          setYear2('');
        }
    };

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
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                required/>         
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName2}
                                onChange={e=>setFullName2(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
                        </div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="date"
                                value={date2}
                                onChange={handleDateChange2}
                                required/>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName3}
                                onChange={e=>setFullName3(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя</div>
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

export default AddStep2;