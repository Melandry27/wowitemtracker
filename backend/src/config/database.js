const mongoose = require('mongoose');

class Database {
  constructor() {
    this.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wow-items';
  }

  /**
   * Connect to MongoDB database
   */
  async connect() {
    try {
      await mongoose.connect(this.mongoUri);
      
      console.log('✅ MongoDB connected successfully');
      console.log(`📦 Database: ${mongoose.connection.name}`);
      
      this.setupEventListeners();
      
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      process.exit(1);
    }
  }

  /**
   * Setup MongoDB event listeners
   */
  setupEventListeners() {
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      await mongoose.connection.close();
      console.log('👋 MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState] || 'unknown';
  }

  /**
   * Get database instance
   */
  getDb() {
    return mongoose.connection.db;
  }
}

// Export singleton instance
module.exports = new Database();
