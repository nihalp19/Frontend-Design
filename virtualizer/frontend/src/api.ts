

export const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/api/v1/todos")

    return response.json()
}