import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PlusIcon from '../images/icons/plusIcon.svg'
import '../styles/Profile.css'
import Ava from '../images/ava.png'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Profile = () => {
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
                        <div>
                            <h4>Имя и Фамилия</h4>
                            <p>{firstName} {lastName}</p>
                        </div>
                        <div>
                            <h4>Электронная почта</h4>
                            <p>{email}</p>
                        </div>
                        <div className='profile__buttons'>
                            <button onClick={()=>navigate(`/profile/edit`)} className="data__button">Изменить данные</button>
                            <button onClick={()=>navigate(`/profile/password`)} className='password__button'>Изменить пароль</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;