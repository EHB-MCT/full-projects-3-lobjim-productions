const express = require('express')
const app = express()
const {
    MongoClient
} = require('mongodb')

require('dotenv').config()
const client = new MongoClient(process.env.URL)
const port = process.env.PORT

const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    v4: uuidv4
} = require('uuid');


app.use(cors())
app.use(express.json())


const verifyToken = async (req, res, next) => {
    const accesToken = req.headers["token"]
    if (accesToken) {
        try {
            jwt.verify(accesToken, process.env.ACCES_TOKEN_SECRET)
            next();

        } catch (error) {
            res.status(400).send({
                message: 'Your session has expired',
                value: error
            })
        }


    } else {
        res.status(403).send({
            message: 'Access Forbidden, No token provided'
        })
        return
    }

}

app.post('/register', async (req, res) => {
    try {

        if (!req.body.username || !req.body.email || !req.body.password) {
            res.status(400).send({
                message: 'Missing fields ! Please fill in the missing fields',
                status: 400
            })
            return
        }

        await client.connect()

        const db = client.db('jef').collection('users')

        const query = {
            email: req.body.email
        }

        const collection = await db.findOne(query)

        if (collection) {
            res.status(400).send({
                message: "User with this email already exists!",
                status: 400

            })
            return
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let newuser = {
            id: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        }

        await db.insertOne(newuser)
        res.status(200).send({
            message: 'Account successfully created !',
            status: 200
        })


    } catch (error) {

        res.status(500).send({
            error: "An error has occured",
            value: error
        })
    } finally {
        await client.close()
    }
})
app.post('/login', async (req, res) => {
    try {

        if (!req.body.email || !req.body.password) {
            res.status(400).send({
                message: 'Missing fields ! Please fill in the missing fields',
                status: 400
            })
            return
        }

        await client.connect()

        const db = client.db('jef').collection('users')

        const query = {
            email: req.body.email
        }

        const user = await db.findOne(query)

        if (!user) {
            res.status(400).send({
                message: "User with this email doesn't exist !",
                status: 400
            })
            return
        }
        const verifyPassword = await bcrypt.compare(req.body.password, user.password)
        if (verifyPassword) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, process.env.ACCES_TOKEN_SECRET, {
                expiresIn: '24h'
            }, {
                algorithm: 'RS256'
            })

            console.log(token)

            res.status(200).send({
                message: 'Succesfully logged in !',
                status: 200,
                token: token,
            })


        } else {
            res.status(400).send({
                message: 'Incorrect password !',
                status: 400
            })
            return
        }

    } catch (error) {

        res.status(500).send({
            error: "An error has occured",
            value: error
        })
    } finally {
        await client.close()
    }
})

app.post("/like", verifyToken, async (req, res) => {
    try {
        await client.connect()

        const colli = client.db('jef').collection('likes')

        const check = await colli.findOne({
            likeId: req.body.likeId,
            userId: req.body.userId
        })
        if (check) {
            res.status(400).send({

                message: "Plaats al geliket",

            })
            return
        }


        const user = await colli.insertOne({
            likeId: req.body.likeId,
            userId: req.body.userId,
            adress: req.body.adress,
            name: req.body.name,
            type: req.body.type,
            lat: req.body.lat,
            long: req.body.long
        })

        res.status(201).send({
            status: "Saved",
            message: "Favoriete plaats succesvol opgeslaan !",
        })


    } catch (error) {
        console.log(error)
        res.status(400).send({
            error: 'An error has occured!',
            value: error
        })
    } finally {
        await client.close()
    }

})


app.delete("/deleteLike", verifyToken, async (req, res) => {
    try {
        await client.connect();

        const colli = client.db('jef').collection('likes')

        const likes = await colli.findOneAndDelete({
            likeId: parseInt(req.query.likeId),
            userId: req.query.userId
        })

        if (likes) {
            res.status(200).send({
                status: "Success",
                message: "Favoriete plaats verwijderd !"

            })
            return

        } else {

            res.status(401).send({
                status: "Bad Request",
                message: "Can't delete your like"

            })

            return

        }

    } catch (error) {

        console.log(error)

        res.status(500).send({

            error: 'Something went wrong!',

            value: error

        });

    } finally {

        await client.close();

    }

})
app.get("/like/:id", async (req, res) => {

    try {
        await client.connect()
        const colli = client.db('jef').collection('likes')
        const likedPlace = await colli.find({
            userId: req.params.id
        }).toArray()

        res.status(201).send({
            data: likedPlace,
            status: "Success",
        })

    } catch (error) {
        res.status(400).send({
            error: "An error has occured!",
            value: error
        })

    } finally {
        await client.close()
    }

})


app.get('/checkConnection', verifyToken, async (req, res) => {
    res.send({
        message: "You are connected !",
        status: 'Authenticated'
    })
})




app.listen(port, () => {
    console.log(`This app is runnning on port ${port}`)
})