export const Market = {
    SoCal: "SoCal",
    NorCal: "NorCal"
};

export const Role = {
    AccountExecutive: "Account Executive",
    HeadOfConstruction: "Head Of Construction",
    Concierge: "Concierge"
};

export const People = [
    {
        name: "Adam Friedman",
        role: Role.AccountExecutive,
        markets: [Market.NorCal, Market.SoCal],
        profilePic: "./team_images/adam-friedman.jpg"
    },
    {
        name: "Ceci Clark",
        role: Role.HeadOfConstruction,
        markets: [Market.SoCal],
        profilePic: "./team_images/ceci-clarke.jpg"
    },
    {
        name: "Courtney Lacy",
        role: Role.Concierge,
        markets: [Market.NorCal, Market.SoCal],
        profilePic: "./team_images/courtney-lacy.jpg"
    },
    {
        name: "John Cromwell",
        role: Role.HeadOfConstruction,
        markets: [Market.NorCal],
        profilePic: "./team_images/jon-cromwell.jpg"
    },
    {
        name: "Kirsten Pearson",
        role: Role.Concierge,
        markets: [Market.SoCal],
        profilePic: "./team_images/kirsten-pearson.jpg"
    },
    {
        name: "Michael Carter",
        role: Role.AccountExecutive,
        markets: [Market.NorCal],
        profilePic: "./team_images/michael-carter.jpg"
    }
];

export const markets = ["SoCal", "NorCal"];
export const roles = ["Account Executive", "Head Of Construction", "Concierge"];
