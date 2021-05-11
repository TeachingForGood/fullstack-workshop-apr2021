const UserService = require('./user.service');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser = async (req, res) => {
        try {
            const userDetails = req.body;
            await this.userService.createUser(userDetails);
            return res.json({status: 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating User' });
        }
    } 

    updateUser = async (req, res) => {
        try {
            const userName = req.params.userName
            const userDetails = req.body;
            await this.userService.updateUser(userDetails, userName);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating user' });
        }
    }

    updatePassword = async (req, res) => {
        try {
            const userName = req.params.userName
            const { password } = req.body;
            await this.userService.updatePassword(password, userName);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating user password' });
        }
    }
}

module.exports = UserController;