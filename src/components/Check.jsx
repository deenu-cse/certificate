import '../styles/Check.css';
import Nav from './Nav';
import React, { useState, useCallback, useRef } from 'react'
import certificate from '../assets/imgcer/cer1.png'
import { toPng } from 'html-to-image';

export default function Check() {
    const [certificateId, setCertificateId] = useState('');
    const [result, setResult] = useState(null);
    const [open, setOpen] = useState(false);
    const [name, setname] = useState('')
    const [course, setcourse] = useState('')


    const ref = useRef(null)

    const handdleDownload = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'NovaNectar-Certificate.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    const handleInputChange = (e) => {
        setCertificateId(e.target.value);
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://novanectarx-backend.vercel.app/api/verify/${certificateId}`);
            console.log("Function Hit")
            const data = await response.json();
            if (response.ok) {
                setResult(data);
                setOpen(true);
            } else {
                setResult({ isVerified: false, message: data.message });
                setOpen(false);
            }
        } catch (error) {
            setResult({ isVerified: false, message: 'Certificate not found!' });
            setOpen(false);
        }
    };

    return (
        <>
            <Nav />
            <div className="check-container">
                <header className="header">
                    <img
                        src="https://novanectar.co.in/wp-content/uploads/2024/10/header-logo.png"
                        alt="NovaNectar Logo"
                        className="logo"
                    />
                    <h1 className="title">Verify Your Certificate</h1>
                    <p className="tagline">"Your Achievements, Verified"</p>
                </header>
                <div className="forms">
                    <h2>Enter Certificate ID</h2>
                    <form onSubmit={handleVerify}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={certificateId}
                                onChange={handleInputChange}
                                placeholder="Enter your certificate ID"
                                className="certificate-input"
                                required
                            />
                        </div>
                        <button type="submit" className="verify-button">Verify Certificate</button>
                    </form>
                    {result && (
                        <>
                            <div className={`result-message ${result.isVerified ? 'success' : 'error'}`}>
                                <p>{result.message}</p>
                                {result.isVerified && result.data && (
                                    <>
                                        <div className="certificate-details">
                                            <h3>Certificate Details</h3>
                                            <p><strong>Issued To:</strong> {result.data.studentName}</p>
                                            <p><strong>Internship Field:</strong> {result.data.internshipField}</p>
                                            <p><strong>Issue Date:</strong> {new Date(result.data.issueDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="containerc" ref={ref}>
                                            <img className='certificate-body' src={certificate} height={400} />
                                            <div className="content">
                                                <h1>{result.data.studentName}</h1>
                                                <p>{result.data.internshipField}</p>
                                                <h5>{result.data.certificateId}</h5>
                                                <img src={result.data.qrCodeUrl} alt="QR Code" />
                                                <h6>Verify Now</h6>
                                            </div>
                                        </div>
                                        <div className="bttn">
                                            <button className='verify-buttonx' onClick={handdleDownload}>Download Certificate</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
