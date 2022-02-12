import classes from './contact-form.module.css'
import { useEffect, useRef, useState } from 'react'
import Notification from '../ui/notification'

const sendContactData = async (contactDetails) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactDetails)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong..')
    }
}

const ContactForm = () => {
    const [requestError, setRequestError] = useState()
    const [requestStatus, setRequestStatus] = useState()
    const emailRef = useRef()
    const nameRef = useRef()
    const messageRef = useRef()

    useEffect(() => {
        if (requestStatus === 'success') {
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
                return () => {
                    clearTimeout(timer)
                }
            }, 3000)
        }
    }, [requestStatus])

    const submitHandler = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const name = nameRef.current.value
        const message = messageRef.current.value

        // Optional: Validation
        setRequestStatus('pending')
        try {
            await sendContactData({ email, name, message })
            setRequestStatus('success')
            emailRef.current.value = ''
            nameRef.current.value = ''
            messageRef.current.value = ''
        } catch (err) {
            setRequestError(err.message)
            setRequestStatus('error')
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message',
            message: 'Your message is on it\'s way'
        }
    } else if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Message sent.',
            message: 'Successfully sent message to server'
        }
    } else if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error',
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How Can I Help You ?</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input ref={emailRef} type='email' id='email' required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input ref={nameRef} type='text' id='name' required />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your message</label>
                    <textarea ref={messageRef} id='message' rows='5' required></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification
                title={notification.title}
                message={notification.message}
                status={notification.status}
            />}
        </section>
    )
}

export default ContactForm