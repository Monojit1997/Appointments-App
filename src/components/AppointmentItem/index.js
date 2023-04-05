// Write your code here
import './index.css'

const AppointmentsList = props => {
  const {eachItem, getFavouritesAppointment} = props

  const {id, text, date, isFavourite} = eachItem

  const selectedFavourites = () => {
    getFavouritesAppointment(id)
  }

  const starImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div>
        <p className="appointment-heading">{text}</p>
        <p className="description">{`Date: ${date}`}</p>
      </div>
      <div>
        <button
          type="button"
          className="star-button"
          onClick={selectedFavourites}
          data-testid="star"
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentsList
