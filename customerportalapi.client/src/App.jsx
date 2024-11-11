import { useState } from 'react';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateInput = () => {
        const usernamePattern = /^[a-zA-Z0-9_]+$/;
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (!usernamePattern.test(username)) {
            setError('Invalid username format.');
            return false;
        }

        if (!emailPattern.test(email)) {
            setError('Invalid email format.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            // Simulate API call
            setSuccess('User registered successfully!');
            // Here you would typically call an API to register the user
            setUsername('');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="App">
            <h1>Welcome to Customer Portal</h1>
            <p>Register a new account</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default App;
