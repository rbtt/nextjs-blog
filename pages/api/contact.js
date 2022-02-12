import { MongoClient } from "mongodb"

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.6lgiz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, name, message } = req.body

        if (!email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === '') {
            res.status(422).json({ message: 'Invalid input' })
            return
        }

        // Store to database
        const newMessage = {
            email, name, message
        }

        let client;
        try {
            client = await MongoClient.connect(connectionString)
        } catch (error) {
            res.status(500).json({ message: error.message || 'Could not connect to Database.' })
            return
        }

        try {
            const result = await client.db(process.env.mongodb_database).collection('messages').insertOne(newMessage)
            newMessage._id = result.insertedId.toString()
        } catch (e) {
            res.status(500).json({ message: e.message || 'Couldn\'nt insert document in database.' })
        }

        res.status(201).json({ message: 'Successfully stored message' })
        client.close()
    }
}

export default handler