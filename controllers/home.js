const { layout } = require('../utility');

const home = (req, res) => {
    res.render('home', {
        ...layout,
        locals: {
            title: 'Welcome Home'
        }
    })
}

module.exports = {
    home,
}