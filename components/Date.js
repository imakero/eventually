import { FaRegCalendarAlt } from 'react-icons/fa'

export default function Date({ date }) {
  return (
    <span className="date">
      <FaRegCalendarAlt /> {date}
    </span>
  )
}
