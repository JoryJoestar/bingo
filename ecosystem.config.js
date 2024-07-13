module.exports = {
    apps: [
      {
        name: 'acronym',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env: {
            "PORT": 13333,
            "NODE_ENV": "production",
            "DATABASE_URL":"mysql://textgame:5hHbarsipeHf5E4p@120.24.57.243:3306/textgame",
            "DB_HOST" : "120.24.57.243",
            "DB_USER": "textgame",
            "DB_PASSWORD":"5hHbarsipeHf5E4p",
            "DB_DATABASE_NAME": "textgame"
        },
      }
    ],
  }
