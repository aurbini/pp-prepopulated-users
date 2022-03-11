module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      // updatedAt: false,
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
      UserName: {
        type: Sequelize.STRING,
      },
      PasswordSalt: {
        type: Sequelize.STRING,
      },
      PasswordHash: {
        type: Sequelize.STRING,
      },
      OrganizationName: {
        type: Sequelize.STRING,
      },
      State: {
        type: Sequelize.STRING,
      },
      Website: {
        type: Sequelize.STRING,
      },
      CandidatesWorkWith: {
        type: Sequelize.STRING,
      },
      OrganizationLevelID: {
        type: Sequelize.STRING,
      },
      OrganizationTypeID: {
        type: Sequelize.STRING,
      },
      FECID: {
        type: Sequelize.STRING,
      },
      District: {
        type: Sequelize.STRING,
      },
      NonPartisan: {
        type: Sequelize.BOOLEAN,
      },
      Disclaimer: {
        type: Sequelize.STRING,
      },
      DateOfBirth: {
        type: Sequelize.DATE,
      },
      CreatedOn: {
        type: Sequelize.DATE,
      },
      LastActive: {
        type: Sequelize.DATE,
      },
      Gender: {
        type: Sequelize.STRING,
      },
      City: {
        type: Sequelize.STRING,
      },
      IsDonor: {
        type: Sequelize.BOOLEAN,
      },
      IsCampaign: {
        type: Sequelize.BOOLEAN,
      },
      IsCampaignAdmin: {
        type: Sequelize.BOOLEAN,
      },
      IsMasterAdmin: {
        type: Sequelize.BOOLEAN,
      },
      IsValidated: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};
