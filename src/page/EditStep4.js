import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RightIcon from '../images/icons/rightIcon.svg'
import '../styles/AddStep1.css'
import Button from '../images/icons/Button.svg'
import { useState } from "react";
import axios from 'axios'
import DeleteIcon from '../images/icons/deleteIcon.svg'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { toast } from "react-toastify"

const EditStep4 = () => {
    const {syllabusId} = useParams()
    const [mainLiterature, setMainLiterature] = useState([""])
    const [additionalLiterature, setAdditionalLiterature] =useState([""])
    
    const UpdateStateMain = (index) => (e)=> {
        const newArray = [...mainLiterature]
        newArray[index]=e.target.value
        setMainLiterature(newArray)
    }

    const UpdateStateAdditional = (index) => (e)=> {
        const newArray = [...additionalLiterature]
        newArray[index]=e.target.value
        setAdditionalLiterature(newArray)
    }

    const AddMainLiterature = () => {
        const newArray = [...mainLiterature]
        newArray.push("")
        setMainLiterature(newArray)
    }

    const AddAdditionalLiterature = () => {
        const newArray = [...additionalLiterature]
        newArray.push("")
        setAdditionalLiterature(newArray)
    }

    const DeleteMain = (index) => {
        const newArray = [...mainLiterature]
        newArray.splice(index, 1)
        setMainLiterature(newArray)
    }

    const DeleteAdditional = (index) => {
        const newArray = [...additionalLiterature]
        newArray.splice(index, 1)
        setAdditionalLiterature(newArray)
    }

    const putCreateSyllabus = () => {
        const token = localStorage.getItem("s_token")
        axios
            .put(`http://185.146.1.71/pdf/syllabus/literature/${syllabusId}`, {
                "literature": {
                    additionalLiterature,
                    mainLiterature
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
                setMainLiterature(result.data.literature.mainLiterature)
                setAdditionalLiterature(result.data.literature.additionalLiterature)
			})
			.catch(error => {
                console.log(error)
			})
    }

    useEffect(()=>{
        getSyllabusById()
    })

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
                    <h2>Литература и интернет - ресурсы</h2>
                </div>
                <div className='add__container-form'>
                    <h3>1. Основная литература</h3>
                    {mainLiterature.map((e, index) => (
                    <div className="step2__input">
                        <div className='textarea-box'>
                            <textarea 
                                className='textarea' 
                                type="text"
                                value={e}
                                onChange={UpdateStateMain(index)}
                                required/>
                            <div className='labelline'>{index+1}</div>
                        </div>
                        <img onClick={()=>DeleteMain(index)} src={DeleteIcon} alt=""/>
                    </div>
                    ))}
                    <p onClick={()=>AddMainLiterature()} className="add_to__module">Добавить основную литературу</p>
                    <div className="line"></div>

                    <h3>2. Дополнительная литература</h3>
                    {additionalLiterature.map((e, index) => (
                    <div className="step2__input">
                        <div className='textarea-box'>
                            <textarea 
                                className='textarea' 
                                type="text"
                                value={e}
                                onChange={UpdateStateAdditional(index)}
                                required/>
                            <div className='labelline'>{index+1}</div>
                        </div>
                        <img onClick={()=>DeleteAdditional(index)} src={DeleteIcon} alt=""/>
                    </div>
                    ))}
                    <p onClick={()=>AddAdditionalLiterature()} className="add_to__module">Добавить дополнительную литературу</p>
                    <div className='add__container-buttons'>
                        <button onClick={()=>putCreateSyllabus()} className='further__button'>Сохранить</button>
                        <Link to={`/${syllabusId}`}><button className='cancel__button'>Отмена</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStep4;