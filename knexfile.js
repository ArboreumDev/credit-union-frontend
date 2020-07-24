// knexfile.js
module.exports = {
    development: {
        client: "postgresql",
        connection: process.env.PG_CONNECTION_STRING
    },

    production: {
        client: "postgresql",
        connection: process.env.PG_CONNECTION_STRING
    }
};