import React, { useState } from 'react';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        const usernamePattern = /^[a-zA-Z0-9_]+$/;
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (!usernamePattern.test(username)) {
            setError("Invalid username format.");
            return false;
        }

        if (!emailPattern.test(email)) {
            setError("Invalid email format.");
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            const userData = { username, email, password };

            try {
                const response = await fetch('https://localhost:5001/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // Successful registration
                } else {
                    setError(result.message || 'Error occurred');
                }
            } catch (err) {
                setError('An error occurred while registering.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default RegisterForm;
