import React, { useState } from 'react';
import '../styles/Home.css';
import Nav from './Nav';
import Certificate from './Certificate';

export default function FormGenerator() {
    const [data, setData] = useState({
        studentName: '',
        internshipField: '',
    });

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://novanectarx-backend.vercel.app/api/certificates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                setData({
                    studentName: '',
                    internshipField: '',
                });
                alert('Certificate generated successfully')
            } else {
                console.error('Failed to generate certificate:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred in genrating the Certificate:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className="form-generator-container">
                <header className="header-section">
                    <img
                        src="https://novanectar.co.in/wp-content/uploads/2024/10/header-logo.png"
                        alt="NovaNectar Logo"
                        className="logo"
                    />
                    <h1 className="company-title">NovaNectar Services</h1>
                    <p className="tagline">"Your Problems, Our Solutions"</p>
                </header>
                <div className="forms">
                    <h2>Create a New Certificate</h2>
                    <form onSubmit={handleForm}>
                        <div className="form-group">
                            <label htmlFor="studentName">Student Name</label>
                            <input
                                type="text"
                                value={data.studentName}
                                name="studentName"
                                placeholder="Enter student's name"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="internshipField">Internship Field</label>
                            <input
                                type="text"
                                value={data.internshipField}
                                name="internshipField"
                                placeholder="Enter internship field"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Generate Certificate
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
