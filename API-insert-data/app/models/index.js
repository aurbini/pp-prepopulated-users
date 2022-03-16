const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
console.log(dbConfig)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle,
  // },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user.model.js')(sequelize, Sequelize);

db.CampaignInfo = require('./campaignInfo.model.js')(sequelize, Sequelize);

db.CampaignCommitteeContactInfo =
  require('./CampaignCommitteeContactInfo.model.js')(sequelize, Sequelize);

db.CampaignCommitteeTreasurer =
  require('./CampaignCommitteeTreasurer.model.js')(sequelize, Sequelize);

db.CampaignCommitteeDetail = require('./CampaignCommitteeDetail.model.js')(
  sequelize,
  Sequelize
);

module.exports = db;
