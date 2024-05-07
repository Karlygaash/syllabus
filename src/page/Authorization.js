import '../styles/Login.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

const Authorization = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const navigate=useNavigate();

    const handleSubmitClicked = (e) => {
		e.preventDefault()

		axios
			.post("http://185.146.1.71/pdf/signup", {
				email,
                firstName,
                lastName,
				password,
			})
			.then(result => {
				const token = result.data.result

				localStorage.setItem("s_token", token)
                navigate("/")
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
                console.log(error)
			})
	}

    useEffect(() => {
		const token_ = localStorage.getItem("s_token")

		if (token_) {
			navigate("/")
		}
	}, [navigate])

    return(
    <div className="login__section">
        <form onSubmit={handleSubmitClicked} className="login__form">
            <h2 className="login__form-header">Создайте аккаунт</h2>
            <p className="login__form-description">Войдите в систему, чтобы продолжить</p>
            <div className="form_box">
                <input
                    className="input"
                    type="text"
                    minLength={4}
                    maxLength={50}
                    placeholder="Имя"
                    value={firstName}
                    onChange={e=>setFirstName(e.target.value)}
                />            
            </div>

            <div className="form_box">
                <input
                    className="input"
                    type="text"
                    minLength={4}
                    maxLength={50}
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)}
                />            
            </div>
            <div className="form_box">
                <input
                    className="input"
                    type="email"
                    minLength={4}
                    maxLength={50}
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />            
            </div>

            <div className="form_box">
                <input
                    className="input"
                    type="password"
                    minLength={4}
                    maxLength={50}
                    placeholder="Пароль"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />     
                <p className="login__form-description password__label">Ваш пароль должен содержать символы<br></br> верхнего и нижнего регистров, а так же цифры.</p>       
            </div>
            <button className="submit__button" type="submit">Регистрация</button>
            <p className="login__footer">Уже есть аккаунт? <Link to="/login" className="login__footer-link">Войти</Link></p>
        </form>    
    </div>
    )
}

export default Authorization;