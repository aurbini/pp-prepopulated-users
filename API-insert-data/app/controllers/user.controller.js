const bcrypt = require('bcrypt');
const {
  CampaignInfo,
  User,
  CampaignCommitteeContactInfo,
  CampaignCommitteeTreasurer,
  CampaignCommitteeDetail,
} = require('../models');
const saltRounds = 10;
const sequelize = require('sequelize')
const db = require('../models')
let crypto = require('crypto');
const { findFipsNum } = require('../util/stateFips')

//TEST CONNECTION 
exports.findUsers = async (req, res) => {
  User.findAll()
    .then((data) => {
      res.send({ users: data });
      // console.log(data);
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
}
// Create and Save a new Use
exports.createUsers = async (req, res) => {
  const records = req.file;
  if (!records) {
    return res.json({
      status: 'error',
      message: '`records` attachment could not be found',
    });
  }

  try {
    // file in text form
    const bufferString = records.buffer.toString();
    const parsedRecords = JSON.parse(bufferString);
    // console.log(parsedRecords.length)
    // const password =
    //   record.candLastName + Math.floor(Math.randim() * 1iii) + '!';
    for (let i = 1; i < parsedRecords.length; i++) {
      const record = parsedRecords[i];

      const user = {
        FirstName: parsedRecords[i].FirstName,
        LastName: parsedRecords[i].LastName,
        UserName: parsedRecords[i].Email,
        Email: parsedRecords[i].Email,
        Phone: parsedRecords[i].Phone,
        // PasswordSalt: '',
        // PasswordHash: '',
        DateOfBirth: parsedRecords[i].DateOfBirth,
        City: parsedRecords[i].City,
        OrganizationLevelID: 2,
        OrganizationTypeID: parsedRecords[i].OrganizationTypeID | 71,
        FECID: parsedRecords[i].FECID,
        CreatedOn: new Date(),
        LastActive: new Date(),
        State: parsedRecords[i].StateName,
        IsCampaign: true,
        IsCampaignAdmin: false,
        IsMasterAdmnin: false,
        IsValidated: true,
        NonPartisan: false,
        IsDonor: false,
      };
      // Save User in the database
      console.log(user)
      try {
        // .query(`INSERT users(FirstName, LastName, Email, PasswordSalt, PasswordHash, DateOfBirth) VALUES (${user.FirstName}, ${user.LastName}, ${user.Email}, CONVERT(VARBINARY(MAX),${user.PasswordSalt}), CONVERT(VARBINARY(MAX),${user.PasswordHash}), ${user.DateOfBirth} )`)
        // CONVERT(VARBINARY(MAX),FileBytes));
        console.log(i)
        User.create(user)
          .then((data) => {
            res.send({ message: 'New User Created' });
            console.log('user created')
            console.log(data);
          })
          .catch((err) => {
            console.log(err)
            throw new Error();
            res.status(500).send({
              message:
                err.message ||
                'Some error occurred while creating the User.',
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
  catch (err) {
    console.log('Error parsing JSON string:', err);
  }
}
//------------FETCH USER ID------------/////

//----------------INSERT INTO CAMPAIGN INFO-------------//
//FOR ALL CAMPAIGNS ISAPPROVED TRUE, ISVISIBLE TRUE

//TAKE USER ID- CHECK IF FED, STATE, LOCAL
//IF FED
//OFFICE LEVEL ID 1, OFFICE TYPE 113, PARTY ID 5

//IF STATE
//OFFICE LEVEL ID 2, OFFICE TYPE 12, PARTY ID 5, STATE ID 1,

exports.createCampaign = async (req, res) => {
  const records = req.file;
  if (!records) {
    return res.json({
      status: 'error',
      message: '`records` attachment could not be found',
    });
  }
  try {
    const bufferString = records.buffer.toString();
    const parsedRecords = JSON.parse(bufferString);
    for (let i = 0; i < parsedRecords.length; i++) {
      const record = parsedRecords[i];
      const user = await User.findOne({
        where: {
          Email: record.Email,


        },
      });
      // console.log(user)
      if (user) {
        const campaignInfo = {
          UserId: user.id,
          OfficeLevelId: 2,
          OfficeTypeId: record.OrganizationLevelID | 71,
          // campaignID: 
          PartyId: 5,
          StateId: findFipsNum(record.State) | 1,
          UpdatedOn: new Date(),
          CreatedOn: new Date(),
          IsVisible: true,
          IsApproved: true,
          CountyId: 0
        };
        // console.log(user)
        try {
          CampaignInfo.create(campaignInfo)
            .then((data) => {
              CampaignInfo.findOne({
                where: {
                  UserId: data.dataValues.UserId
                }
              }).then(data => {
                // console.log(data)
                // res.send({ message: "new campaign info" })
                const campaignComContactInfo = {
                  CampaignId: data.id,
                  FirstName: record.FirstName,
                  LastName: record.LastName,
                  Email: record.Email,
                  Phone: record.Phone,
                  StateName: record.StateName,
                  StateId: data.StateId,
                  CountyId: 0,
                  CreatedOn: new Date(),
                  UpdatedOn: new Date()
                }
                const campaignComDetail = {
                  CampaignId: data.id,
                  CommitteeName: '',
                  Email: record.Email,
                  Website: '',
                  CIN: '',
                  EIN: '',
                  Address: record.Address,
                  Zipcode: record.Zipcode,
                  StateId: findFipsNum(record.State) | '',
                  StateName: record.StateName,
                  CountyId: 0,
                  CountyName: '',
                  CreatedOn: new Date(),
                  UpdatedOn: new Date()
                }
                const campaignComTr = {
                  CampaignId: data.id,
                  FirstName: record.TrFirstName,
                  LastName: record.TrLastName,
                  Email: record.TrEmail,
                  Phone: record.TrPhone,
                  Zipcode: record.Zipcode,
                  Address: record.Address,
                  StateName: record.StateName,
                  StateId: findFipsNum(record.State) | '',
                  CountyId: 0,
                  CountyName: '',
                  CreatedOn: new Date(),
                  UpdatedOn: new Date(),
                }
                CampaignCommitteeContactInfo.create(campaignComContactInfo)
                  .then(data => { }
                    // console.log('contact DONE')
                  )
                  .catch((err) => console.log(err));
                CampaignCommitteeDetail.create(campaignComDetail)
                  .then(data => { }
                    // console.log('detail DONE')
                  )
                  .catch((err) => console.log(err));
                CampaignCommitteeTreasurer.create(campaignComTr)
                  .then(data => {
                    // console.log('TREASURER DOONE')
                    // res.send({ message: "campaign committee Contact info created" })
                  })
                  .catch((err) => console.log(err));
              })
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
          // break;
        }
      }
      // CampaignInfo.findOne({UserId: user.})
      // .then((data) => {
    }
  } catch (err) {
    console.log(err);
  }
  // }
}
//IF LOCAL
//OFFICE LEVEL ID 3, OFFICE TYPE 89, PARTY ID 5, STATE ID 1, COUNTY ID 1
exports.createCampaignExtra = async (req, res) => {
  const campaignIdArray = await CampaignInfo.findAll({
    attributes: ['id'],
  });
  const campaign = {
    StateId: 1,
    CountyId: 0,
    CreatedOn: new Date(),
    UpdatedOn: new Date()
  }

  console.log(campaignIdArray[0].dataValues.id)
  for (let i = 0; i < campaignIdArray.length; i++) {
    // const campaignId = campaignIdArray[0].dataValues.id;
    // // console.log(campaignId);
    // campaign.CampaignId = campaignId
    // CampaignCommitteeContactInfo.create(campaign)
    //   .then()
    //   .catch((err) => console.log(err));
    // CampaignCommitteeDetail.create(campaign)
    //   .then()
    //   .catch((err) => console.log(err));
    // console.log(campaign)
    // CampaignCommitteeTreasurer.create(campaign)
    //   .then()
    //   .catch((err) => console.log(err));
  }
  res.send('CampaignExtra succeeded');
};
//----------------FETCH CAMP ID---------------//
//INSERT INTO CAMPAIGN COMMITTEE, CAMPAIGN COMM CONTACT, CAMP TREASURER
//ALL THREE TABLES WILL NEED TO HAVE A CAMPAIGN ID

exports.create = (req, res) => { };

// Retrieve all Users from the database.
exports.findAll = (req, res) => { };
// Find a single User with an id
exports.findOne = (req, res) => { };
// Update a User by the id in the request
exports.update = (req, res) => { };
// Delete a User with the specified id in the request
exports.delete = (req, res) => { };
// Delete all Users from the database.
exports.deleteAll = (req, res) => { };
// Find all published Users
exports.findAllPublished = (req, res) => { };




// bcrypt.genSalt(saltRounds, function (err, salt) {
// returns salt
// bcrypt.hash(password, salt, function async (err, hash) {
// let generateSalt = rounds => {
//   if (rounds >= 15) {
//     throw new Error(`${rounds} is greater than 15,Must be less that 15`);
//   }
//   if (typeof rounds !== 'number') {
//     throw new Error('rounds param must be a number');
//   }
//   if (rounds == null) {
//     rounds = 12;
//   }
//   return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
// };
// logger(generateSalt(10))
// let hasher = (password, salt) => {
//   let hash = crypto.createHmac('sha512', salt);
//   hash.update(password);
//   let value = hash.digest('hex');
//   return {
//     salt: salt,
//     hashedpassword: value
//   };
// };
// let hash = (password, salt) => {
//   if (password == null || salt == null) {
//     throw new Error('Must Provide Password and salt values');
//   }
//   if (typeof password !== 'string' || typeof salt !== 'string') {
//     throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
//   }
//   return hasher(password, salt);
// };
// logger(hash('Wisdom', generateSalt(12)))
// const { salt, hashedpassword } = hash(password, generateSalt(12))





