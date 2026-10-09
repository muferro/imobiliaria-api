import mongoose from 'mongoose';
import config from './src/config';
import { HousingLocation } from './src/models/HousingLocation';

const seedDatabase = async (): Promise<void> => {
  try {
    // Conectar ao banco
    await mongoose.connect(config.mongodb.uri);
    console.log('✓ Conectado ao MongoDB');

    // Limpar dados existentes
    await HousingLocation.deleteMany({});
    console.log('✓ Dados anteriores limpos');

    // Dados de exemplo
    const locations = [
      {
        name: 'Acme Fresh Start Housing',
        city: 'Chicago',
        state: 'IL',
        photo: 'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTvY-unsplash.jpg',
        availableUnits: 4,
        wifi: true,
        laundry: true,
      },
      {
        name: 'A Great View Apartment Home',
        city: 'Arlington',
        state: 'TX',
        photo: 'https://angular.io/assets/images/tutorials/faa/brandon-lopez-IHkYlNqe4KM-unsplash.jpg',
        availableUnits: 0,
        wifi: false,
        laundry: true,
      },
      {
        name: 'Lovely Neighborhood Home',
        city: 'Austin',
        state: 'TX',
        photo: 'https://angular.io/assets/images/tutorials/faa/harris-martin-CLKGGwIBTvY-unsplash.jpg',
        availableUnits: 1,
        wifi: false,
        laundry: false,
      },
      {
        name: 'Sunlit Meadow',
        city: 'Bretton Woods',
        state: 'NH',
        photo: 'https://angular.io/assets/images/tutorials/faa/james-wheeler-b3NW6qs-Xkg-unsplash.jpg',
        availableUnits: 2,
        wifi: true,
        laundry: false,
      },
      {
        name: 'Oak Tree Homes',
        city: 'Denver',
        state: 'CO',
        photo: 'https://angular.io/assets/images/tutorials/faa/jessica-fong-3l7ugRS5LKc-unsplash.jpg',
        availableUnits: 5,
        wifi: true,
        laundry: true,
      },
      {
        name: 'Peaceful Canyon Dwellings',
        city: 'Raleigh',
        state: 'NC',
        photo: 'https://angular.io/assets/images/tutorials/faa/krista-mangulsone-9eb0dVYSf7A-unsplash.jpg',
        availableUnits: 3,
        wifi: false,
        laundry: true,
      },
      {
        name: 'Sunny Retreats',
        city: 'Saylorsburg',
        state: 'PA',
        photo: 'https://angular.io/assets/images/tutorials/faa/matthew-walker-iB3qIDBMAC4-unsplash.jpg',
        availableUnits: 2,
        wifi: true,
        laundry: true,
      },
      {
        name: 'Glorious Sunset View Homes',
        city: 'Scottsdale',
        state: 'AZ',
        photo: 'https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ym3_5s-unsplash.jpg',
        availableUnits: 0,
        wifi: true,
        laundry: false,
      },
      {
        name: 'Godly Nobby',
        city: 'Tenino',
        state: 'WA',
        photo: 'https://angular.io/assets/images/tutorials/faa/radwan-ghazi-najam-nQMzT3SJ9pw-unsplash.jpg',
        availableUnits: 3,
        wifi: false,
        laundry: true,
      },
    ];

    // Inserir dados
    const created = await HousingLocation.insertMany(locations);
    console.log(`✓ ${created.length} imóveis inseridos com sucesso`);

    // Exibir resumo
    console.log('\n📝 Dados de exemplo criados:');
    created.forEach((location) => {
      console.log(`  - ${location.name} (${location.city}, ${location.state})`);
    });

    console.log('\n✓ Seed concluído com sucesso!');
  } catch (error) {
    console.error('✗ Erro ao fazer seed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✓ Desconectado do MongoDB');
    process.exit(0);
  }
};

// Executar seed
seedDatabase();
