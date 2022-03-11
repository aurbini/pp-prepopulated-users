module.exports = (sequelize, Sequelize) => {
  const CampaignInfo = sequelize.define('campaignInfo', {
    // updatedAt: false,
    UserId: {
      type: Sequelize.INTEGER,
    },
    OfficeLevelId: {
      type: Sequelize.INTEGER,
    },
    OfficeTypeId: {
      type: Sequelize.INTEGER,
    },
    StateId: {
      type: Sequelize.INTEGER,
    },
    CongressionalDistrict: {
      type: Sequelize.INTEGER,
    },
    CountyId: {
      type: Sequelize.INTEGER,
    },
    IsApproved: {
      type: Sequelize.INTEGER,
    },
    CreatedOn: {
      type: Sequelize.DATE
    },
    UpdatedOn: {
      type: Sequelize.DATE
    },
    IsVisible: {
      type: Sequelize.INTEGER,
    },
    PartyId: {
      type: Sequelize.INTEGER,
    },
  }, {
    timestamps: false,
  });
  return CampaignInfo;
};
