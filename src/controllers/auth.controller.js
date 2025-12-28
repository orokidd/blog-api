const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({
        where: { username: username }
        })
    
        if (!user) return res.status(400).json({ message: "Invalid username or password" })
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.status(400).json({ message: "Invalid username or password"})
            
        const paylod = {
            id: user.id,
            username: user.username
        }
            
        const token = jwt.sign(paylod, process.env.JWT_SECRET, {expiresIn: '1h'})
            
        res.status(200).json({token})

        } catch (error) {
            res.status(500).json({ messsage: "Server error" })
        }
    
}

const register = async (req, res) => {
    const { username, password, email, passwordConfirmation } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== passwordConfirmation) {
        return res.status(400).json({ message: "Password confirmation doesn't match" })
    }

    try {
        const userExist = await prisma.user.findFirst({
            where: { 
                OR: [{ username: username },{ email: email }]
            }
        })

        if (userExist) return res.status(400).json({ message: "Username or Email already exists." })

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(200).json({message: "User created successfully"})

    } catch (error) {
        res.status(500).json({ messsage: "Server error" })
    }
}

module.exports = {
    login,
    register
}