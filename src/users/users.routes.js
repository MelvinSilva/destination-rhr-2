const express = require('express')
const authController = require('./controllers/auth.controller')
const userController = require('./controllers/user.controller')
const authMiddleware = require('./middlewares/auth.middleware')
const userMiddleware = require('./middlewares/user.middleware')
const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/reconnect', authController.reconnect)
router.get ('/logout', [authController.logout])

router.post('/login', [authMiddleware.checkLogin, authController.signIn])
router.post('/register',[
    authMiddleware.checkFormRegister,
    authMiddleware.checkEmailUsed,
    authMiddleware.checkIdUsed, 
    authController.signUp])

router.put('/:id',[userController.updateUser])

router.delete('/:id',[userMiddleware.checkAuthorization, userController.deleteUser])



module.exports = router