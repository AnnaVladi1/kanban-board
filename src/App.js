import Home from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Detail from "./pages/detail";
import Header from "./components/header/Header";

import './css/styles.css'
import Footer from "./components/footer/Footer";
import {mainRef} from "./helpers/functions"
import {useEffect, useImperativeHandle, useState} from "react";

function App() {
    let [tasks, setTasks] = useState();
    let [load, setLoad] = useState(false);
    let [total, setTotal] = useState(0);
    let [keyId, setKeyId] = useState('0');
    let [finished, setFinished] = useState(0)
    let [key, setKey] = useState(Math.random())
    useEffect(() => {
        getTasks();
        totalTasks();
    }, [])
    function calcTotal() {
        localStorage.setItem('total', Object.keys(tasks[0].items).length);
        setTotal(Object.keys(tasks[0].items).length)
    }
    useImperativeHandle(mainRef, () => ({
        saveTask: (id, value) => {
            setKeyId(++keyId);
            localStorage.setItem('id', keyId);
            tasks[id].items[keyId] = {
                text: value
            };
            calcTotal()
            localStorage.setItem('tasks', JSON.stringify(tasks))
        },
        getSingleTasks: (id, cardId) => {
            return tasks[cardId].items[id];
        },
        saveDescription: (id, cardId, description) => {
            tasks[cardId].items[id].description = description;
            localStorage.setItem('tasks', JSON.stringify(tasks))
        },
        changeTask: (taskId, id) => {
            tasks[id].items[taskId] = tasks[id - 1].items[taskId];
            delete tasks[id - 1].items[taskId];
            if (id === '3') {
                let items = Object.keys(tasks[id].items).length;
                localStorage.setItem('finished', items)
                setFinished(items)
            }
            localStorage.setItem('tasks', JSON.stringify(tasks))
            calcTotal()
            setKey(Math.random())
        }
    }))


    function totalTasks() {
        let count = localStorage.getItem('total'),
            keys = localStorage.getItem('id'),
            finished = localStorage.getItem('finished');
        if (count) {
            setTotal(count);
        }
        if (finished) {
            setFinished(finished)
        }
        if (keys) {
            setKeyId(keys)
        }
    }

    function getTasks() {
        let items = localStorage.getItem('tasks');
        if (items) {
            setTasks(JSON.parse(items))
        } else {
            setTasks({
                    0: {
                        title: 'Backlog',
                        items: {}
                    },
                    1: {
                        title: 'Ready',
                        items: {}
                    },
                    2: {
                        title: 'InProgress',
                        items: {}
                    },
                    3: {
                        title: 'Finished',
                        items: {}
                    }
                }
            )
        }
        setLoad(true)
    }

    return (
        <BrowserRouter>
            <main key={key} ref={mainRef} className={"flex"}>
                <Header/>
                {load ? <div className={"main flex"}>
                    <Routes>
                        <Route index element={<Home tasks={tasks}/>}/>
                        <Route path={'/task/:taskId'} element={<Detail/>}/>
                    </Routes>
                </div> : ""}
                <Footer key={total} total={total} finished={finished}/>
            </main>
        </BrowserRouter>
    );
}


export default App;
