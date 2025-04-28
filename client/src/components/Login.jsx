import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const userData = await loginUser({ email, password });
      login(userData, userData.token);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue to your account</p>
      </div>

      <div className="auth-form-body">
        {error && <div className="auth-form-alert auth-form-alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn auth-form-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-social-buttons">
          <button className="auth-social-button" type="button" aria-label="Google">
            <i className="fab fa-google"></i>
          </button>
          <button className="auth-social-button" type="button" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="auth-social-button" type="button" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </button>
        </div>
      </div>

      <div className="auth-form-footer">
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
