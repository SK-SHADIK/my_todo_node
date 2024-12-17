const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User", // Entity/Model name
    tableName: "users", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        user_id: {
            type: "uuid",
            generated: "uuid",
            comment: "user unique id for user id, uuid",
        },
        name: {
            type: "varchar",
            length: 255,
            comment: "name of the user",
        },
        email: {
            type: "varchar",
            length: 255,
            unique: true,
            comment: "email of the user and this will be unique",
        },
        password: {
            type: "varchar",
            length: 255,
            comment: "password of the user, in md5 format",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
            comment: "when created the record",
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
            comment: "when updated the record",
        },
    },
});

module.exports = User;
