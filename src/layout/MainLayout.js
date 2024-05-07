import Logo from '../images/Logo.png'
import {ReactComponent as ProjectIcon} from '../images/icons/ProjectIcon.svg'
import {ReactComponent as RoleIcon} from '../images/icons/RoleIcon.svg'
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import LogoutIcon from '../images/icons/logoutIcon.svg'
import '../styles/MainLayout.css'
import { useEffect, useState } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import {ReactComponent as HomeIcon} from '../images/icons/home.svg'

const MainLayout = () => {
	const navigate = useNavigate()
	const [visible, setVisible] = useState(false)
	const removeItem = () =>{
	    localStorage.removeItem("s_token")
		navigate("/login")
	}

	useEffect(() => {
		const token = localStorage.getItem("s_token")

		if (!token) {
			navigate("/login")
		}
	}, [navigate])

    return(
        <div className="mainLayout">
			<aside className="app__sidebar">
                <div className='logo_main'>
                    <img src={Logo} alt=""/>
                </div>
				<nav className="navigation">
					<ul className="navigation__items">
						<li className="navigation__item">
							<NavLink
								to="/"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<HomeIcon className='link__icon'/>
								Главное
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/syllabus"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<ProjectIcon className='link__icon'/>
								Syllabus
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<RoleIcon className='link__icon'/>
								Мой профиль
							</NavLink>
						</li>
					</ul>
				</nav>
                <div onClick={()=>setVisible(true)} className='header__logout'>
				    <img src={LogoutIcon} className='header__logout-icon'/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Выйти
					<ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    message="Вы действительно хотите выйти?"
                    header="Выйти из системы?" 
                    reject={()=>setVisible(false)} 
                    accept={() => removeItem()}
                    acceptLabel="Да, выйти"
                    rejectLabel="Отмена"
                />
			</div>
			</aside>

			<main className="app__content">
				<Outlet />
			</main>
		</div>
    );
};

export default MainLayout;