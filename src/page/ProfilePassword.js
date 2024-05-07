import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PlusIcon from '../images/icons/plusIcon.svg'
import '../styles/Profile.css'
import Ava from '../images/ava.png'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from "react-toastify"

const ProfilePassword = () => {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()

    const putProfile = () => {
        const token = localStorage.getItem("s_token")
		axios
			.post("http://185.146.1.71/pdf/user/reset-password", {
                confirmPassword,
                password
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
    
    return (
        <div className='container'>
            <div className='header'>
                <h1>Мой профиль</h1>
            </div>
            <div className='profile__container'>
                <div className='profile__person'>
                    <img src={Ava} alt=""/>
                    <div className='person__data'>
                        <h4 className='password__title'>Изменить пароль</h4>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                required/>
                            <div className='labelline'>Новый пароль</div>
                        </div>
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required/>
                            <div className='labelline'>Повторить пароль</div>
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

export default ProfilePassword;