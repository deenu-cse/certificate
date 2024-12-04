import React, { useState, useCallback, useRef } from 'react'
import '../styles/Certificate.css'
import certificate from '../assets/imgcer/cer1.png'
import { toPng } from 'html-to-image';

export default function Certificate() {
    const [name, setname] = useState('')
    const [course, setcourse] = useState('')

    const ref = useRef(null)

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    return (
        <>
            <div className="containerc">
                <img src={certificate} height={400} />
                <div className="content">
                    <h1>Deendayal</h1>
                    <p>Web Developer</p>
                </div>
            </div>
        </>
    )
}
