module.exports = (sequelize, Sequelize) => {
  const CampaignCommitteeDetails = sequelize.define(
    'campaignCommitteeDetails', {
    CampaignId: {
      type: Sequelize.INTEGER
    },
    CommitteeName: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Website: {
      type: Sequelize.STRING,
    },
    CIN: {
      type: Sequelize.STRING,
    },
    EIN: {
      type: Sequelize.STRING,
    },
    Address: {
      type: Sequelize.STRING,
    },
    Zipcode: {
      type: Sequelize.STRING,
    },
    StateId: {
      type: Sequelize.INTEGER,
    },
    StateName: {
      type: Sequelize.STRING,
    },
    CountyId: {
      type: Sequelize.INTEGER,
    },
    CountyName: {
      type: Sequelize.STRING,
    },
    CreatedOn: {
      type: Sequelize.DATE
    },
    UpdatedOn: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false,
  });
  return CampaignCommitteeDetails;
};