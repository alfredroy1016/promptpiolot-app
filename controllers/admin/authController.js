const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('admin/login');
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.render('admin/login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.render('admin/login', { error: 'Invalid email or password' });
    }

    // Login success
    req.session.admin = admin._id;
    res.render('admin/dashboard');
    // res.redirect('/admin/dashboard');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};
