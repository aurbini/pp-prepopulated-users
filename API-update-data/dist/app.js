"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectNames_enum_1 = require("./models/ProjectNames.enum");
const stateHouse_res_1 = require("./scripts/stateHouse-res");
// const ayaRes = new AyaRes(ProjectNames.AyaRes);
// const ayaCalRes = new AyaCalRes(ProjectNames.AyaAndCal)
// const calRes = new CalStateRes(ProjectNames.CalStateRes)
// const crisTravis = new CrisTravis(ProjectNames.FedCrisTravis);
// const cristinaSt = new CristinaStRes(ProjectNames.CristinaStLeg);
// const delgadoRes = new DelgadoRes(ProjectNames.DelgadoStRes)
// const emilyStRes = new EmilyStRes(ProjectNames.EmilyState);
const stateHouseRes = new stateHouse_res_1.StateHouseRes(ProjectNames_enum_1.ProjectNames.StateHouseRes);
// const jacobRes = new JacobRes(ProjectNames.JacobRes);
// const riRes = new RiRes(ProjectNames.RiRes);
// const stateLeg = new StateLegRes(ProjectNames.StateLeg);
// const stateLegCOGA = new StateLegCOGA(ProjectNames.StateLegCOGA);
// const travisRes = new TravisRes(ProjectNames.TravisRes);
// updatedDataNoEmail();
// console.log(ProjectNames.AyaAndCal)
// const baseFileReader = new BaseFileReader(ProjectNames.AyaAndCal)
