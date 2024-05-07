import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate();

    const handleSubmitClicked = (e) => {
		e.preventDefault()

		axios
			.post("http://185.146.1.71/pdf/signin", {
				email,
				password
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
            <h2 className="login__form-header">Добро пожаловать</h2>
            <p className="login__form-description">Войдите в систему, чтобы продолжить</p>
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
            </div>
            <button className="submit__button" type="submit">Войти</button>
            <p className="login__footer">Забыли пароль?<Link to="/restore" className="login__footer-link">&nbsp;&nbsp;Восстановить</Link></p>
            <p className="login__footer"><Link to="/authorization" className="login__footer-link">Создать новый аккаунт</Link></p>
        </form>    
    </div>
    )
}

export default Login;