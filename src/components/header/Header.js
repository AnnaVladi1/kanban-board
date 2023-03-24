import  Avatar from "../../img/user-avatar.png"
import {useState} from "react";
import "./styles.css"

function Header() {
    let [menu,activeMenu] = useState(false)
    function toggleMenu() {
        activeMenu(!menu)
    }
    return (
        <header className={"header--wrap"}>
            <div className={"container"}>
                <div className={"flex flex-center-vertical"}>
                    <h1>Awesome Kanban Board</h1>
                    <div className={"header--user"}>
                        <button onClick={toggleMenu} className={`button--user flex ${menu ? "active" : ''}`} type={"button"}>
                            <img src={Avatar} alt={"avatar"}/>
                        </button>
                        {menu ? <div className={"header--user-menu"}>
                            <ul>
                                <li><a href={'/'}>Profile</a></li>
                                <li><a href={'/'}>Log Out</a></li>
                            </ul>
                        </div> : ''}
                    </div>
                </div>
            </div>
        </header>)
}


export default Header