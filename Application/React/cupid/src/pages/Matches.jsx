import { Context } from '../App.jsx';
import { useContext, useEffect, useState } from 'react'
import MatchService from "../Services/MatchService"

const Matches = () => {
  const { loggedUser, setErrorPopUp } = useContext(Context);
  const [matchUsers, setMatchUsers] = useState([])

  useEffect(() => {
    MatchService.getMatchingUsersById(loggedUser?.id)
      .then(data => {
        console.log("matches", data)
        setMatchUsers(data.data.matches)
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [])

  useEffect(() => {
    console.log("matchUsers", matchUsers)
  }, [matchUsers])


  if (matchUsers.length === 0) {
    return (
      <>
        <div className="matches-content">
        <div className="matches-header">
            <h1>Matches</h1>
          </div>
          <h2>No matches yet</h2>
        </div>
      </>
    )
  }

  if (matchUsers.length > 0) {
    return (
      <>
        <div className="matches-content">
          <div className="matches-header">
            <h1>Matches</h1>
          </div>
          <div className="matches-container">
            {matchUsers.map(user => (

              <div className="matches-card" key={user.id} style={{ backgroundImage: `url(src/assets/uploaded-images/${user.pimage})` }}>
                <h2>{user.fname} {user.lname}</h2>
                <button className="btn-message">Message</button>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}


export default Matches
