module.exports = {
  HOST: '3.19.168.166',
  // PORT: '1463',
  USER: 'sa',
  PASSWORD: 'P@rent4P@rty1',
  DB: 'DonorNew',
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

//LIVE SERVER,
// Server Name: 3.19.168.166
// Username: sa
// Password: P@rent4P@rty1

//LOCALHOST
// HOST: 'localhost',
// PORT: '1463',
// USER: 'sa',
// PASSWORD: 'Password1$',
// DB: 'Donor',
// dialect: 'mssql',