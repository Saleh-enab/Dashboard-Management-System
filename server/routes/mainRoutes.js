const controller = require('../controllers/mainController')
const express = require('express')
const path = require('path')


const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage })


//Get home page
router.get('/', controller.getHome)


//Get about page
router.get('/about', controller.getAbout)

//Get add user form
router.get('/add', controller.GetForm)

//Adding new user to the Database
router.post('/add', upload.single("image"), controller.submitForm)

//View users data
router.get('/view/:id', controller.viewUser)

//Open edit page
router.get('/edit/:id', controller.editUser)

//Update User
router.put('/edit/:id', upload.single("image"), controller.updateUser)

//Delete Users
router.delete('/edit/:id', controller.deleteUser)

//Find users
router.post('/search', controller.findUser)

module.exports = router