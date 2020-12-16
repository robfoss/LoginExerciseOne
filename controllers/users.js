const bcrypt = require('bcryptjs');
const { Users } = require('../models');
const { layout } = require('../utility');

const login = (req, res) => {
    res.render('login', {
        ...layout,
        locals: {
            title: 'Login',
            formTitle: 'Login'
        }

    })
}

const processLogin = async (req, res) => {
    const { name, password } = req.body;
    const user = await Users.findOne({
        where: {
            name
        }
    });
    if(user) {
        console.log('valid user');
        const isValid = bcrypt.compareSync(password, user.hash);
        if(isValid) {
            console.log('password is good');
            res.redirect('/members');
        } else {
            res.redirect('/login');
        }
    } else {
        console.log('not a valid user');
        res.redirect('/login');
    }
};

const newUser = (req, res) => {
    res.render('login', {
        ...layout,
        locals: {
            title: 'Sign Up',
            formTitle: 'New User'
        }
    })
}

const processNewUser = async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);
    if(name === '' || password === ''){
        console.log('username or password is blank')
        res.redirect('/new');
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        try {
            const newUser = await Users.create({
                name,
                hash
            });
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            if(err.name === "SequelizeUniqueConstraintError") {
                console.log('Username is taken');
            }
            res.redirect('/new');
        }
    }
};

const membersPage = (req, res) => {
    res.render('members', {
        ...layout,
        locals: {
            title: 'Members Only'
        }
    })
}












module.exports = {
    login,
    processLogin,
    newUser,
    processNewUser,
    membersPage
}