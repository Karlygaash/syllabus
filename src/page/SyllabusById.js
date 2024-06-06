import { Link, useNavigate, useParams } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import { useEffect, useState } from "react";
import axios from 'axios'
import DeleteIcon from '../images/icons/delete.svg'
import '../styles/SyllabusById.css'
import { GrInstallOption } from "react-icons/gr";
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const SyllabusById = () => {
    const {syllabusId} = useParams()
    const [visible, setVisible] = useState()
    const [mainInfo, setMainInfo] = useState({})
    const [subjectInfo, setSubjectInfo] = useState({})
    const [topics, setTopics] = useState([])
    const [mainLiterature, setMainLiterature]= useState([])
    const [additionalLiterature, setAdditionalLiterature] = useState([])
    const [internetSource, setInternetSource] = useState([])
    const [madeBy, setMadeBy] = useState({})
    const [confirmedBy, setConfirmedBy] = useState({})
    const [discussedBy1, setDiscussedBy1] = useState({})
    const [discussedBy2, setDiscussedBy2] = useState({})
    const [preface, setPreFace] = useState({})
    const [question1, setQuestions1] = useState([])
    const [question2, setQuestions2] = useState([])
    const [text, setText] = useState({})
    const [insertedIn, setInsertedIn] = useState("")
    const navigate=useNavigate()

    const getSyllabusById = () => {
        const token = localStorage.getItem("s_token")
		axios
			.get(`http://185.146.1.71/pdf/syllabus/${syllabusId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                setMainInfo(result.data.mainInfo)
                setSubjectInfo(result.data.mainInfo.subjectInfo)
                setTopics(result.data.topics)
                setMainLiterature(result.data.literature.mainLiterature)
                setAdditionalLiterature(result.data.literature.additionalLiterature)
                setPreFace(result.data.preface)
                setMadeBy(result.data.preface.madeBy)
                setConfirmedBy(result.data.preface.confirmedBy)
                setDiscussedBy1(result.data.preface.discussedBy1)
                setDiscussedBy2(result.data.preface.discussedBy2)
                setQuestions1(result.data.question1.questions)
                setQuestions2(result.data.question2.questions)
                setText(result.data.text)
                setInternetSource(result.data.literature.internetSource)
                setInsertedIn(result.data.preface.insertedIn)
			})
			.catch(error => {
                console.log(error)
			})
    }

    const onButtonClick = (pdf) => {
        const pdfUrl = "http://185.146.1.71/pdf/PDF-generation-project/"+pdf;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdf; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateSyllabus = () => {
        const token = localStorage.getItem("s_token")
		axios
			.post(`http://185.146.1.71/pdf/syllabus/generate/${syllabusId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                onButtonClick(result.data.message)
			})
			.catch(error => {
                console.log(error)
			})
    }

    const onDeleteSyllabus = () => {
        const token = localStorage.getItem("s_token")
		axios
			.delete(`http://185.146.1.71/pdf/syllabus/${syllabusId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                navigate("/")

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
                <p className="current-page">{subjectInfo.subjectName}</p>
            </div>
            <div className='add__container'>
                
                <h2 className="subjectName">{subjectInfo.subjectName}</h2>
                
                <div className="mainInfo">
                    <p>{subjectInfo.specialityName}</p>
                    <br></br>
                    <p>Факультет - {mainInfo.facultyName}</p>
                    <p>Кафедра - {mainInfo.kafedraName}</p>
                    <p>Курс - {mainInfo.courseNumber}</p>
                    <p>Количества кредитов - {mainInfo.creditNumber}</p>
                    <p>Всего часов - {mainInfo.allHours}</p>
                    <p>Лекций - {mainInfo.lectureHours}</p>
                    <p>Семинарские (практические) занятия - {mainInfo.practiceLessons}</p>
                    <p>СРО - {mainInfo.sro}</p>
                    <p>СРОП - {mainInfo.srop}</p>
                </div>
                <div className="literature">
                    <h3 className="syllabus_title">ПРЕДИСЛОВИЕ</h3>
                    {preface === null ? "пока пусто" :
                        <div>
                            <h4>1. Разработал</h4>
                            <p>Составитель: {madeBy.specialist} {madeBy.fullName}</p>
                            <h4>2. Обсуждено</h4>
                            <p>2.1. На заседании кафедры "Информационные системы" от{preface.discussion1}</p>
                            <p> Заведующий кафедрой {discussedBy1.fullName}</p>
                            <p>2.2.  На заседании комиссии по обеспечению качества Технологического факультета от {preface.discussion2}</p>
                            <p>Председатель ТФ {discussedBy2.fullName}</p>
                            <h4>3. Утверждено</h4>
                            <p>Декан факультета ТФ {confirmedBy.fullName}</p>
                            <p>ВВЕДЕНЫ ВПЕРВЫЕ (Взамен ред. {insertedIn})</p>
                        </div>
                    }           
                </div>

                <div className="literature">
                <h3 className="syllabus_title">ОБЩИЕ ПОЛОЖЕНИЯ</h3>
                <h4>1. Общие сведения о преподавателе и дисциплине</h4>
                    {preface === null ? "пока пусто" :
                        <div>
                            <p>Ф.И.О преподавателя: {madeBy.fullName}</p>
                            <p>Ученая степень, звание, должность: {madeBy.specialist}</p>
                            <p>Факультет {madeBy.faculty}</p>
                            <p>Контактная информация: тел. , {madeBy.email} {madeBy.address}</p>
                            <p>Сроки и время для консультации обучающихся: {madeBy.consultation}</p>
                        </div>
                    }
                <h4 className="h4">2. Краткое описание содержания дисциплины</h4>
                <p>{text.text2}</p>
                <h4 className="h4">3. Цель преподавания дисциплины</h4>
                <p>{text.text3}</p>
                <h4 className="h4">4. Задача дисциплины</h4>
                <p>{text.text4}</p>
                <h4 className="h4">5. Ожидаемые результаты обучения и формируемые компетенции</h4>
                <p>{text.text5}</p>
                <h4 className="h4">6. Пререквизиты курса:</h4>
                <p>{text.text6}</p>
                <h4 className="h4">7. Постреквизиты курса:</h4>
                <p>{text.text7}</p>
                <h4 className="h4">8. Формат обучения</h4> 
                <p>{text.text8}</p>       
                </div>

                <h3 className="syllabus_title">ТЕМАТИЧЕСКОЕ СОДЕРЖАНИЕ ДИСЦИПЛИНЫ И РАСПРЕДЕЛЕНИЕ
                    ЧАСОВ ПО ВИДАМ ЗАНЯТИЙ</h3>
                <table>
                    <thead>
                        <tr>
                            <td rowspan="2">№</td>
                            <td rowspan="2">Модуль. Тема </td>
                            <td colspan="3">
                                Количество часов 
                            </td>
                            <td rowspan="2">Литература</td>
                        </tr>
                        <tr>
                            <td>ЛК</td>
                            <td>СПЗ</td>
                            <td>СРО</td>
                        </tr>
                    </thead>
                    {topics.map((e, index) => (
                    <tbody>
                        <tr>
                            <td colspan="6">{e.moduleName}</td>
                        </tr>
                        {e.topic.map((j, i)=>(
                            <tr>
                                <td>{i+1}</td>
                                <td>{j.topicName}</td>
                                <td>{j.LK}</td>
                                <td>{j.SPZ}</td>
                                <td>{j.SRO}</td>
                                <td>{j.literature}</td>
                            </tr>
                        ))}
                    </tbody>
                    ))}
                </table>

                <div className="literature">
                    <h3 className="syllabus_title">ВОПРОСЫ</h3>
                    <h4>Вопросы к рубежному контролю №1</h4>
                    {question1 === null ? "" :
                    question1.map((e, index) => (
                        <p>{index+1}. {e}</p>
                    ))
                    }           
                    <h4>Вопросы к рубежному контролю №2</h4>
                    {question2 === null ? "" :
                    question2.map((e,index) => (
                        <p>{index+1}. {e}</p>
                    ))
                    }
                </div>
                
                <div className="literature">
                    <h3 className="syllabus_title">ЛИТЕРАТУРА И ИНТЕРНЕТ-РЕСУРСЫ</h3>
                    <h4>1. Основная литература</h4>
                    {mainLiterature === null ? "" :
                    mainLiterature.map((e, index) => (
                        <p>{index+1}. {e}</p>
                    ))
                    }           
                    <h4>2. Дополнительная литература</h4>
                    {additionalLiterature === null ? "" :
                    additionalLiterature.map((e, index) => (
                        <p>{index+1}. {e}</p>
                    ))
                    }
                    <h4>3. Интернет ресурсы</h4>
                    {internetSource === null ? "" :
                    internetSource.map((e, index) => (
                        <p>{index+1}. {e}</p>
                    ))
                    }
                </div>
                <div className="footer__buttons">
                    <button onClick={()=>generateSyllabus()} className="footer__pdf_button"><GrInstallOption className="icon" /> Загрузить pdf формат</button>
                    <button onClick={()=>navigate(`/${syllabusId}/edit`)} className="footer__edit_button">Редактировать</button>
                    <button onClick={()=>setVisible(true)} className="footer__delete_button"><img src={DeleteIcon} alt=""/></button>
                </div>
                <ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    message="Вы действительно хотите удалить?"
                    header="Удалить syllabus?" 
                    reject={()=>setVisible(false)} 
                    accept={() => onDeleteSyllabus()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
            </div>
        </div>
    );
};

export default SyllabusById;