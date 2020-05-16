import React, { Fragment, useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask{
  name: string;
  done: boolean;
}

function App(): JSX.Element{

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void =>{
    e.preventDefault();
    if(!newTask) return;
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  }

  const addTask = (name: string): void =>{
    const newTasks: ITask[] = [...tasks, {name: name, done: false}];
    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  return (
    <Fragment>
      <div className="container p-3">
        <div className="row">
          <div className="col-md-8 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input type="text" onChange={
                      e => setNewTask(e.target.value)
                    }
                    className="form-control"
                    placeholder="Nueva tarea"
                    value={newTask}
                    ref={taskInput}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-success">
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {
              tasks.map((t: ITask, i: number) =>(
                  <div className="card card-body" key={i}>
                    <h2 style={{textDecoration: t.done ? '': 'line-through'}}>{t.name}</h2>
                    <div>
                      <button className="btn btn-primary" onClick={ () => toggleDoneTask(i) }>
                        {/* {t.done ? 'X': 'O'} */}
                        Checar
                      </button> 
                      <button className="btn btn-secondary" onClick={ () => removeTask(i)}>
                        Borrar
                      </button>
                    </div>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
