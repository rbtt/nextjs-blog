import { Fragment } from "react"
import ContactForm from "../components/contact/contact-form"
import Head from "next/head"

const ContactPage = () => {
    return <Fragment>
        <Head>
            <meta name="description" content="A page for contact with the Blog owner" />
        </Head>
        <ContactForm />
    </Fragment>
}

export default ContactPage