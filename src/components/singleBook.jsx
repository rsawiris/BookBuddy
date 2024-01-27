import { useParams, Link } from "react-router-dom"
import axios from "axios"

const SingleBooks = ({books, user, reserved, setReserved}) => {
    const params = useParams()
    const id = params.id * 1

    const book = books.find((book) => {
        return (book.id === id)
    })

    const handleClick = async () => {
        const token = window.localStorage.getItem('token')
        const {data} = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, 
        {available: false},
        {

            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        window.alert(`Checked out ${data.book.title}!`)
        
        setReserved([...reserved, data.book])
    }

    if(!book){
        return null
    }

    return(
        <div className='singleBook'>
            <h1>{book.title}</h1>
            <h2>Written By: {book.author}</h2>
            <img className='bookImage' src={book.coverimage}/>
            <li>{book.description}</li>
            <button disabled={ user.email && book.available ? false : true} 
                                onClick={() => {handleClick()}}>
                                Checkout
                            </button>
            {
                user.email ? null : <p>Login to check out a book!</p>
            }
            <br />
            <Link to={'/books'}>Back to all books</Link>
        </div>
    )
}

export default SingleBooks