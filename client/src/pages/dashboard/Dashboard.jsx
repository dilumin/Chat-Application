// TestPostComponent.js
import React, { useState } from 'react';
import useAxiosInstance from '../../hooks/useAxiosInstance'; // Adjust the path as per your project structure
import ContactList from './components/ContactList';

const Dashboard = () => {
    const axiosInstance = useAxiosInstance();
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/test', { message , hi:"hehe" });
            console.log('Response:', res);
            setResponse(res.data.message);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };
    return (
        <div>
            <ContactList />
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
                <button type="submit">Send</button>
            </form>
            {response && <div>Response: {response}</div>}
        </div>
    );
};

export default Dashboard;
