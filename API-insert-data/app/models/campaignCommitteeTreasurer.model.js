module.exports = (sequelize, Sequelize) => {
  const CampaignCommitteeTreasurer = sequelize.define(
    'CampaignCommitteeTreasurer',
    {
      CampaignId: {
        type: Sequelize.INTEGER,
      },
      FirstName: {
        type: Sequelize.STRING,
      },
      LastName: {
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Phone: {
        type: Sequelize.STRING,
      },
      Zipcode: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      StateName: {
        type: Sequelize.STRING,
      },
      StateId: {
        type: Sequelize.STRING,
      },
      CountyId: {
        type: Sequelize.STRING,
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
  return CampaignCommitteeTreasurer;
};
