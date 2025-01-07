const { EntitySchema } = require("typeorm");

const Task = new EntitySchema({
    name: "Task", // Entity/Model name
    tableName: "task", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        task_id: {
            type: "uuid",
            generated: "uuid",
            comment: "status unique id for user id, uuid",
        },
        user_id: {
            type: "uuid",
            comment: "the user table user_id column value",
        },
        category_id: {
            type: "uuid",
            nullable: true,
            comment: "the category table category_id column value",
        },
        priority_id: {
            type: "uuid",
            nullable: true,
            comment: "the priority table priority_id column value",
        },
        status_id: {
            type: "uuid",
            nullable: true,
            comment: "the status table status_id column value",
        },
        task_name: {
            type: "varchar",
            length: 255,
            comment: "the name of the task",
        },
        description: {
            type: "text",
            nullable: true,
            comment: "the description of the task",
        },
        due_date: {
            type: "timestamp",
            nullable: true,
            comment: "the due date of the task",
        },
        is_active: {
            type: "bool",
            default: true,
            comment: "the status of the record is active or inactive",
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

module.exports = Task;
