"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignTreasurer = void 0;
class CampaignTreasurer {
    constructor(CampaignId, TrFirstName, TrLastName, TrEmail, TrPhone, Zipcode, Address, StateName, StateId, CountyId, CountyName) {
        this.CampaignId = CampaignId;
        this.TrFirstName = TrFirstName;
        this.TrLastName = TrLastName;
        this.TrEmail = TrEmail;
        this.TrPhone = TrPhone;
        this.Zipcode = Zipcode;
        this.Address = Address;
        this.StateName = StateName;
        this.StateId = StateId;
        this.CountyId = CountyId;
        this.CountyName = CountyName;
    }
}
exports.CampaignTreasurer = CampaignTreasurer;
