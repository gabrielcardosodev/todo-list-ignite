import { PlusCircle, Scroll, Trash } from 'phosphor-react'
import React, { FormEvent, useState } from 'react'

interface TaskType {
  id: number
  isCompleted: boolean
  title: string
}

export function Tasks() {
  const [taskTitle, setTaskTitle] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>([])

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!taskTitle) {
      return alert('Por favor, insira um titulo')
    }

    const newTask = {
      id: Math.random(),
      isCompleted: false,
      title: taskTitle
    }

    setTasks(tasks => [...tasks, newTask])
    setTaskTitle('')
  }

  function handleConcludeTask(id: number) {
    const taskComplete = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted
          }
        : task
    )

    setTasks(taskComplete)
  }

  function handleDeleteTask(id: number) {
    const filteredTask = tasks.filter(task => task.id !== id)

    setTasks(filteredTask)
  }

  return (
    <>
      <form
        onSubmit={handleCreateNewTask}
        className="flex w-full items-center justify-center gap-2"
      >
        <textarea
          onChange={e => setTaskTitle(e.target.value)}
          value={taskTitle}
          className="h-[3.375rem] w-full resize-none rounded-lg border border-gray-700 bg-gray-500 pl-4 pt-3 text-gray-100 placeholder:text-gray-300 focus:border-blue-300 focus:ring-0"
          placeholder="Adicione uma nova tarefa"
        />
        <button
          type="submit"
          className="flex h-[3.25rem] items-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-bold text-gray-100 transition-colors hover:bg-blue-300"
        >
          Criar
          <PlusCircle weight="bold" size={16} />
        </button>
      </form>

      <div className="mt-16 w-full">
        <div className="mb-6 flex justify-between">
          <strong className="flex items-center gap-2 text-sm text-blue-300">
            Tarefas criadas
            <span className="rounded-full bg-gray-400 px-2 text-gray-200">
              {tasks.length}
            </span>
          </strong>

          <strong className="flex items-center gap-2 text-sm text-blue-300">
            Concluídas
            <span className="rounded-full bg-gray-400 px-2 text-gray-200">
              {tasks.filter(task => task.isCompleted).length} de {tasks.length}
            </span>
          </strong>
        </div>

        {!tasks.length ? (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg border-t border-gray-400 text-gray-300">
            <Scroll size={56} />
            <strong className="mt-4">
              Você ainda não tem tarefas cadastradas
            </strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          tasks.map(task => {
            return (
              <div
                key={task.id}
                className="mb-3 flex w-full justify-between rounded-lg bg-gray-500 p-4"
              >
                <label className="flex items-center gap-3">
                  <input
                    onClick={() => handleConcludeTask(task.id)}
                    type="checkbox"
                    checked={task.isCompleted}
                    className="h-4 w-4 cursor-pointer rounded-full border-blue-300 bg-transparent checked:bg-purple-500 checked:hover:bg-purple-500 focus:ring-0"
                  />
                  <p
                    className={`${
                      task.isCompleted && 'line-through'
                    } text-sm text-gray-100`}
                  >
                    {task.title}
                  </p>
                </label>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-300 transition-colors hover:text-blue-500"
                >
                  <Trash size={24} />
                </button>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
