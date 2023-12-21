import { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import axios from 'axios'

const Users = () => {
  const { users, dispatch } = useWorkoutsContext()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [error, setError] = useState(null)

  const fetchUsers = async (e) => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/users')

      if(data) {
        dispatch({type: 'SET_USERS', payload: data})
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createUser = async (e) => {
    e.preventDefault()

    try {
      const user = {
        id, name, age, email
      }

      const config = {
        'Content-Type': 'application/json'
      }

      // To Server
      const { data } = await axios.post('http://localhost:3000/api/users', user, config)

      // To State
      if(data) {
        dispatch({ type: 'CREATE_USER', payload: data })
        console.log(users)
      }
      
    } catch (error) {
      
    }
  }

  const deleteUser = async (e, deleteId) => {
    e.preventDefault()

    const config = {
      'Content-Type': 'application/json'
    }

    try {
      const { data } = await axios.delete(`http://localhost:3000/api/users/${deleteId}`, config)

      if(data) {
        dispatch({ type: 'DELETE_USER', payload: data })
      }
    } catch (error) {
      
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div> 
      <h1>Users</h1>

      <button onClick={fetchUsers}>Fetch Users</button>

      <ul>
        {users && users.map((user) => (
          <li key={user.id}>ID: {user.id} is {user.name}</li>
        ))}
      </ul>

      <form onSubmit={createUser}>
        <label>Name: </label>
        <input type="text"
          onChange={(e) => setName((e.target.value))} 
          value={name}
        />

        <label>Age: </label>
        <input type="number"
          onChange={(e) => setAge(parseInt(e.target.value), 10)} 
          value={age}
        />

        <label>Email: </label>
        <input type="text"
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />

        <label>ID: </label>
        <input type="number"
          onChange={(e) => setId(parseInt(e.target.value), 10)} 
          value={id}
        />

        <button>Add user</button>
      </form>
      <form onSubmit={(e) => deleteUser(e, deleteId)}>
        <label>ID: </label>
        <input 
          type="number"
          onChange={(e) => setDeleteId(parseInt(e.target.value), 10)}
          value={deleteId}
        />
        <button>Delete User</button>
      </form>
    </div>
  )
}

export default Users