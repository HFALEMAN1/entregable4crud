
import axios, { Axios } from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

const BASE_URL = "https://users-crud.academlo.tech/"
function App() {
  //Estado para almacenar los usuarios y mostrarlos
  const [users, setUsers] = useState()
  const [userUpdate, setUserUpdate] = useState()
  const [isShowForm, setIsShowForm] = useState(false)

  //Funcion que obtiene todos los usuarios
  const getAllUsers = () => {
    const URL = `${BASE_URL}users/ `
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  //Funcion que crea un Usuario
  const createUser = (data) => {
    const URL = `${BASE_URL}users/ `
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        handleChangeShowModal()

      })
      .catch(err => console.log(err))

  }



  //Obtencion de los usuarios al cargar la app
  useEffect(() => {

    getAllUsers()
  }, [])

  //eliminar usuarios
  const deleteUser = (id) => {
    const URL = `${BASE_URL}users/${id}/ `
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  //editar usuarios
  const updateUser = (id, data) => {
    const URL = `${BASE_URL}users/${id}/ `
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setUserUpdate()
        handleChangeShowModal()

      })
      .catch(err => console.log(err))
  }

  const handleChangeShowModal = () => {
    setIsShowForm(!isShowForm)
  }
  const handleClickNewUser = () => {
    setUserUpdate()
    handleChangeShowModal()
  }

  return (
    <div className="App">
      <div className='header__container'>

        <h1 className='title'>CRUD USERS</h1>
        <button onClick={handleClickNewUser} className='header__btn' ><i className=' plus bx bx-plus'></i> Create new User</button>
      </div>


      <FormUser
        createUser={createUser}
        userUpdate={userUpdate}
        updateUser={updateUser}
        setUserUpdate={setUserUpdate}
        isShowForm={isShowForm}
        handleChangeShowModal={handleChangeShowModal}
      />


      <div className='users__container'>

        {
          users?.map(user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserUpdate={setUserUpdate}
              handleChangeShowModal={handleChangeShowModal}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
