const { EntitySchema } = require("typeorm");

const Priority = new EntitySchema({
    name: "Priority", // Entity/Model name
    tableName: "priority", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        priority_id: {
            type: "uuid",
            generated: "uuid",
            comment: "priority unique id for user id, uuid",
        },
        user_id: {
            type: "uuid",
            comment: "the user table user_id column value",
        },
        priority_name: {
            type: "varchar",
            length: 255,
            unique: true,
            comment: "name of the priority and this will be unique",
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

module.exports = Priority;
