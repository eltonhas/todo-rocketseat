
import styles from './EmptyTask.module.css'

import { CalendarBlank } from 'phosphor-react'

export function EmptyTask() {
    return(
        <main className={styles.container}>
            <CalendarBlank size={50}/>
            <p className={styles.paragraph}>Você ainda não tem tarefas cadastradas.</p>
            <p>Crie tarefas e organize seus itens a fazer.</p>
        </main>
    )
}