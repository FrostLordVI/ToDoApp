import '../CSS/App.css'
import React, {useState} from 'react'

const Main=()=>{

    const date = new Date()

    const [newTask, setNewTask] = useState('')
    const [todoAr, setTodoAr] = useState([])

    const [[newHour,newMinutes], setNewTime] = useState([date.getHours(),date.getMinutes()])
    const [[newDay,newMonth,newYear],setNewDate] = useState([date.getDate(),date.getMonth()+1,date.getFullYear()])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        const newTaskObj = {
            content: newTask,
            date: [newDay,newMonth,newYear],
            time:[newHour,newMinutes],
            done:false,
            
        }

        if(newTaskObj.content && newTaskObj.date[0] && newTaskObj.date[1] && newTaskObj.date[2] && newTaskObj.time[0] && newTaskObj.time[1] !==''){
            
            
            setTodoAr([...todoAr, newTaskObj]);
        }
        
        setNewTask('');
        setNewTime([date.getHours(),date.getMinutes()]);
        setNewDate([date.getDate(),date.getMonth()+1,date.getFullYear()])
    }

    const toggleDone = (index) => {
        const updatedTodoAr = [...todoAr];
        updatedTodoAr[index].done = !updatedTodoAr[index].done; 
        setTodoAr(updatedTodoAr);
    }

    const delTask = (index) =>{
        const updateTodoAr = [...todoAr];
        updateTodoAr.splice(index, 1);
        setTodoAr(updateTodoAr);
    }

    
 

    return(
        <main>
            <div className="addTaskBoard">    
                
                <div className="container-inputField">
                    <input
                        placeholder="Your new task..."
                        type="text"
                        autoFocus
                        onChange={(event)=>{setNewTask(event.target.value)}}
                        value={newTask}
                        maxLength={10}
                        onKeyPress={handleKeyPress}
                    />
                    <div className='container-inputField-timeSection'>
                    <span className='timeSection-date'>
                        <input type='text' 
                            maxLength={2} 
                            onChange={(event)=>{setNewDate([event.target.value, newMonth, newYear])}}
                             
                            value={newDay}
                        />/
                        <input type='text' maxLength={2} 
                              onChange={(event)=>{setNewDate([newDay, event.target.value, newYear])}}
                              value={newMonth}
                        />/
                        <input type='text'  maxLength={4} 
                              onChange={(event)=>{setNewDate([newDay, newMonth, event.target.value])}}
                              value={newYear}
                        />
                    </span>
                    <span className='timeSection-time'>
                        <input type='text'  maxLength={2}
                            onChange={(event)=>{setNewTime([event.target.value, newMinutes])}}
                            value={newHour}
                        />:
                        <input type='text'  maxLength={2} 
                            onChange={(event)=>{setNewTime([newHour, event.target.value])}}
                            value={newMinutes}
                        />
                    
                    </span>
                    </div>
                    <button 
                        className="inputField-addBtn"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <div className='taskListBoard'>
                <div className='taskListBoard-item'>
                    {
                            todoAr.map((item,index) => (
                                <div 
                                className={`task ${item.done ? 'done' : ''}`} key={index}  
                                >
                                    <input type="checkbox" 
                                        onClick={()=> toggleDone(index)}
                                        checked={item.done}
                                    />
                                    <p
                                    key={index}
                                    className='item-contentTask'
                                    >
                                        {item.content}
                                    </p>
                                    <div className='taskListBoard-item-dateTimeField'>
                                        <p className='taskListBoard-item-dateTime'>
                                            {`${item.date[0]} / ${item.date[1]} / ${item.date[2]}`}
                                        </p>
                                        <p className='taskListBoard-item-dateTime'>
                                            {`${item.time[0]} : ${item.time[1]}`}
                                        </p>
                                    </div>
                                    <button className='delTaskBtn'
                                        onClick={()=>delTask(index)} 
                                            
                                    ></button>
                                </div>
                            ))                        
                    }
                </div>

            </div>
        </main>
    )
}

export default Main;