const userModel = require('../../models/mainSchema')
const path = require('path')
const fs = require('fs')


//Get home page
const getHome = async (req, res) => {
    const title = "HomePage"
    const messages = { success: req.flash('success'), warning: req.flash('warning') }
    const perPage = 5;
    const page = req.query.page || 1

    try {
        const users = await userModel.aggregate([{ $sort: { createdAt: 1 } }])
            .skip(page * perPage - perPage)
            .limit(perPage)
            .exec()
        const count = await userModel.countDocuments();
        res.render('index', { title, messages, users, current: page, pages: Math.ceil(count / perPage), currentPath: req.path })

    } catch (err) {
        console.log(err)
    }
}

//Get about page
const getAbout = (req, res) => {
    const title = "About"
    res.render('about', { title, currentPath: req.path })
}

//Get add user form
const GetForm = (req, res) => {
    const title = "Add User"
    res.render('./user/addUser', { title, currentPath: req.path })
}

//Post add user form
const submitForm = async (req, res) => {
    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        nonTech: req.body.nonTech,
        tech: req.body.tech,
        image: '/' + req.file.filename
    })
    try {
        await userModel.create(user)
        req.flash('success', 'User has been added successfully')
        res.redirect('/')
        console.log('User Added successfully')
    } catch (err) {
        console.log(err)
    }
}

//GET user page
const viewUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const title = await user.firstName + " " + user.lastName
        const messages = req.flash('success')
        res.render('view', { title, user, currentPath: req.path, messages })
    }
    catch (err) {
        console.log(err)
    }

}


//GET edit page
const editUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const title = "Edit user"
        res.render('edit', { title, user, currentPath: req.path })
    }
    catch (err) {
        console.log(err)
    }

}


//Update user data
const updateUser = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        nonTech: req.body.nonTech,
        tech: req.body.tech,
    }
    if (req.file?.filename) {
        data.image = '/' + req.file.filename
        try {
            const user = await userModel.findById(req.params.id)
            fs.unlink(path.join('D:\\Back-End\\Projects\\CRUD\\images', user.image), (err) => {
                console.log(err)
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    try {
        await userModel.findByIdAndUpdate(req.params.id, data)
        req.flash('success', 'User has been updated successfully')
        await res.redirect(`/view/${req.params.id}`)
    }
    catch (err) {
        console.log(err)
    }
}


//Delete users
const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        fs.unlink(path.join('D:\\Back-End\\Projects\\CRUD\\images', user.image), (err) => {
            console.log(err)
        })
        await userModel.findByIdAndDelete(req.params.id)
        req.flash('warning', 'User has been deleted successfully')
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
    }
}



//Search result
const findUser = async (req, res) => {
    const title = "HomePage"
    const messages = { success: req.flash('success'), warning: req.flash('warning') }
    const perPage = 5;
    const page = req.query.page || 1

    try {
        const users = await userModel.find({ firstName: req.body.searchTerm })
            .skip(page * perPage - perPage)
            .limit(perPage)
            .exec()
        const count = await userModel.countDocuments();
        res.render('index', { title, messages, users, current: page, pages: Math.ceil(count / perPage), currentPath: req.path })

    } catch (err) {
        console.log(err)
    }
}

module.exports = { getHome, getAbout, GetForm, submitForm, viewUser, editUser, updateUser, deleteUser, findUser }