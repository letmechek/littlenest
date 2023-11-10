// Rewrite the SignUpForm as a function component
import { useState } from 'react'
import { signUp } from '../../utilities/users-service'
import logo from '../../Assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

export default function SignUpForm({ setUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })
    const disable = formData.password !== formData.confirm;
    const navigate = useNavigate();
    function handleChange(evt) {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const formDataCopy = {...formData}
            delete formDataCopy.error
            delete formDataCopy.confirm
            const user = await signUp(formDataCopy)
            setUser(user)
            navigate('/')
        } catch {
            setFormData({
                ...formData,
                error: 'Sign Up Failed - Try Again'
            })
        }
    }

    return(
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img className='mx-auto h-10 w-auto rounded-3xl' src={logo} alt='Workflow' />
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Sign up for an account</h2>
      </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form autoComplete="off" onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                </div>

                <div>
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                    <div className='mt-2'>
                        <input type="text" name="email" value={formData.email}  onChange={handleChange} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                    </div>
                </div>

                <div className=''>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                </div>

                <div>
                    <label className='block text-sm font-medium leading-6 text-gray-900'>Confirm</label>
                    <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                </div>

                <div>
                <button className='flex w-full justify-center rounded-md bg-custom-yellow px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type="submit">SIGN UP</button>
                </div>
              </form>
            </div>
            <p className="error-message">&nbsp;{formData.error}</p>
          </div>
    )
}