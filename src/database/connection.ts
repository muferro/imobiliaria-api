import mongoose from 'mongoose';
import config from '../config';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = config.mongodb.uri;
    
    const options: mongoose.ConnectOptions = {
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    };

    // Adicionar credenciais se fornecidas
    let uri = mongoUri;
    if (config.mongodb.user && config.mongodb.password) {
      const [protocol, rest] = mongoUri.split('://');
      uri = `${protocol}://${config.mongodb.user}:${config.mongodb.password}@${rest}`;
    }

    await mongoose.connect(uri, options);
    
    console.log('✓ Conectado ao MongoDB com sucesso');
    
    // Tratadores de eventos de conexão
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ Desconectado do MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('✗ Erro na conexão com MongoDB:', err);
    });
    
  } catch (error) {
    console.error('✗ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ Desconectado do MongoDB');
  } catch (error) {
    console.error('✗ Erro ao desconectar do MongoDB:', error);
    process.exit(1);
  }
};
