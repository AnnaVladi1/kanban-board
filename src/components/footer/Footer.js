import "./styles.css"
function Footer(props) {
    let date = new Date().getFullYear(),
        name = "ANNA KOKOREVA";
    return (
        <footer>
                <div className={'footer--wrap'}>
                    <div className={"container flex flex-center-vertical flex-wrap"}>
                    <div className={"footer--left flex flex-center-vertical"}>
                        <div>Active tasks: {props.total}</div>
                        <div>Finished tasks: {props.finished}</div>
                    </div>
                    <div>Kanban board by {name}, {date}</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer