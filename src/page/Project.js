import axios from 'axios'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify"
import PlusIcon from '../images/icons/plusIcon.svg'
import { Link, useNavigate} from 'react-router-dom';
import EditIcon from '../images/icons/editIcon.svg'
import DeleteIcon from '../images/icons/deleteIcon.svg'
import '../styles/Project.css'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const Project = () => {
    const [syllabus, setSyllabus] = useState([])
    const [isTrue, setIsTrue] = useState(false)
    const [visible, setVisible] = useState()
    const [idDelete, setIdDelete] = useState()
    const navigate=useNavigate()
    const getSyllabus = () => {
        const token = localStorage.getItem("s_token")
		axios
			.get("http://185.146.1.71/pdf/syllabus", {
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

    const onDeleteSyllabus = (id) => {
        const token = localStorage.getItem("s_token")
		axios
			.delete(`http://185.146.1.71/pdf/syllabus/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                setIsTrue(true)

			})
			.catch(error => {
                console.log(error)
			})
    }

    const onDelete = (id) => {
        setIdDelete(id)
        setVisible(true)
    }

    useEffect(()=>{
        getSyllabus()
        setIsTrue(false)
    }, [isTrue])
    return(
        <div className='container'>
            <div className='header'>
                <h1>Главное</h1>
                <Link to="/add"><button className="header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> &nbsp;&nbsp;Добавить</button></Link>
            </div>
            {syllabus.length === 0 ? 
            <div className='syllabus__null'>
                У Вас пока Syllabus пусто
            </div> 
            : 
            <div className='syllabus__grid'>
                {syllabus.map(e => (
                    <div className='syllabus'>
                        <h3 onClick={()=>navigate(`/${e.syllabusID}`)}>{e.mainInfo.subjectInfo.subjectName}</h3>
                        <p onClick={()=>navigate(`/${e.syllabusID}`)}>{e.mainInfo.subjectInfo.specialityName}</p>
                        <div className='syllabus__footer'>
                            <p>{e.mainInfo.allHours} часов</p>
                            <div className="project__buttons">
                                <Link to={`/${e.syllabusID}`}><img className="project__button" src={EditIcon} alt=""/></Link>
                                <img onClick={()=>onDelete(e.syllabusID)} className="project__button" src={DeleteIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                ))}
                <ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    message="Вы действительно хотите удалить?"
                    header="Удалить syllabus?" 
                    reject={()=>setVisible(false)} 
                    accept={() => onDeleteSyllabus(idDelete)}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
            </div>
            }
        </div>
    );
};

export default Project;