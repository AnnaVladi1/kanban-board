import "./styles.css"
import {createRef, useState} from "react";
import {Link} from "react-router-dom";
import {mainRef} from "../../helpers/functions";

function Task(props) {
    return (<Link state={{ id: props.id, key: props.cardId }} to={`/task/${props.id}`}>{props.text}</Link>)
}



function Card(props) {
    let [input, showInput] = useState(false);
    let [value, setValue] = useState("");
    let [select, setSelect] = useState(false);
    let [taskId, setTaskId] = useState("");
    let [placeholder, setPlaceholder] = useState('')
    let [option, setOption] = useState(false)
    let scrollRef = createRef();
    let inputRef = createRef();

    function click(first = false) {
        let el = scrollRef.current;
        if (first) {
            setSelect(!select);
            if (select) {
                mainRef.current.changeTask(taskId, props.id)
            } else {
                setTimeout(() => {
                    el.scrollTop = el.scrollHeight;
                })
            }
        } else {
            showInput(!input);
            if (input) {
                if (!value.length) {
                    return false;
                }
                mainRef.current.saveTask(props.id, value)
            } else {
                setTimeout(() => {
                    el.scrollTop = el.scrollHeight;
                })
            }
        }
    }


    return (<div className={"card--wrap flex"}>
        <div className={"card flex"}>
            <div className={"card--title"}>{props.tasks.title}</div>
            <div ref={scrollRef} className={"card--main flex"}>
                {props.tasks && Object.keys(props.tasks.items).map(key => {
                    return (<Task key={key} id={key} cardId={props.id} text={props.tasks.items[key].text}/>)
                })}
                {input ? <div className={"input--wrap"}>
                    <input ref={inputRef} onInput={(e) => {
                        setValue(e.target.value)
                    }} type={"text"} placeholder={""} name={"card_input"}/>
                </div> : ''}
            </div>
            {select ? <div className={`select--wrap ${Object.keys(props.prevTasks.items).length ? 'margin' : ''}`}>
                <div onClick={() => {
                    setOption(!option)
                }} className={`select--holder flex ${option ? "active" : ''}`}>
                    {placeholder}
                </div>
                {option ? <div className={"select--main flex"}>
                    <div>
                        {Object.keys(props.prevTasks.items).map(key => {
                            return (<div key={key} onClick={() => {
                                setPlaceholder(props.prevTasks.items[key].text);
                                setTaskId(key)
                                setOption(false)
                            }} className={"select--option"}>{props.prevTasks.items[key].text}</div>)
                        })}
                    </div>
                </div> : ""}
            </div> : ''}
            <button
                disabled={(+props.id && (!props.prevTasks || !Object.keys(props.prevTasks.items).length)) || (+props.id && !taskId.length && select)}
                onClick={() => {
                    click(+props.id)
                }} className={`flex flex-center-vertical ${input || select ? "active" : ''}`}
                type={"button"}>{input || select ? 'Submit' : <>
                <span></span> Add card</>}</button>
        </div>
    </div>)

}

export default Card;