const { EntitySchema } = require("typeorm");

const Status = new EntitySchema({
    name: "Status", // Entity/Model name
    tableName: "status", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        status_id: {
            type: "uuid",
            generated: "uuid",
            comment: "status unique id for user id, uuid",
        },
        user_id: {
            type: "uuid",
            comment: "the user table user_id column value",
        },
        status_name: {
            type: "varchar",
            length: 255,
            unique: true,
            comment: "name of the status and this will be unique",
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

module.exports = Status;
