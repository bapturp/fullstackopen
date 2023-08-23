import data from '../../data/diagnoses';

import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = data as DiagnosisEntry[];

const getDiagnoses = (): DiagnosisEntry[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};
