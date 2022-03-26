"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectNames_enum_1 = require("./models/ProjectNames.enum");
const candNew_1 = require("./scripts/candNew");
// const ayaRes = new AyaRes(ProjectNames.AyaRes);
// const ayaCalRes = new AyaCalRes(ProjectNames.AyaAndCal)
// const calRes = new CalStateRes(ProjectNames.CalStateRes)
// const crisTravis = new CrisTravis(ProjectNames.FedCrisTravis);
// const cristinaSt = new CristinaStRes(ProjectNames.CristinaStLeg);
// const delgadoRes = new DelgadoRes(ProjectNames.DelgadoStRes)
// const emilyStRes = new EmilyStRes(ProjectNames.EmilyState);
// const stateHouseRes = new StateHouseRes(ProjectNames.StateHouseRes);
const candNew = new candNew_1.candNewRes(ProjectNames_enum_1.ProjectNames.CandNew);
// const jacobRes = new JacobRes(ProjectNames.JacobRes);
// const riRes = new RiRes(ProjectNames.RiRes);
// const stateLeg = new StateLegRes(ProjectNames.StateLeg);
// const stateLegCOGA = new StateLegCOGA(ProjectNames.StateLegCOGA);
// const travisRes = new TravisRes(ProjectNames.TravisRes);
// const brianRob = new StandardRes(ProjectNames.BrainRob);
// const AIres = new StandardRes(ProjectNames.AlList);
// const danyela = new StandardRes(ProjectNames.Danyela)
// const frankie = new StandardRes(ProjectNames.FrankieRes)
// updatedDataNoEmail();
// console.log(ProjectNames.AyaAndCal)
// const baseFileReader = new BaseFileReader(ProjectNames.AyaAndCal)
