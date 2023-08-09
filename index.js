const Sequelize = require('sequelize');

const sequelize = new Sequelize('casepass9001_v3.1.01', 'sa', 'wel@123', {
    dialect: "mssql",
    host: "192.168.1.191",
});

// checking is your databse is connected properly
sequelize.authenticate().then((data)=>{
    console.log("Database Connected Sucessfully");
}).catch((error)=>{
    console.log(error);
});

// creating a model
const User = sequelize.define('user', {
    //here we given our table name as {user} but by default the sequelize takes it as plural as {users}
    userId:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true, //this needs to be first after that use primarykey
        primaryKey: true
    },
    username:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.DataTypes.STRING
    },
    age:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21
    },
    mobileNumber:{
        type: Sequelize.DataTypes.INTEGER
    },
    city:{
        type: Sequelize.DataTypes.STRING,
        defaultValue: "Hyderabad"
    },
    employee:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false
});

// to insert a table into the database we are going to use sync() => this method runs by checking if table exists it will not create
User.sync().then(()=>{
    //working with updated table
    const data_ = User.create({
        username: "lucky-dev07",
        password: "@12345dev",
        mobileNumber: 923450,
        city: "Bangalore",
        employee: 1
    });
    return data_;
}).then((data)=>{
    console.log(data.toJSON());
}).catch((error)=>{
    console.log("error");
});