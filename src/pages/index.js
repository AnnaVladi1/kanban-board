import Card from "../components/card/card";

function Home(props) {


    return (
        <div className="container container--main flex">
            <div className={"cards--wrap flex"}>
                {Object.keys(props.tasks).map(key => {
                    return <Card key={key} id={key} prevTasks={props.tasks[key - 1] ? props.tasks[key - 1] : ''} tasks={props.tasks[key]}/>
                })
                }
            </div>
        </div>
    );
}

export default Home;