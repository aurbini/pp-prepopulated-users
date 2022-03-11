
export class User {
    constructor(
        public FirstName?: string,
        public LastName?: string,
        public Email?: string,
        public Phone?: string,
        public UserName?: string,
        public PasswordSalt?: string,
        public PasswordHash?: string,
        public OrganizationName?: string,
        public State?: string,
        public Website?: string,
        public CandidatesWorkWith?: string,
        public FundraisingCommission?: string,
        public OrganizationLevelID?: number,
        public OrganizationTypeID?: number,
        public FECID?: string,
        public District?: string,
        public NonPartisan?: string,
        public Disclaimer?: string,
        public DateOfBirth: string = '01/01/1900',
        public CreatedOn?: string,
        public LastActive?: string,
        public Gender?: string,
        public City?: string,
        public IsDonor: boolean = false,
        public IsCampaign: boolean = true,
        public IsCampaignAdmin: boolean = false,
        public IsMasterAdmin: boolean = false,
        public IsValidated: boolean = true
    ) { }
}
