import { useState } from "react"
import { Link } from "react-router-dom"

const SearchBar = ({books}) => {
    const [search, setSearch] = useState('')

    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    return(
        <div>
            <h1>Search for a book...</h1>
            <input 
                type="text"
                value={search}
                placeholder="Search Here"
                onChange={(e) => {setSearch(e.target.value)}}
            />
            {
                search.length > 0 ? 
                <div>
                    <h3>Viewing {filteredBooks.length} out of {books.length}</h3>
                    <ul>
                        {
                            filteredBooks.map((book) => {
                                return <li key={book.id}>
                                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                                </li>
                            })
                        }

                    </ul> 
                </div>
                : null
                
            }

        </div>
    )
}

export default SearchBar