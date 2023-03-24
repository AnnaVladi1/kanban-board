import {useLocation, useNavigate} from "react-router-dom";
import {createRef, useEffect, useState} from "react";
import {mainRef} from "../helpers/functions";

function Detail() {
    let {state} = useLocation();
    let [task, setTask] = useState({});
    let [edit, setEdit] = useState(false);
    let [value, setValue] = useState('');
    const navigate = useNavigate();
    const textRef = createRef();
    const goBack = () => {
        navigate(-1);
    }
    useEffect(() => {
        let item = mainRef.current.getSingleTasks(state.id, state.key)
        setTask(item)
        setValue(item.description ? item.description : 'This task has no description')
    }, [state])
    return (
        <div className="detail--wrap flex">
            <div className={"detail--main flex"}>
                <div className={"detail--title"}>{task.text}</div>
                <div className={"detail--description flex"}>
                    <textarea onInput={(e) => {
                        setValue(e.target.value)
                    }
                    } ref={textRef} disabled={!edit} value={value}></textarea>
                </div>
                <button onClick={() => {
                    setEdit(!edit);
                    if (edit) {
                        mainRef.current.saveDescription(state.id, state.key, value)
                    }
                }
                } className={`detail--button ${edit ? 'active' : ''}`}
                        type={"button"}>{edit ? 'Save' : 'Edit Description'}
                </button>
                <button onClick={goBack} className={"button--close"} type={"button"}></button>
            </div>
        </div>
    );
}

export default Detail;