const { EntitySchema } = require("typeorm");

const Category = new EntitySchema({
    name: "Category", // Entity/Model name
    tableName: "category", // Table name in the database
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        category_id: {
            type: "uuid",
            generated: "uuid",
            comment: "category unique id for user id, uuid",
        },
        user_id: {
            type: "uuid",
            comment: "the user table user_id column value",
        },
        category_name: {
            type: "varchar",
            length: 255,
            unique: true,
            comment: "name of the category and this will be unique",
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

module.exports = Category;
