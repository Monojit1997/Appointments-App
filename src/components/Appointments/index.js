// Write your code here
import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import './index.css'

import {format} from 'date-fns'

import AppointmentsList from '../AppointmentItem'

class Appointments extends Component {
  state = {text: '', date: '', appointmentList: [], starred: false}

  starredAppointment = () => {
    // eslint-disable-next-line no-unused-vars
    const {starred} = this.state
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  getFavouritesAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavourite: !eachItem.isFavourite}
        }
        return eachItem
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {text, date} = this.state
    const splitDate = date.split('-')
    const convertDate = format(
      new Date(splitDate[0], splitDate[1], splitDate[2]),
      'dd MMMM yyyy, EEEE',
    )
    const newAppointment = {
      id: uuidV4(),
      text,
      date: convertDate,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      text: '',
      date: '',
    }))
  }

  getText = event => {
    this.setState({text: event.target.value})
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {text, date, appointmentList, starred} = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-input-container">
            <form onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <label htmlFor="text" className="description">
                Title
              </label>
              <br />
              <input
                type="text"
                id="text"
                className="input"
                placeholder="Title"
                onChange={this.getText}
                value={text}
              />
              <br />
              <label htmlFor="date" className="description">
                Date
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.getDate}
                value={date}
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-containe">
            <div className="appointment-add-container">
              <h1 className="main-heading">Appointments</h1>
              <button
                type="button"
                className={starred ? 'active-starred-button' : 'starred-button'}
                onClick={this.starredAppointment}
              >
                Starred
              </button>
            </div>
            <ul className="unorder-list">
              {appointmentList.map(eachItem => (
                <AppointmentsList
                  key={eachItem.id}
                  eachItem={eachItem}
                  getFavouritesAppointment={this.getFavouritesAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
