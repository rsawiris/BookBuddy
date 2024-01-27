import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Books = ({books }) => {
 
    
    return(
        <div>

            <h1>Books</h1>
            <ul>
                {
                    books.map((book) => {
                        return (
                            <div className="mainBooks">
                            <p className='books' key={book.id}>
                            <Link to={`/books/${book.id}`}>  
                                {book.title}
                                <img id='mainBook' src={book.coverimage}/>
                            </Link>  
                            </p>
                            </div>
                        )
                    })
                }
            </ul>

        </div>
    )
}

export default Books