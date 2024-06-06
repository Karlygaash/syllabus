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
    const [fullName3, setFullName3] = useState("")
    const [fullName4, setFullName4] = useState("")
    const [speciality4, setSpeciality4] = useState("")
    const [protocol1, setProtocol1] = useState()
    const [protocol2, setProtocol2] = useState()
    const [protocol3, setProtocol3] = useState()

    const [faculty, setFaculty] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [consultation, setConsultation] = useState("")

    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date2, setDate2] = useState('');
    const [day2, setDay2] = useState('');
    const [month2, setMonth2] = useState('');
    const [year2, setYear2] = useState('');
    const [date3, setDate3] = useState('');
    const [day3, setDay3] = useState('');
    const [month3, setMonth3] = useState('');
    const [year3, setYear3] = useState('');

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
        }if (!date3.trim()) {
          alert("Заполните date");
          return;
      }
        
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/preface/${syllabusId}`, {
                "preface" : {
                    "madeBy" : {
                        "fullname" : fullName1,
                        "specialist" : speciality1,
                        email,
                        address,
                        consultation,
                        faculty
                    },
                    "discussion1" : `"${day}" ${month} ${year} года, Протокол №${protocol1}`,
                    "discussion2" : `"${day2}" ${month2} ${year2} года Протокол №${protocol2}`,
                    "insertedIn" : `№${protocol3} от "${day3}" ${month3} ${year3} г.`,
                    "discussedBy1" : {
                        "fullname" : fullName2,
                    },
                    "discussedBy2" : {
                        "fullname" : fullName3,
                    },
                    "confirmedBy" : {
                        "fullname" : fullName4
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

    const handleDateChange3 = (event) => {
      const inputDate = event.target.value;
      setDate3(inputDate);
  
      if (inputDate) {
        const [year, month, day] = inputDate.split('-');
        setDay3(day);
        if(month=== '01'){
          setMonth3('января')
        }else if(month === '02'){
          setMonth3('февраля')
        }else if(month === '03'){
          setMonth3('марта')
        }else if(month === '04'){
          setMonth3('апреля')
        }else if(month === '05'){
          setMonth3('мая')
        }else if(month === '06'){
          setMonth3('июня')
        }else if(month === '07'){
          setMonth3('июля')
        }else if(month === '08'){
          setMonth3('августа')
        }else if(month === '09'){
          setMonth3('сентября')
        }else if(month === '10'){
          setMonth3('октября')
        }else if(month === '11'){
          setMonth3('ноября')
        }else if(month === '12'){
          setMonth3('декабря')
        }
        setYear3(year);
      } else {
        setDay3('');
        setMonth3('');
        setYear3('');
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
                            <div className='labelline'>Должность</div>
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
                          <select onChange={e=>setFaculty(e.target.value)} className='input' required>
                            <option></option>
                            <option value="Технологический">Технологический</option>
                            <option value="Гуманитарный">Гуманитарный</option>
                          </select>
                          <div className='labelline'>Факультет</div>
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
                    </div>
                    <h3>2. Обсуждено</h3>
                    <p className="discussion-p">2.1 На заседании кафедры "Информационные системы" от</p>
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
                                type="number"
                                value={protocol1}
                                onChange={e=>setProtocol1(e.target.valueAsNumber)}
                                required/>  
                            <div className='labelline'>Протокол №</div>       
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName2}
                                onChange={e=>setFullName2(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя заведующий кафедрой</div>
                        </div>
                    </div>
                    <p className="discussion-p">2.2 На заседании комиссии по обеспечению качества Технологического факультета от</p>
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
                                type="number"
                                value={protocol2}
                                onChange={e=>setProtocol2(e.target.valueAsNumber)}
                                required/>  
                            <div className='labelline'>Протокол №</div>       
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={fullName3}
                                onChange={e=>setFullName3(e.target.value)}
                                required/>
                            <div className='labelline'>Полное имя председателя</div>
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
                            <div className='labelline'>Полное имя декан факультета</div>
                        </div>
                    </div>
                    <p>ВВЕДЕНЫ ВПЕРВЫЕ (Взамен редь. №)</p><br></br>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="number"
                                value={protocol3}
                                onChange={e=>setProtocol3(e.target.valueAsNumber)}
                                required/>
                            <div className='labelline'>№</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="date"
                                value={date3}
                                onChange={handleDateChange3}
                                required/>
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