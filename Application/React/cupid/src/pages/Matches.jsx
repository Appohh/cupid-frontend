import { Context } from '../App.jsx';
import { useContext, useEffect, useState } from 'react'
import MatchService from "../Services/MatchService"
import MessagePopUp from '../Components/MessagePopUp/MessagePopUp.jsx'

const Matches = () => {
  const { loggedUser, setErrorPopUp, setSendNotification } = useContext(Context);
  const [matchUsers, setMatchUsers] = useState([])
  const [showMessagePopUp, setShowMessagePopUp] = useState(false)
  const [receiverId, setReceiverId] = useState(null)

  console.log("context", Context)


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

  const toggleShowMessagePopUp = (id) => {
    setReceiverId(id)
    setShowMessagePopUp(!showMessagePopUp)
  }



  if (matchUsers.length === 0) {
    return (
      <>

        {showMessagePopUp && (<MessagePopUp receiverId={receiverId} onClose={toggleShowMessagePopUp} />)}
        <div className="matches-content">
          <div className="matches-header">
            <h1>Matches</h1>
          </div>
          <h2>No matches yet</h2>
          <button onClick={() => { setSendNotification({ receiverId: 28, text: '💓You got a new match!' }) }} className="btn-message">Message</button>
          <button onClick={toggleShowMessagePopUp} className="btn-message">Message</button>
        </div>
      </>
    )
  }

  if (matchUsers.length > 0) {
    return (
      <>
        {showMessagePopUp && (<MessagePopUp receiverId={receiverId} onClose={toggleShowMessagePopUp} />)}
        <div className="matches-content">
          <div className="matches-header">
            <h1>Matches</h1>
          </div>
          <div className="matches-container">
            {matchUsers.map(user => (

              <div className="matches-card" key={user.id} style={{ backgroundImage: `url(src/assets/uploaded-images/${user.pimage})` }}>
                <h2>{user.fname} {user.lname}</h2>
                <button className="btn-message" onClick={() => toggleShowMessagePopUp(user.id)}>Message</button>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}


export default Matches
