
import { MouseEvent, useState } from 'react'
import { Trash, Check } from 'phosphor-react'

import styles from './TaskBox.module.css'

interface TaskBoxProps {
    id: string
    task: string
    done: boolean
    onDone: ( id : string) => void
    onDelete: ( id : string) => void
}

export function TaskBox({ id, task, done, onDone, onDelete } : TaskBoxProps) {

    function onChangeDone() {
        onDone(id)
    }

    function onDeleteTask() {
        onDelete(id)
    }

    return(
        <main className={styles.TaskBox}>
            <div className={styles.TextTask} onClick={onChangeDone}>
                <div className={ done ? styles.CheckBoxChecked : styles.CheckBox}>
                    {
                        done ? <Check size={16}/> : ''
                    }
                </div>
                <label className={ done ? styles.TaskDecoration : ''}>{task}</label>
            </div>
            <div className={styles.TrashSvg} onClick={onDeleteTask}>
                <Trash size={18}/>
            </div>
        </main>
    )
}