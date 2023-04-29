// Write your code here

import './index.css'

const AppointmentIem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentIem

// const AppointmentItem = props => {
//   const {appointments, onChangeStar} = props

//   const {id, inputdate, inputvalue, isappointed} = appointments

//   const onChangeComponent = () => {
//     onChangeStar(id)
//   }

//   const istrue = isappointed
//     ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
//     : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

//   return (
//     <div>
//       <h1>{inputvalue}</h1>
//       <p>{inputdate}</p>
//       <img src={istrue} alt="star" onClick={onChangeComponent} />
//     </div>
//   )
// }

// export default AppointmentItem
