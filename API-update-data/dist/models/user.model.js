"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(FirstName, LastName, Email, Phone, UserName, PasswordSalt, PasswordHash, OrganizationName, State, Website, CandidatesWorkWith, FundraisingCommission, OrganizationLevelID, OrganizationTypeID, FECID, District, NonPartisan, Disclaimer, DateOfBirth = '01/01/1900', CreatedOn, LastActive, Gender, City, IsDonor = false, IsCampaign = true, IsCampaignAdmin = false, IsMasterAdmin = false, IsValidated = true) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Phone = Phone;
        this.UserName = UserName;
        this.PasswordSalt = PasswordSalt;
        this.PasswordHash = PasswordHash;
        this.OrganizationName = OrganizationName;
        this.State = State;
        this.Website = Website;
        this.CandidatesWorkWith = CandidatesWorkWith;
        this.FundraisingCommission = FundraisingCommission;
        this.OrganizationLevelID = OrganizationLevelID;
        this.OrganizationTypeID = OrganizationTypeID;
        this.FECID = FECID;
        this.District = District;
        this.NonPartisan = NonPartisan;
        this.Disclaimer = Disclaimer;
        this.DateOfBirth = DateOfBirth;
        this.CreatedOn = CreatedOn;
        this.LastActive = LastActive;
        this.Gender = Gender;
        this.City = City;
        this.IsDonor = IsDonor;
        this.IsCampaign = IsCampaign;
        this.IsCampaignAdmin = IsCampaignAdmin;
        this.IsMasterAdmin = IsMasterAdmin;
        this.IsValidated = IsValidated;
    }
}
exports.User = User;
