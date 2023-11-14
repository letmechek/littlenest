import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MapPinIcon,ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import logo from '../../Assets/images/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartIcon from '../CartIcon/CartIcon'
import avatar from '../../Assets/images/avatar.png'

const navigation = [
   
  { name: '% PROMOTIONS', href: '/', current: false },
  { name: 'CALL US', href: 'tel:+1234567890', current: false },
  { name: 'BOOK NOW', href: '#', current: false },
  {name: <CartIcon />, to: '/cart', current: false},
]

const secondNav = [
    {name: 'HOME PAGE', to: '/', current: false},
    {name: 'ABOUT US', to: '/about-us', current: false},
    {name: 'Shop All', to: '/products', current: false},
    {name: 'OUR LOCATION', to: '/location', current: false},
   
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function NavBar({user , setUser}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    let navigate 
    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <>
        <Disclosure as="nav" className="bg-yellow-700">
        {({ open }) => (
            <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-24 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                    <div className="flex flex-shrink-0 items-center">
                        <Link to="/">
                    <img
                        className="h-16 w-auto filter invert"
                        src={logo}
                        alt="Your Company"
                    />
                    </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block ">
                    <div className="flex space-x-4 ">
                        {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                            item.current ? 'bg-sky-400 text-white' : 'text-white hover:bg-sky-300 hover:text-white',
                            'rounded-md px-8 py-6 text-lg font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                        ))}
                        <div className="">
      </div>
                    </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                        {user ? (

                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src={avatar}
                            alt=""
                        />
                        </Menu.Button>
                        ):(<div></div>)
                        }
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                               Username: {user.name}
                            </a>
                            )}
                        </Menu.Item>
                        {/* <Menu.Item>
                            {({ active }) => (
                            <Link
                                to="/cart"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                               <CartIcon  />
                            </Link>
                            )}
                        </Menu.Item> */}
                        <Menu.Item>
                            {({ active }) => (
                            <Link
                               to='/'
                                onClick={handleLogOut}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Sign out
                            </Link>
                            )}
                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu> 
                </div>
                </div>
            </div>
                        {/* sandwich menu */}
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                {secondNav.concat(navigation).map((item) => (
                    <Link
                    key={item.name}
                    as="a"
                    to={item.to}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                    </Link>
                ))}
                </div>
                
            </Disclosure.Panel>
            </>
        )}
        
        </Disclosure>
        <Disclosure as="nav" className="bg-custom-yellow hidden md:block custom-shadow">
            <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-11 items-center justify-between">
                
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                    </div>
                    {/* seccond navbar */}
                    <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        {secondNav.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                            item.current ? 'bg-sky-400 text-white' : 'text-white font-semibold hover:bg-sky-200 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Link>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    {/* Profile dropdown */}
                    {/* <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Your Profile
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Settings
                            </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Sign out
                            </a>
                            )}
                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu> */}
                </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                    <Link
                    key={item.name}
                    as="a"
                    to={item.to}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                    </Link>
                ))}
                </div>
            </Disclosure.Panel>
            </>
            
        
        </Disclosure>
        
        </>
    )
    }
