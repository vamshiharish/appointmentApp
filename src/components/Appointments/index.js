// Write your code here

import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
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

// import {v4 as uuidv4} from 'uuid'

// import {Component} from 'react'

// import AppointmentItem from '../AppointmentItem'

// import './index.css'

// class Appointments extends Component {
//   state = {inputvalue: '', inputdate: '', appointmentlist: [], isStart: false}

//   updateData = event => {
//     event.preventDefault()

//     const {inputvalue, inputdate, appointmentlist} = this.state

//     const newlist = {
//       id: uuidv4(),
//       inputvalue,
//       inputdate,
//       isappointed: false,
//     }

//     // console.log(newlist)

//     this.setState(prevState => ({
//       appointmentlist: [...prevState.appointmentlist, newlist],
//       inputvalue: '',
//       inputdate: '',
//     }))

//     console.log(appointmentlist)
//   }

//   onChangeTitle = event => {
//     console.log(event.target.value)
//     this.setState({
//       inputvalue: event.target.value,
//     })
//   }

//   onChangeDate = event => {
//     this.setState({
//       inputdate: event.target.value,
//     })
//   }

//   onChangeStar = id => {
//     this.setState(prevState => ({
//       appointmentlist: prevState.appointmentlist.map(eachappointment => {
//         if (eachappointment.id === id) {
//           return {...eachappointment, isappointed: !eachappointment.isappointed}
//         }
//         return eachappointment
//       }),
//     }))
//   }

//   startedAppointments = event => {
//     const {isStart} = this.state
//     event.preventDefault()

//     this.setState({isStart: !isStart})
//   }

//   functionStart = () => {
//     const {appointmentlist, isStart} = this.state

//     if (isStart === true) {
//       const filterState = appointmentlist.filter(
//         eachObject => eachObject.isappointed === true,
//       )
//       return filterState
//     }
//     return appointmentlist
//   }

//   render() {
//     const {inputvalue, inputdate} = this.state

//     const filterAppointments = this.functionStart()
//     return (
//       <div className="container">
//         <div className="card-container">
//           <form className="form-card">
//             <h1 className="heading">Add Appointment</h1>
//             <p>TITLE</p>
//             <input
//               type="text"
//               placeholder="Title"
//               onChange={this.onChangeTitle}
//             />
//             <p>DATE</p>
//             <input
//               type="date"
//               placeholder="dd/mm/yyyy"
//               onChange={this.onChangeDate}
//             />
//             <button
//               type="button"
//               className="add-button"
//               onClick={this.updateData}
//             >
//               Add
//             </button>
//           </form>
//           <hr />
//           <div>
//             <h1>Appointments</h1>
//             <button
//               className="started-button"
//               type="button"
//               onClick={this.startedAppointments}
//             >
//               Started
//             </button>
//             <ul>
//               {filterAppointments.map(eachitem => (
//                 <AppointmentItem
//                   inputValue={inputvalue}
//                   inputdate={inputdate}
//                   appointments={eachitem}
//                   key={eachitem.id}
//                   onChangeStar={this.onChangeStar}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Appointments
