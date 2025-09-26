import { NavLink } from 'react-router-dom'

function User() {
  return (
    <main>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users">Back to Users</NavLink>
      <div>Single User</div>
    </main>
  )
}

export default User
