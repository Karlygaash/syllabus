import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

const Restore = () => {
    const [email, setEmail] = useState("")
    const navigate=useNavigate();

    const handleSubmitClicked = (e) => {
		e.preventDefault()

        const formDate = new FormData();
        formDate.append("email", email);

		axios
			.post("http://185.146.1.71/pdf/forgot-password", formDate)
			.then(result => {
                navigate("/login")
                toast.success("Пароль успешно отправлен на почту")
			})
			.catch(error => {
				toast.error(error.response.data.errors[0].message)
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
            <h2 className="login__form-header">Восстановить пароль</h2>
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
            <div className='submit__buttons'>
                <button onClick={()=>navigate('/login')} className="data__button">Назад</button>
                <button className="submit__button" type="submit">Потвердить</button>
            </div>
            
        </form>    
    </div>
    )
}

export default Restore;