import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'




const defaultValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: ""

}


const FormUser = ({ createUser, userUpdate, updateUser, setUserUpdate, isShowForm, handleChangeShowModal }) => {


    const { handleSubmit, register, reset } = useForm()


    const submitForm = (data) => {
        if (userUpdate) {
            updateUser(userUpdate.id, data)
        } else {
            createUser(data)
        }

        reset(defaultValues)
    }
    //sirve para montar en el formulario los datos de un usuario registrado
    useEffect(() => {
        if (userUpdate) {
            return reset(userUpdate)
        }
        reset(userUpdate)

    }, [userUpdate])

    //boton para borran
    const hanleClear = () => {
        reset(defaultValues)
        setUserUpdate()
    }

    const titleForm = userUpdate ? " Edit User" : " New User "
    const titleButton = userUpdate ? " Edit User" : " Add New User "
    return (
        <div className={`form__container ${isShowForm ? '' : "disable__form"} `}       >

            <form onSubmit={handleSubmit(submitForm)}   >
                <i onClick={handleChangeShowModal} className=' form__x   bx bx-x'></i>
                <h2 className='form__title'  > {titleForm} </h2>
                <div className='form__element'>
                    <label className='form__label' htmlFor="">Email</label>
                    <input className='form__input' placeholder='Enter your email' type="email"  {...register("email")} />
                </div>
                <div className='form__element'>
                    <label className='form__label' htmlFor="">Password</label>
                    <input className='form__input' placeholder='Enter your password' type="password"  {...register("password")} />
                </div>
                <div className='form__element'>
                    <label className='form__label' htmlFor="">First Name</label>
                    <input className='form__input' placeholder='Enter your name' type="text"  {...register("first_name")} />
                </div>
                <div className='form__element'>
                    <label className='form__label' htmlFor="">Last Name</label>
                    <input className='form__input' placeholder='Enter your last name' type="text"  {...register("last_name")} />
                </div>
                <div className='form__element'>
                    <label className='form__label' htmlFor="">Birthday</label>
                    <input className='form__input' type="date"  {...register("birthday")} />
                </div>
                <div className='container__btn--form'>

                    <button className='form__btn' type='button' onClick={hanleClear}  >Clear </button>
                    <button className='form__btn' >{titleButton}</button>

                </div>
            </form>
        </div>
    )
}

export default FormUser