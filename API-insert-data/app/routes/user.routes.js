const multer = require('multer');
const uploadRecords = multer().single('records');

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

module.exports = (app) => {
  const User = require('../controllers/user.controller.js');
  var router = require('express').Router();


  // Create USERS
  router.post('/upload', uploadRecords, User.createUsers);
  // Retrieve all User

  router.post('/createCampaignInfo', uploadRecords, User.createCampaign);

  router.post('/createCampaignExtra', User.createCampaignExtra);

  router.post('/findEmail', uploadRecords, User.findEmail);

  router.get('/', User.findAll);
  // Retrieve all published User
  router.get('/published', User.findAllPublished);
  // Retrieve a single Tutorial with id
  router.get('/findUsers', User.findUsers);
  // Update a Tutorial with id
  router.put('/:id', User.update);
  // Delete a Tutorial with id
  router.delete('/:id', User.delete);
  // Delete all User
  app.use('/api/user', router);
};
