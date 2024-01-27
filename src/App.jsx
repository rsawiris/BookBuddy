import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from "./components/Navigations"
import Books from './components/Books'
import SingleBooks from './components/singleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'
import SearchBar from './components/Searchbar'
import AboutUs from './components/AboutUs'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [reserved, setReserved] = useState([])


  useEffect(() => {
    const attemptLogin = async() => {
      const loggedInToken = window.localStorage.getItem('token')
      

      if(loggedInToken){
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })

        setUser(response.data)
      }else{
        
        throw 'no token'
      }

    }
    
    attemptLogin()
  },[reserved.length, token])


  useEffect(() => {
      const displayBooks = async () => {
          const {data} = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
          console.log(data)
          setBooks(data.books)
      }
      displayBooks()
  }, [reserved.length])

  useEffect(() => {
    const fetchReserved = async () => {
      const loggedInToken = window.localStorage.getItem('token')
      if(loggedInToken){
        const response = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })
  

        setReserved(response.data.reservation)
      }
    }

    fetchReserved()
  },[reserved.length])
 
  return (
    <>
    <h1 id='welcome'><img id='logo-image' src={bookLogo}/><Link to='/'>The Book Buddy Library</Link></h1>
    <Navigations user={user}/>
    <Routes>
      <Route path='/' element={<Homepage user={user}/>}/>
      <Route path='/searchbar' element={<SearchBar books={books} />}/>
      <Route path='/aboutus' element={<AboutUs />}></Route>
      <Route path='/successReg' element={<SuccessRegi />}/>
      <Route path='/books/' element={<Books books={books} />}/>
      <Route path='/books/:id' element={<SingleBooks books={books} user={user} reserved={reserved} setReserved={setReserved}/>}/>
      <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken} reserved={reserved} setReserved={setReserved}/>}/>
    </Routes>

      
    </>
  )
}

export default App
