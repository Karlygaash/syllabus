import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PlusIcon from '../images/icons/plusIcon.svg'
import '../styles/Profile.css'
import Ava from '../images/ava.png'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from "react-toastify"

const ProfileEdit = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const navigate=useNavigate()

    const getProfile = () => {
        const token = localStorage.getItem("s_token")
		axios
			.get("http://185.146.1.71/pdf/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                setFirstName(result.data.result.firstName)
                setLastName(result.data.result.lastName)
                setEmail(result.data.result.email)
			})
			.catch(error => {
                console.log(error)
			})
	}

    const putProfile = () => {
        const token = localStorage.getItem("s_token")
		axios
			.put("http://185.146.1.71/pdf/user/profile", {
                firstName,
                lastName,
                email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
			.then(result => {
                navigate("/profile")
                toast.success("Успешно изменился")

			})
			.catch(error => {
                console.log(error)
			})
	}

    useEffect(()=>{
        getProfile()
    }, [])
    return (
        <div className='container'>
            <div className='header'>
                <h1>Мой профиль</h1>
            </div>
            <div className='profile__container'>
                <div className='profile__person'>
                    <img src={Ava} alt=""/>
                    <div className='person__data'>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                                required/>
                            <div className='labelline'>Имя</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text"
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                required/>
                            <div className='labelline'>Фамилия</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required/>
                            <div className='labelline'>Почта</div>
                        </div>
                        <div className='profile__button'>
                            <button onClick={()=>navigate(`/profile`)} className="data__button">Назад</button>
                            <button onClick={()=>putProfile()} className='password__button'>Изменить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;