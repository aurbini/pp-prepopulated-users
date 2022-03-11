"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStateName = void 0;
const states = [
    { AL: 'ALABAMA' },
    { AK: 'ALASKA' },
    { AS: 'AMERICAN SAMOA' },
    { AZ: 'ARIZONA' },
    { AR: 'ARKANSAS' },
    { CA: 'CALIFORNIA' },
    { CO: 'COLORADO' },
    { CT: 'CONNECTICUT' },
    { DE: 'DELAWARE' },
    { DC: 'DISTRICT OF COLUMBIA' },
    { FM: 'FEDERATED STATES OF MICRONESIA' },
    { FL: 'FLORIDA' },
    { GA: 'GEORGIA' },
    { GU: 'GUAM GU' },
    { HI: 'HAWAII' },
    { ID: 'IDAHO' },
    { IL: 'ILLINOIS' },
    { IN: 'INDIANA' },
    { IA: 'IOWA' },
    { KS: 'KANSAS' },
    { KY: 'KENTUCKY' },
    { LA: 'LOUISIANA' },
    { ME: 'MAINE' },
    { MH: 'MARSHALL ISLANDS' },
    { MD: 'MARYLAND' },
    { MA: 'MASSACHUSETTS' },
    { MI: 'MICHIGAN' },
    { MN: 'MINNESOTA' },
    { MS: 'MISSISSIPPI' },
    { MO: 'MISSOURI' },
    { MT: 'MONTANA' },
    { NE: 'NEBRASKA' },
    { NV: 'NEVADA' },
    { NH: 'NEW HAMPSHIRE' },
    { NJ: 'NEW JERSEY' },
    { NM: 'NEW MEXICO' },
    { NY: 'NEW YORK' },
    { NC: 'NORTH CAROLINA' },
    { ND: 'NORTH DAKOTA' },
    { MP: 'NORTHERN MARIANA ISLANDS' },
    { OH: 'OHIO' },
    { OK: 'OKLAHOMA' },
    { OR: 'OREGON' },
    { PW: 'PALAU' },
    { PA: 'PENNSYLVANIA' },
    { PR: 'PUERTO RICO' },
    { RI: 'RHODE ISLAND' },
    { SC: 'SOUTH CAROLINA' },
    { SD: 'SOUTH DAKOTA' },
    { TN: 'TENNESSEE' },
    { TX: 'TEXAS' },
    { UT: 'UTAH' },
    { VT: 'VERMONT' },
    { VI: 'VIRGIN ISLANDS' },
    { VA: 'VIRGINIA' },
    { WA: 'WASHINGTON' },
    { WV: 'WEST VIRGINIA' },
    { WI: 'WISCONSIN' },
    { WY: 'WYOMING' },
];
const findStateName = (abbrName) => {
    if (abbrName.trim().length > 2)
        return abbrName;
    let retState = '';
    for (let i = 0; i < states.length; i++) {
        const state = states[i];
        if (state[abbrName]) {
            retState = state[abbrName.toUpperCase()];
        }
    }
    return retState;
};
exports.findStateName = findStateName;
