
const Homepage = ({user}) => {
  

    return(
        <div>
            
            <h2>Welcome to our library {user.firstname}!</h2>
            <img className='bookimg'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcOf1LRtX0xgmByzUXWz2wawamZZ3OTNxUw&usqp=CAU"/>
            {
                user.email ? (
            
            <h2 className="welcome">Browse Books and Checkout a book to read!</h2> ) :(
            <h2 className="welcome">Browse Books and log in to checkout a book!</h2>

            )}
        </div>
    )
}

export default Homepage