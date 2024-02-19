const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db.sqlite', // Path where SQLite database file will be stored
//   logging: false // Disable logging SQL queries (optional)
// });
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
});
// Define models
const Purchase = sequelize.define('Purchase', {
  tcode: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

const Student = sequelize.define('Student', {
  email: {
    type: DataTypes.TEXT,
    unique: true
  },
  verified: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  verificationId: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.TEXT,
    defaultValue: ""
  },
  description: {
    type: DataTypes.TEXT
  }
});

// Sync models with database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // This will drop existing tables and recreate them
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDatabase();


// Export Sequelize instance and models
module.exports = {
  sequelize,
  Purchase,
  Student
};