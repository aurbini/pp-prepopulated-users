import { ProjectNames } from './models/ProjectNames.enum';
import { AyaRes } from './scripts/aya-res';
import { CalStateRes } from './scripts/calState';
import { CrisTravis } from './scripts/cris-travis';
import { CristinaStRes } from './scripts/cristina-st-res';
import { DelgadoRes } from './scripts/delgado-res';
import { EmilyStRes } from './scripts/emily-state';
import { JacobRes } from './scripts/jacob-res';
import { RiRes } from './scripts/RiRes';
import { StateLegRes } from './scripts/stateLeg-res';
import { StateLegCOGA } from './scripts/stateLegCOGA-res';
import { TravisRes } from './scripts/travis-res';
import { AyaCalRes } from './scripts/aya-cal';
import { updatedDataNoEmail } from './scripts/finalized/updatedDataNoEmails';
import { findStateName } from './util/findStateName';
import { fullAddress } from './util/splitAddress';
import { StateHouseRes } from './scripts/stateHouse-res';

// const ayaRes = new AyaRes(ProjectNames.AyaRes);
// const ayaCalRes = new AyaCalRes(ProjectNames.AyaAndCal)
// const calRes = new CalStateRes(ProjectNames.CalStateRes)
// const crisTravis = new CrisTravis(ProjectNames.FedCrisTravis);
// const cristinaSt = new CristinaStRes(ProjectNames.CristinaStLeg);
// const delgadoRes = new DelgadoRes(ProjectNames.DelgadoStRes)
// const emilyStRes = new EmilyStRes(ProjectNames.EmilyState);
const stateHouseRes = new StateHouseRes(ProjectNames.StateHouseRes);

// const jacobRes = new JacobRes(ProjectNames.JacobRes);
// const riRes = new RiRes(ProjectNames.RiRes);
// const stateLeg = new StateLegRes(ProjectNames.StateLeg);
// const stateLegCOGA = new StateLegCOGA(ProjectNames.StateLegCOGA);
// const travisRes = new TravisRes(ProjectNames.TravisRes);

// updatedDataNoEmail();
// console.log(ProjectNames.AyaAndCal)
// const baseFileReader = new BaseFileReader(ProjectNames.AyaAndCal)
