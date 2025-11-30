/**
 * Share Utility
 * Share results via native share API or clipboard
 */

import { Capacitor } from '@capacitor/core';
import { haptics } from './haptics';

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export interface MedicationShareData {
  name: string;
  price: number;
  reimbursement: number;
  patientPays: number;
  percentage: number;
  language: 'ar' | 'fr';
}

/**
 * Generate share text for medication calculation result
 */
export const generateShareText = (data: MedicationShareData): string => {
  const { name, price, reimbursement, patientPays, percentage, language } = data;

  if (language === 'ar') {
    return `💊 نتيجة حساب التعويض - تعويضاتي

🏥 الدواء: ${name}
💰 السعر: ${price.toFixed(2)} درهم
✅ التعويض: ${reimbursement.toFixed(2)} درهم (${percentage}%)
💳 المتبقي: ${patientPays.toFixed(2)} درهم

📱 حمّل تطبيق تعويضاتي مجاناً!
https://taawidaty.ma`;
  }

  return `💊 Résultat du remboursement - Taawidaty

🏥 Médicament: ${name}
💰 Prix: ${price.toFixed(2)} MAD
✅ Remboursement: ${reimbursement.toFixed(2)} MAD (${percentage}%)
💳 Reste à payer: ${patientPays.toFixed(2)} MAD

📱 Téléchargez Taawidaty gratuitement!
https://taawidaty.ma`;
};

/**
 * Generate share text for multiple medications
 */
export const generateMultipleShareText = (
  medications: MedicationShareData[],
  language: 'ar' | 'fr'
): string => {
  const total = medications.reduce(
    (acc, med) => ({
      price: acc.price + med.price,
      reimbursement: acc.reimbursement + med.reimbursement,
      patientPays: acc.patientPays + med.patientPays
    }),
    { price: 0, reimbursement: 0, patientPays: 0 }
  );

  if (language === 'ar') {
    let text = `💊 نتيجة حساب التعويض - تعويضاتي\n\n`;
    
    medications.forEach((med, i) => {
      text += `${i + 1}. ${med.name}\n`;
      text += `   السعر: ${med.price.toFixed(2)} درهم | التعويض: ${med.reimbursement.toFixed(2)} درهم\n\n`;
    });

    text += `📊 المجموع:\n`;
    text += `💰 السعر الإجمالي: ${total.price.toFixed(2)} درهم\n`;
    text += `✅ التعويض الإجمالي: ${total.reimbursement.toFixed(2)} درهم\n`;
    text += `💳 المتبقي: ${total.patientPays.toFixed(2)} درهم\n\n`;
    text += `📱 حمّل تطبيق تعويضاتي مجاناً!\nhttps://taawidaty.ma`;

    return text;
  }

  let text = `💊 Résultat du remboursement - Taawidaty\n\n`;
  
  medications.forEach((med, i) => {
    text += `${i + 1}. ${med.name}\n`;
    text += `   Prix: ${med.price.toFixed(2)} MAD | Remb: ${med.reimbursement.toFixed(2)} MAD\n\n`;
  });

  text += `📊 Total:\n`;
  text += `💰 Prix total: ${total.price.toFixed(2)} MAD\n`;
  text += `✅ Remboursement total: ${total.reimbursement.toFixed(2)} MAD\n`;
  text += `💳 Reste à payer: ${total.patientPays.toFixed(2)} MAD\n\n`;
  text += `📱 Téléchargez Taawidaty gratuitement!\nhttps://taawidaty.ma`;

  return text;
};

/**
 * Share content using Web Share API or clipboard
 */
export const shareContent = async (data: ShareData): Promise<boolean> => {
  haptics.light();

  // Try native share first
  if (navigator.share && Capacitor.isNativePlatform()) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url
      });
      haptics.success();
      return true;
    } catch (err) {
      // User cancelled or error
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(data.text);
    haptics.success();
    return true;
  } catch (err) {
    console.error('Clipboard failed:', err);
    haptics.error();
    return false;
  }
};

/**
 * Share medication result
 */
export const shareMedicationResult = async (
  data: MedicationShareData
): Promise<boolean> => {
  const text = generateShareText(data);
  return shareContent({
    title: data.language === 'ar' ? 'نتيجة تعويضاتي' : 'Résultat Taawidaty',
    text,
    url: 'https://taawidaty.ma'
  });
};

/**
 * Share multiple medication results
 */
export const shareMultipleMedicationResults = async (
  medications: MedicationShareData[],
  language: 'ar' | 'fr'
): Promise<boolean> => {
  const text = generateMultipleShareText(medications, language);
  return shareContent({
    title: language === 'ar' ? 'نتائج تعويضاتي' : 'Résultats Taawidaty',
    text,
    url: 'https://taawidaty.ma'
  });
};

export default shareContent;
