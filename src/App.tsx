
import { ChangeEvent, FormEvent, InvalidEvent, useState, useEffect } from 'react'
import { v4 } from 'uuid';
import { PlusCircle } from 'phosphor-react'

import './global.css'

import styles from './App.module.css'
import { Header } from './Components/Header'
import { EmptyTask } from './Components/EmptyTask'
import { TaskBox } from './Components/TaskBox'

interface TaskProps {
  id: string
  title: string
  done: boolean
}

function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([])

  const [numberTasks, setNumberTasks] = useState(0)
  const [numberCompleteTasks, setNumberCompleteTasks] = useState(0)

  const [textTask, setTextTask] =useState('')

  useEffect( () => {
    setNumberTasks(tasks.length)
  }, [tasks])

  useEffect( () => {
    const completeTasks = tasks.filter( task => (
      task.done === true
    ))
    setNumberCompleteTasks(completeTasks.length)
  }, [tasks])

  function handleTask(event : FormEvent) {
    event.preventDefault()
    const task = {
      id: v4(),
      title: textTask,
      done: false
    }
    
    setTasks([ ...tasks, task ])

    setTextTask('')
  }

  function handleTextTask(event : ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTextTask(event.target.value)
  }

  function handleNewTaskInvalid(event : InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório.')
  }

  function handleDelete(id: string) {
    const tasksWithoutDeleteTask = tasks.filter( task => (
      task.id !== id
    ))

    setTasks(tasksWithoutDeleteTask)
  }

  function handleDone(id: string) {
    const taskToChange = tasks.filter( task => (
      task.id === id
    ))
    
    taskToChange[0].done = !taskToChange[0].done

    const tasksWithoutDeleteTask = tasks.filter( task => (
      task.id !== id
    ))

    setTasks([ ...tasksWithoutDeleteTask, taskToChange[0] ])
  }

  return (
    <>
      <Header/>

      <main className={styles.container}>

        <form onSubmit={handleTask}>
          <input 
            type='text' 
            placeholder='Adicione uma nova tarefa.'
            value={textTask}
            onChange={handleTextTask}
            required
            onInvalid={handleNewTaskInvalid}
          />
          <button type='submit'>
            Criar
            <PlusCircle size={22}/>
          </button>
        </form>

        <section>
          <div className={styles.taskInfos}>
            <div>
              <span>Tarefas criadas</span>
              <span className={styles.numberInfo}>{numberTasks}</span>
            </div>
            <div>
              <span>Concluídas</span>
              
              {
                numberTasks === 0 ? 
                  <span className={styles.numberInfo}>{numberTasks}</span>
                :
                  <span className={styles.numberInfo}>{`${numberCompleteTasks} de ${numberTasks}`}</span> 
              }
              
            </div>
          </div>

          { 

            tasks.length === 0 ? <EmptyTask/> :
            tasks.map( task => (
              <TaskBox
                key={task.id}
                id={task.id}
                task={task.title}
                done={task.done}
                onDone={handleDone}
                onDelete={handleDelete}
              />
            ))
          }
        </section>

      </main>

    </>
  )
}

export default App
