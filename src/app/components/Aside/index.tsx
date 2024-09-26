import Image from "next/image"
import Logo from "../../../../public/logo.svg"
import Feed from "../../../../public/feed.svg"
import Info from "../../../../public/info.svg"
import AccountCircle from "../../../../public/account_circle.svg"
import Logout from "../../../../public/logout.svg"
import styles from './aside.module.css'

const Aside = () => {
    return (
        <aside className={styles.aside}>
            <ul className={styles["aside-list"]}>
                <li>
                    <Image src={Logo} alt="Logo code connect" />
                </li>
                <li>
                    Publicar
                </li>
                <li className={styles["aside-item-list"]}>
                    <Image src={Feed} alt="Feed" />
                    Feed
                </li>
                <li className={styles["aside-item-list"]}>
                    <Image src={AccountCircle} alt="Feed" />
                    Perfil
                </li>
                <li className={styles["aside-item-list"]}>
                    <Image src={Info} alt="Feed" />
                    Sobre Nós
                </li>
                <li className={styles["aside-item-list"]}>
                    <Image src={Logout} alt="Feed" />
                    Sair
                </li>
            </ul>
        </aside>
    )
}

export default Aside