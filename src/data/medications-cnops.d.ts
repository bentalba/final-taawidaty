declare module '@/data/medications-cnops.json' {
  interface Medication {
    id: number;
    barcode?: string | null;
    name: string;
    dci: string;
    dosage: string;
    forme: string;
    presentation: string;
    ppv: number;
    prix_br: number;
    ph?: number;
    prix_br_ph?: number;
    taux_remb: number;
    reimbursement_amount: number;
    patient_pays: number;
    classe_therapeutique?: string;
    type: string;
    insurance: string;
  }
  
  const medications: Medication[];
  export default medications;
}
