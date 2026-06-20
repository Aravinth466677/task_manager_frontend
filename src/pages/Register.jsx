import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = async (event) => {
    event.preventDefault()

    try {
      await api.post('/auth/register', {
        email,
        password,
      })

      alert('User registered successfully')
      navigate('/')
    } catch (error) {
      alert('Error registering user')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Get started</p>
        <h1>Create account</h1>
        <p className="muted">Register once and keep your daily work in one place.</p>

        <form className="auth-form" onSubmit={register}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="auth-link">
          Already registered? <Link to="/">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
