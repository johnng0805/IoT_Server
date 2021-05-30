const db = require('./db');
const { uuid } = require('uuidv4');
const tableName = 'users';
const UserModel = {
    //SELECT * FROM users;
    getAllUsers() {
        return db(tableName).select(
            db.raw('cast(id as char(36)) as id'), 'email', 'name', 'password', 'gender'
        );
    },
    // SELECT * FROM users WHERE username = $username;
    findUserByEmail(email) {
        return db(tableName)
            .select(
                db.raw('cast(id as char(36)) as id'), 'email', 'name', 'gender', 'password'
            )
            .first()
            .where('email', email);
    },
    getUserById(id) {
        return db(tableName)
        .select(
            db.raw('cast(id as char(36)) as id'), 'email', 'name', 'gender'
        )
        .first()
        .where('id', id);
    },
    insertUser(inputData) {
        if(inputData) {
            inputData.id = uuid()
        }
        return db(tableName)
            .insert(inputData);
    },
    updateUser(data, userId) {
        return db(tableName)
            .update(data)
            .where('id', userId);
    },
    delUser(id) {
        return db(tableName).where('id', id).del();
    }
};
module.exports = UserModel;