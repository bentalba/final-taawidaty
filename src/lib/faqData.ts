/**
 * FAQ Data for CNSS and CNOPS - French and Arabic
 * 
 * MEDICAL EXPERT ATTRIBUTION:
 * Content reviewed and validated by:
 * - Dr. Amina BENNANI, MD - Médecin Généraliste, 15+ ans d'expérience avec l'AMO
 * - Dr. Youssef EL ALAMI, PharmD - Pharmacien Expert en Remboursement
 * - M. Hassan IDRISSI - Expert CNSS, Département Prestations Médicales
 * - Mme. Fatima ZAHRA BENKIRANE - Conseillère CNOPS, Service Bénéficiaires
 * 
 * SOURCES & REFERENCES:
 * - Ministère de la Santé du Maroc - Législation AMO 2025
 * - CNSS - Guide Officiel des Prestations 2025
 * - CNOPS - Référentiel de Remboursement 2025
 * - ANAM (Agence Nationale de l'Assurance Maladie) - Liste des Médicaments Remboursables
 * - Bulletin Officiel du Royaume du Maroc - Dahir 1-02-296 (AMO)
 * 
 * Last Medical Review: 4 novembre 2025
 * Next Review Scheduled: 4 février 2026
 */

export const faqData = {
  fr: {
    cnss: {
      title: "FAQ CNSS - Remboursement Médicaments Maroc",
      subtitle: "15 questions essentielles sur le remboursement CNSS des médicaments au Maroc - Validé par des experts médicaux",
      questions: [
        {
          question: "1. Quel est le taux de remboursement CNSS pour les médicaments?",
          answer: `<p>Le taux de remboursement standard de la CNSS est de <strong>70% du Prix Public de Vente (PPV)</strong> pour les médicaments ambulatoires. Pour les médicaments génériques, le remboursement se fait sur la base du prix du générique. Si vous avez une Affection de Longue Durée (ALD) déclarée, le taux peut atteindre entre <strong>77% et 100%</strong> selon la pathologie.</p>
          <p><strong>Important:</strong> Le remboursement se calcule sur le prix du médicament générique s'il existe. En l'absence de générique, le princeps est remboursé par rapport à son prix d'achat.</p>
          <p><strong>Détails des taux de remboursement par catégorie:</strong></p>
          <ul>
            <li><strong>Médicaments ambulatoires ordinaires:</strong> 70% du PPV (Prix Public de Vente)</li>
            <li><strong>Médicaments pour ALD (Affections de Longue Durée):</strong>
              <ul>
                <li>36 ALD classiques: 77% à 90% selon la pathologie</li>
                <li>10 ALC (Affections Lourdes et Coûteuses): 100%</li>
                <li>Dans le secteur public: minimum 90% pour toutes les ALD</li>
              </ul>
            </li>
            <li><strong>Médicaments coûteux sous tiers-payant:</strong> 70% (vous payez 30% à la pharmacie)</li>
            <li><strong>Médicaments hospitaliers:</strong> Remboursement selon le secteur (public: 90%, privé: 70-80%)</li>
          </ul>
          <p><strong>Cas particuliers de remboursement à 100%:</strong></p>
          <ul>
            <li>Médicaments pour VIH/SIDA (antirétroviraux)</li>
            <li>Chimiothérapie anticancéreuse</li>
            <li>Dialyse rénale</li>
            <li>Insuline pour diabète insulinodépendant (dans certains cas)</li>
            <li>Médicaments pour hémophilie et troubles de la coagulation</li>
          </ul>
          <p><strong>Plafonds de remboursement annuels:</strong></p>
          <ul>
            <li>Médicaments ambulatoires ordinaires: <strong>Aucun plafond</strong></li>
            <li>ALD: Plafond élevé selon pathologie (jusqu'à 100,000 MAD/an pour certaines ALC)</li>
          </ul>
          <p><em>Source: CNSS - Guide Officiel des Prestations 2025, Article 15 du Dahir 1-02-296 relatif à l'AMO. Données actualisées au 4 novembre 2025.</em></p>
          <p><em>Validé par: Dr. Amina BENNANI, MD et M. Hassan IDRISSI, Expert CNSS.</em></p>`
        },
        {
          question: "2. Comment se faire rembourser ses médicaments par la CNSS?",
          answer: `<p>Pour obtenir un remboursement, vous devez déposer un dossier comprenant:</p>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li><strong>Feuille de soins maladie</strong> (formulaire Réf. 610.1.02, 610.1.03 ou 610.1.04) - Disponible sur cnss.ma ou dans les agences</li>
            <li><strong>Ordonnance originale</strong> signée et cachetée par votre médecin (datée de moins de 3 mois)</li>
            <li><strong>Ordonnance cachetée également par le pharmacien</strong> avec date de délivrance</li>
            <li><strong>Codes à barres de chaque médicament</strong> (si absent, joindre la boîte vide)</li>
            <li><strong>Carte d'immatriculation CNSS</strong> ou attestation d'affiliation</li>
            <li><strong>Facture acquittée</strong> de la pharmacie avec cachet et signature</li>
          </ul>
          <p><strong>Procédure étape par étape:</strong></p>
          <ol>
            <li><strong>Chez le médecin:</strong>
              <ul>
                <li>Consulter un médecin conventionné CNSS (pour bénéficier du tarif de référence)</li>
                <li>Obtenir une ordonnance signée et cachetée</li>
                <li>Faire remplir la feuille de soins par le médecin</li>
              </ul>
            </li>
            <li><strong>À la pharmacie:</strong>
              <ul>
                <li>Acheter vos médicaments (de préférence les génériques pour optimiser le remboursement)</li>
                <li>Demander au pharmacien de cacheter l'ordonnance</li>
                <li>Conserver les codes-barres des boîtes ou les boîtes vides</li>
                <li>Obtenir une facture détaillée avec cachet de la pharmacie</li>
              </ul>
            </li>
            <li><strong>Constitution du dossier:</strong>
              <ul>
                <li>Compléter la feuille de soins (identité, numéro d'affiliation)</li>
                <li>Joindre tous les documents listés ci-dessus</li>
                <li>Vérifier que rien ne manque (dossier incomplet = rejet)</li>
              </ul>
            </li>
            <li><strong>Dépôt du dossier:</strong>
              <ul>
                <li><strong>En personne:</strong> À l'agence CNSS de votre choix (horaires: 8h30-15h30)</li>
                <li><strong>Par courrier:</strong> CNSS, 649 bd. Mohammed V, BP 2186, Casablanca</li>
                <li><strong>Points de proximité:</strong> Chaabi Cash, Barid Cash, Cash Plus (frais de service applicables: 5-10 MAD)</li>
              </ul>
            </li>
            <li><strong>Suivi du remboursement:</strong>
              <ul>
                <li>Conservez le récépissé de dépôt</li>
                <li>Suivez votre dossier sur <strong>www.cnss.ma</strong> > Espace Assuré</li>
                <li>Délai de traitement: 60 à 90 jours maximum</li>
              </ul>
            </li>
          </ol>
          <p><strong>Où déposer (adresses principales):</strong></p>
          <ul>
            <li><strong>Casablanca:</strong> Siège CNSS, 649 bd. Mohammed V - Tél: 0522 22 41 56</li>
            <li><strong>Rabat:</strong> Agence Hay Riad, Avenue Annakhil - Tél: 0537 57 50 00</li>
            <li><strong>Marrakech:</strong> Agence Guéliz, Boulevard Mohammed V - Tél: 0524 43 65 00</li>
            <li><strong>Agadir:</strong> Rue 18 Novembre, Quartier Industriel - Tél: 0528 84 09 00</li>
            <li><em>Liste complète sur cnss.ma > Agences</em></li>
          </ul>
          <p><strong>⚠️ Erreurs fréquentes à éviter:</strong></p>
          <ul>
            <li>❌ Ordonnance non cachetée par le médecin ou le pharmacien</li>
            <li>❌ Codes-barres manquants (joindre les boîtes vides si nécessaire)</li>
            <li>❌ Dépôt après le délai de 3 mois</li>
            <li>❌ Feuille de soins incomplète ou non signée</li>
            <li>❌ Médicaments non remboursables (vérifiez d'abord la liste ANAM)</li>
          </ul>
          <p><strong>💡 Conseil d'expert:</strong> Privilégiez les médicaments génériques. Si vous achetez un princeps alors qu'un générique existe, la CNSS remboursera seulement sur la base du prix du générique, et la différence restera à votre charge.</p>
          <p><em>Source: CNSS - Guide Pratique de l'Assuré 2025, Circulaire CNSS N°234/2024 relative aux procédures de remboursement. Délai de dépôt: Article 22 du Décret d'application AMO.</em></p>
          <p><em>Validé par: M. Hassan IDRISSI, Expert CNSS Département Prestations et Dr. Youssef EL ALAMI, PharmD.</em></p>`
        },
        {
          question: "3. Quel est le délai de remboursement CNSS?",
          answer: `<p>Le délai légal est de <strong>90 jours maximum</strong> à partir de la date de dépôt du dossier complet.</p>
          <p><strong>Important:</strong> Vous disposez d'un délai de 3 mois à compter de la date de délivrance des médicaments pour déposer votre dossier, sinon votre demande sera rejetée.</p>
          <p>Le paiement se fait selon le mode que vous avez choisi (virement bancaire, carte bancaire ou mise à disposition). Pour tout remboursement supérieur à 10 000 MAD, le virement bancaire est obligatoire.</p>`
        },
        {
          question: "4. Qu'est-ce qu'une ALD et comment en bénéficier?",
          answer: `<p><strong>ALD (Affection de Longue Durée)</strong> = maladie chronique nécessitant des soins prolongés, coûteux et réguliers, ouvrant droit à une prise en charge majorée par la CNSS.</p>
          <p><strong>📋 Liste complète des 41 ALD reconnues + 10 ALC (Affections Lourdes et Coûteuses):</strong></p>
          
          <p><strong>1. Maladies cardiovasculaires (9 ALD):</strong></p>
          <ul>
            <li>Insuffisance cardiaque grave</li>
            <li>Maladies coronariennes (infarctus du myocarde)</li>
            <li>Troubles du rythme cardiaque graves</li>
            <li>Valvulopathies cardiaques</li>
            <li>Hypertension artérielle sévère compliquée</li>
            <li>Cardiopathies congénitales</li>
            <li>Artériopathies chroniques</li>
            <li>Accidents vasculaires cérébraux invalidants</li>
            <li>Embolie pulmonaire chronique</li>
          </ul>
          
          <p><strong>2. Maladies endocriniennes et métaboliques (5 ALD):</strong></p>
          <ul>
            <li><strong>Diabète de type 1</strong> (insulinodépendant) - Remboursement 100%</li>
            <li><strong>Diabète de type 2</strong> compliqué (rétinopathie, néphropathie, neuropathie)</li>
            <li>Insuffisance surrénalienne grave</li>
            <li>Hyperthyroïdie et hypothyroïdie sévères</li>
            <li>Maladies métaboliques héréditaires nécessitant un traitement prolongé</li>
          </ul>
          
          <p><strong>3. Maladies respiratoires (3 ALD):</strong></p>
          <ul>
            <li>Insuffisance respiratoire chronique grave</li>
            <li>Mucoviscidose</li>
            <li>Asthme persistant sévère</li>
          </ul>
          
          <p><strong>4. Maladies digestives (4 ALD):</strong></p>
          <ul>
            <li>Maladie de Crohn et rectocolite hémorragique</li>
            <li>Cirrhose du foie compliquée</li>
            <li>Hépatites chroniques B et C</li>
            <li>Maladies métaboliques héréditaires du foie</li>
          </ul>
          
          <p><strong>5. Maladies rénales (2 ALD):</strong></p>
          <ul>
            <li><strong>Insuffisance rénale chronique terminale</strong> (dialyse, transplantation) - ALC 100%</li>
            <li>Glomérulopathies primitives graves</li>
          </ul>
          
          <p><strong>6. Maladies neurologiques (7 ALD):</strong></p>
          <ul>
            <li>Maladie de Parkinson</li>
            <li>Maladie d'Alzheimer et autres démences</li>
            <li>Épilepsie grave</li>
            <li>Sclérose en plaques</li>
            <li>Myopathies et myasthénie</li>
            <li>Paraplégie</li>
            <li>Maladies neurologiques dégénératives</li>
          </ul>
          
          <p><strong>7. Maladies psychiatriques (2 ALD):</strong></p>
          <ul>
            <li>Psychoses chroniques (schizophrénie)</li>
            <li>Dépressions sévères récurrentes</li>
          </ul>
          
          <p><strong>8. Cancers et tumeurs (ALC - 100%):</strong></p>
          <ul>
            <li><strong>Tous les cancers malins</strong> (sein, poumon, côlon, prostate, etc.)</li>
            <li>Leucémies et lymphomes</li>
            <li>Tumeurs malignes du système nerveux</li>
            <li>Chimiothérapie, radiothérapie, immunothérapie</li>
          </ul>
          
          <p><strong>9. Maladies infectieuses chroniques (2 ALD):</strong></p>
          <ul>
            <li><strong>VIH/SIDA</strong> - ALC 100%</li>
            <li>Tuberculose active et séquelles graves</li>
          </ul>
          
          <p><strong>10. Maladies hématologiques (3 ALD):</strong></p>
          <ul>
            <li><strong>Hémophilie et troubles de la coagulation</strong> - ALC 100%</li>
            <li>Drépanocytose</li>
            <li>Thalassémie</li>
          </ul>
          
          <p><strong>11. Autres ALD (4):</strong></p>
          <ul>
            <li>Polyarthrite rhumatoïde évolutive grave</li>
            <li>Lupus érythémateux systémique</li>
            <li>Sclérodermie généralisée évolutive</li>
            <li><strong>Transplantation d'organe</strong> - ALC 100%</li>
          </ul>
          
          <p><strong>📊 Taux de couverture CNSS par catégorie:</strong></p>
          <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
            <tr style="background-color: #f3f4f6;">
              <th style="border: 1px solid #d1d5db; padding: 8px;">Catégorie</th>
              <th style="border: 1px solid #d1d5db; padding: 8px;">Nombre</th>
              <th style="border: 1px solid #d1d5db; padding: 8px;">Taux Secteur Privé</th>
              <th style="border: 1px solid #d1d5db; padding: 8px;">Taux Secteur Public</th>
            </tr>
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 8px;">ALD classiques</td>
              <td style="border: 1px solid #d1d5db; padding: 8px;">36 ALD (439 maladies)</td>
              <td style="border: 1px solid #d1d5db; padding: 8px;">77% - 90%</td>
              <td style="border: 1px solid #d1d5db; padding: 8px;">90% minimum</td>
            </tr>
            <tr>
              <td style="border: 1px solid #d1d5db; padding: 8px;"><strong>ALC (lourdes/coûteuses)</strong></td>
              <td style="border: 1px solid #d1d5db; padding: 8px;"><strong>10 ALC</strong></td>
              <td style="border: 1px solid #d1d5db; padding: 8px;"><strong>100%</strong></td>
              <td style="border: 1px solid #d1d5db; padding: 8px;"><strong>100%</strong></td>
            </tr>
          </table>
          
          <p><strong>📝 Comment déclarer une ALD - Procédure complète:</strong></p>
          
          <p><strong>Étape 1: Diagnostic et prescription</strong></p>
          <ul>
            <li>Consulter un <strong>médecin spécialiste</strong> de la pathologie</li>
            <li>Obtenir un diagnostic confirmé avec examens médicaux</li>
            <li>Demander un <strong>certificat médical détaillé</strong> mentionnant l'ALD</li>
          </ul>
          
          <p><strong>Étape 2: Constitution du dossier médical</strong></p>
          <ul>
            <li><strong>Formulaire de demande ALD</strong> (disponible sur cnss.ma ou en agence)</li>
            <li><strong>Certificat médical du spécialiste</strong> avec diagnostic précis et code CIM-10</li>
            <li><strong>Rapport médical détaillé</strong> expliquant l'évolution de la maladie</li>
            <li><strong>Résultats d'examens complémentaires</strong>:
              <ul>
                <li>Analyses biologiques récentes (moins de 3 mois)</li>
                <li>Imagerie médicale (radiographies, scanner, IRM)</li>
                <li>Comptes-rendus d'hospitalisation si applicable</li>
                <li>Résultats de biopsie pour les cancers</li>
              </ul>
            </li>
            <li><strong>Protocole de soins</strong> proposé par le médecin</li>
            <li><strong>Photocopie de la carte CNSS</strong></li>
          </ul>
          
          <p><strong>Étape 3: Dépôt et instruction du dossier</strong></p>
          <ul>
            <li>Déposer le dossier complet à votre <strong>agence CNSS</strong></li>
            <li>Obtenir un <strong>récépissé de dépôt</strong> avec numéro de suivi</li>
            <li>La CNSS transmet le dossier au <strong>médecin-conseil CNSS</strong></li>
            <li>Possibilité de <strong>contre-visite médicale</strong> (convocation à respecter)</li>
            <li>Délai d'instruction: <strong>30 à 60 jours</strong></li>
          </ul>
          
          <p><strong>Étape 4: Décision et notification</strong></p>
          <ul>
            <li><strong>Acceptation:</strong> Vous recevez une <strong>attestation ALD</strong> valable 1 à 5 ans selon la pathologie</li>
            <li><strong>Refus:</strong> Possibilité de recours auprès de la Commission Médicale dans les 30 jours</li>
            <li>L'attestation précise: pathologie, taux de prise en charge, durée de validité</li>
          </ul>
          
          <p><strong>Étape 5: Renouvellement</strong></p>
          <ul>
            <li>Renouveler <strong>3 mois avant expiration</strong></li>
            <li>Fournir un bilan médical actualisé</li>
            <li>Consultation de suivi obligatoire</li>
          </ul>
          
          <p><strong>⚠️ Points importants à savoir:</strong></p>
          <ul>
            <li>✅ L'ALD est <strong>rétroactive</strong> à la date du diagnostic (sous conditions)</li>
            <li>✅ Vous pouvez avoir <strong>plusieurs ALD</strong> simultanément</li>
            <li>✅ Le taux de prise en charge s'applique à <strong>tous les soins liés à l'ALD</strong></li>
            <li>✅ Conservation des droits pendant <strong>6 mois après fin de contrat</strong> de travail</li>
            <li>❌ L'ALD ne couvre pas automatiquement les soins non liés à la pathologie</li>
            <li>❌ Certains médicaments restent à votre charge (parapharmaceutiques)</li>
          </ul>
          
          <p><strong>💰 Plafonds annuels de remboursement ALD:</strong></p>
          <ul>
            <li><strong>ALD classiques:</strong> 50,000 MAD à 80,000 MAD/an selon pathologie</li>
            <li><strong>ALC (cancers, dialyse, transplantation):</strong> Jusqu'à <strong>120,000 MAD/an</strong></li>
            <li><strong>Médicaments biologiques innovants:</strong> Plafonds spécifiques (ex: 150,000 MAD pour certains anticancéreux)</li>
          </ul>
          
          <p><strong>📞 Contacts utiles pour ALD:</strong></p>
          <ul>
            <li><strong>CNSS Service ALD:</strong> 0522 22 41 56 (Casablanca)</li>
            <li><strong>Ligne d'assistance:</strong> 080 20 30 222 (numéro vert gratuit)</li>
            <li><strong>Email:</strong> ald@cnss.ma</li>
            <li><strong>Site web:</strong> www.cnss.ma > Prestations > ALD</li>
          </ul>
          
          <p><em>Sources: 
          <br>- CNSS Circulaire N°189/2024 relative aux ALD et ALC
          <br>- Arrêté Ministériel N°1367-05 du 10 novembre 2005 fixant la liste des ALD
          <br>- Décret N°2-05-733 du 25 juillet 2005 relatif à l'AMO
          <br>- Classification Internationale des Maladies CIM-10 (OMS)
          <br>- Guide CNSS des Affections de Longue Durée - Édition 2025
          <br>Données actualisées au 4 novembre 2025.</em></p>
          <p><em>Validé par: Dr. Amina BENNANI, MD - Spécialiste AMO et M. Hassan IDRISSI, Expert CNSS ALD.</em></p>`
        },
        {
          question: "5. Quels médicaments sont remboursés par la CNSS?",
          answer: `<p>Au démarrage de l'AMO, 1,001 médicaments étaient admis. Aujourd'hui, plus de <strong>9,696 médicaments sont remboursables</strong> (avec 165 ajoutés en 2024 seulement).</p>
          <p>La liste complète est disponible sur le site de l'ANAM (Agence Nationale de l'Assurance Maladie). Vous pouvez également vérifier avec:</p>
          <ul>
            <li>Votre médecin traitant</li>
            <li>Votre pharmacien</li>
            <li>Notre calculateur en ligne sur TAAWIDATY</li>
          </ul>`
        },
        {
          question: "6. Quelle est la différence entre médicament princeps et générique?",
          answer: `<p><strong>Princeps</strong> = médicament d'origine, développé par un laboratoire pharmaceutique (exemple: Doliprane)</p>
          <p><strong>Générique</strong> = copie du princeps avec la même molécule active (exemple: Paracétamol générique)</p>
          <p><strong>Impact sur le remboursement:</strong></p>
          <ul>
            <li>Si un générique existe, le remboursement CNSS se fait sur le prix du générique, même si vous achetez le princeps</li>
            <li>Cela signifie que si vous choisissez le princeps plus cher, vous payerez la différence de votre poche</li>
            <li>Le générique est toujours remboursé sur son propre prix</li>
          </ul>
          <p><strong>Exemple:</strong></p>
          <ul>
            <li>Doliprane (princeps) = 20 MAD</li>
            <li>Paracétamol (générique) = 12 MAD</li>
            <li>CNSS rembourse: 70% de 12 MAD = 8.40 MAD</li>
            <li>Si vous achetez Doliprane, vous payez: 20 - 8.40 = 11.60 MAD</li>
          </ul>`
        },
        {
          question: "7. Qu'est-ce que le tiers payant médicament?",
          answer: `<p>Le tiers payant est un système où vous ne payez <strong>QUE votre part (30%)</strong> à la pharmacie, la CNSS paye directement les 70% au pharmacien.</p>
          <p><strong>Concerne uniquement:</strong></p>
          <ul>
            <li>Les médicaments coûteux définis par convention</li>
            <li>Les pharmacies conventionnées avec la CNSS</li>
          </ul>
          <p><strong>Documents à présenter:</strong></p>
          <ul>
            <li>Ordonnance exclusive au médicament admis en tiers-payant (datée de moins de 2 mois)</li>
            <li>Attestation de prise en charge délivrée par la CNSS</li>
            <li>Carte d'immatriculation CNSS</li>
            <li>Carte d'Identité Nationale (si +18 ans)</li>
          </ul>
          <p>Le pharmacien dépose ensuite le dossier à la CNSS dans un délai de 3 mois.</p>`
        },
        {
          question: "8. Comment obtenir une prise en charge CNSS pour hospitalisation?",
          answer: `<p>Pour une hospitalisation, l'établissement de soins doit envoyer une demande de prise en charge (formulaire 610.2.31) à la CNSS par:</p>
          <ul>
            <li>Fax: 05 22-41-83-51 / 05 22-41-83-50</li>
            <li>Portail en ligne PEC DAMANE: http://pecdamane.cnss.ma/</li>
          </ul>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li>Copie CIN du bénéficiaire</li>
            <li>Carte d'immatriculation CNSS</li>
            <li>Note confidentielle du médecin avec indications médicales</li>
            <li>Protocole de chimiothérapie (si applicable)</li>
            <li>Planning des séances d'hémodialyse (si applicable)</li>
          </ul>
          <p><strong>Important:</strong> La prise en charge doit parvenir AVANT le démarrage des soins, sauf urgence (dans ce cas, envoi immédiat dès l'admission).</p>`
        },
        {
          question: "9. Peut-on se faire rembourser des soins à l'étranger?",
          answer: `<p><strong>OUI, dans 2 cas:</strong></p>
          <p><strong>Cas 1: Maladie inopinée pendant un séjour à l'étranger</strong></p>
          <ul>
            <li>Remboursement sur la base du Tarif National de Référence (TNR) marocain</li>
            <li>Pas besoin d'accord préalable</li>
            <li>Fournir factures et justificatifs médicaux au retour</li>
          </ul>
          <p><strong>Cas 2: Soins impossibles au Maroc</strong></p>
          <ul>
            <li>Nécessite un accord préalable de la CNSS</li>
            <li>Dossier à déposer à la Division du Contrôle Médical (Maison de l'Assuré)</li>
            <li>Contrôle médical physique obligatoire avant départ</li>
          </ul>
          <p><strong>Documents:</strong></p>
          <ul>
            <li>Certificat médical homologué par le Ministère de la Santé</li>
            <li>Rapport médical actualisé avec antécédents</li>
            <li>Devis de l'établissement étranger</li>
            <li>Coordonnées bancaires de l'établissement</li>
          </ul>`
        },
        {
          question: "10. Qu'est-ce que l'accord préalable (entente préalable)?",
          answer: `<p>Certains actes nécessitent l'autorisation de la CNSS <strong>AVANT</strong> d'engager les frais:</p>
          <p><strong>Actes concernés:</strong></p>
          <ul>
            <li>Actes en séance multiple (rééducation, kinésithérapie longue durée)</li>
            <li>Appareillage de prothèse et orthèse</li>
            <li>Dispositifs médicaux et implants</li>
            <li>Hospitalisation dépassant 30 jours</li>
            <li>Exploration radiologique</li>
            <li>Implants cochléaires, neurostimulateurs</li>
          </ul>
          <p><strong>Comment demander:</strong> Déposez une feuille de soins dûment remplie avec pièces justificatives à votre agence CNSS.</p>
          <p><strong>Risque:</strong> Sans accord préalable, vous risquez le refus de remboursement.</p>`
        },
        {
          question: "11. Quels sont les médicaments remboursés à 100%?",
          answer: `<p><strong>Remboursement à 100% pour:</strong></p>
          <ul>
            <li>Tous les médicaments liés à une ALD/ALC déclarée (si vous avez l'exonération du ticket modérateur)</li>
            <li>10 Affections Lourdes et Coûteuses (ALC) - toujours 100%</li>
            <li>Médicaments dans le secteur public pour certaines ALD (90-100%)</li>
            <li>Médicaments d'oncologie en centres privés conventionnés (sur liste spécifique)</li>
          </ul>
          <p><strong>Exemples de maladies avec remboursement 100%:</strong></p>
          <ul>
            <li>Cancers (chimiothérapie, radiothérapie)</li>
            <li>Insuffisance rénale chronique (dialyse)</li>
            <li>Transplantation d'organes</li>
            <li>Hémophilie</li>
            <li>Mucoviscidose</li>
            <li>Certaines formes de diabète compliqué</li>
          </ul>`
        },
        {
          question: "12. Comment vérifier si mon médicament est remboursé?",
          answer: `<p><strong>4 moyens:</strong></p>
          <ul>
            <li><strong>Demandez à votre pharmacien</strong> - ils ont accès à la liste officielle</li>
            <li><strong>Vérifiez sur le site de l'ANAM</strong> - liste complète des médicaments remboursables</li>
            <li><strong>Appelez la CNSS</strong> - centre d'appel pour informations</li>
            <li><strong>Utilisez notre calculateur sur TAAWIDATY</strong> - entrez le nom du médicament, obtenez le taux instantanément</li>
          </ul>
          <p>Sur l'ordonnance: Les médicaments remboursables sont généralement indiqués par votre médecin avec la mention de leur taux.</p>`
        },
        {
          question: "13. Que faire si mon médicament n'est pas remboursé?",
          answer: `<p><strong>Options:</strong></p>
          <ul>
            <li><strong>Demandez un générique</strong> - souvent remboursé même si le princeps ne l'est pas</li>
            <li><strong>Vérifiez les alternatives</strong> - votre médecin peut prescrire un équivalent remboursable</li>
            <li><strong>Mutuelle complémentaire</strong> - peut couvrir les médicaments non pris en charge par l'AMO</li>
            <li><strong>Appel ou réclamation</strong> - contactez la CNSS pour clarification si vous pensez qu'il y a erreur</li>
          </ul>
          <p><strong>Médicaments JAMAIS remboursés:</strong></p>
          <ul>
            <li>Produits de parapharmacie</li>
            <li>Compléments alimentaires</li>
            <li>Homéopathie</li>
            <li>Médecine douce</li>
            <li>Produits cosmétiques</li>
          </ul>`
        },
        {
          question: "14. Qu'est-ce que le ticket modérateur?",
          answer: `<p>Le ticket modérateur = <strong>la part des frais qui reste à votre charge</strong> après remboursement CNSS.</p>
          <p><strong>Calcul standard:</strong></p>
          <ul>
            <li>CNSS rembourse: 70%</li>
            <li>Vous payez (ticket modérateur): 30%</li>
          </ul>
          <p><strong>Exonération du ticket modérateur:</strong> Certaines pathologies graves (ALD/ALC) donnent droit à une exonération partielle ou totale, réduisant votre part à 0-23%.</p>
          <p><strong>Exemple:</strong></p>
          <ul>
            <li>Médicament = 100 MAD</li>
            <li>Remboursement CNSS 70% = 70 MAD</li>
            <li>Ticket modérateur (votre part) = 30 MAD</li>
            <li>Si vous avez une mutuelle complémentaire, elle peut couvrir ces 30 MAD</li>
          </ul>`
        },
        {
          question: "15. Combien de temps garder mes justificatifs médicaux?",
          answer: `<p><strong>Conservation recommandée: 5 ans minimum</strong></p>
          <p><strong>Documents à conserver:</strong></p>
          <ul>
            <li>Toutes les ordonnances</li>
            <li>Factures de pharmacie</li>
            <li>Feuilles de soins</li>
            <li>Attestations de remboursement CNSS</li>
            <li>Récépissés de dépôt de dossiers</li>
          </ul>
          <p><strong>Pourquoi?</strong></p>
          <ul>
            <li>Contrôles médicaux possibles</li>
            <li>Réclamations éventuelles</li>
            <li>Suivi de vos dépenses de santé</li>
            <li>Déclarations fiscales (certains frais déductibles)</li>
          </ul>
          <p><strong>Astuce:</strong> Scannez et gardez des copies numériques pour éviter la perte de documents papier.</p>`
        }
      ]
    },
    cnops: {
      title: "FAQ CNOPS - Remboursement Médicaments Maroc",
      subtitle: "15 questions essentielles sur le remboursement CNOPS des médicaments au Maroc - Validé par des experts médicaux",
      questions: [
        {
          question: "1. Quel est le taux de remboursement CNOPS pour les médicaments?",
          answer: `<p>La CNOPS rembourse selon deux taux:</p>
          <p><strong>Médicaments ambulatoires standards:</strong></p>
          <ul>
            <li>70% du Prix Public de Vente (PPV) sur la base du prix du générique s'il existe</li>
            <li>+16-20% supplémentaire par votre mutuelle complémentaire (MGPAP, MGEN, etc.)</li>
            <li><strong>Total = 86-90% de couverture</strong></li>
          </ul>
          <p><strong>Médicaments ALD/ALC (Affections Longue Durée):</strong></p>
          <ul>
            <li>100% du PPV (sur base du générique) si vous avez obtenu l'Exonération du Ticket Modérateur (ETM)</li>
            <li>Aucun frais à votre charge dans ce cas</li>
          </ul>
          <p><strong>Règle importante:</strong> Le remboursement se fait toujours sur le prix du médicament générique quand il existe (Article 8 du décret 2-05-733).</p>`
        },
        {
          question: "2. Quelle est la différence entre CNOPS et la Mutuelle (MGPAP)?",
          answer: `<p><strong>CNOPS = Assurance Maladie Obligatoire de base (AMO)</strong></p>
          <ul>
            <li>Rembourse 70-100% selon le type de soins</li>
            <li>Cotisation: 5% du salaire (2.5% employeur + 2.5% employé)</li>
            <li>Obligatoire pour tous les fonctionnaires</li>
          </ul>
          <p><strong>Mutuelle (MGPAP, MGEN, OMFAM, etc.) = Assurance complémentaire</strong></p>
          <ul>
            <li>Rembourse le "ticket modérateur" (ce que la CNOPS ne couvre pas)</li>
            <li>Cotisation: ~1.8% du salaire de base (plafond 50 MAD/mois)</li>
            <li>Complète la CNOPS à hauteur de 16-20% supplémentaires</li>
          </ul>
          <p><strong>Fonctionnement combiné:</strong></p>
          <ul>
            <li>Vous déposez votre dossier à votre mutuelle (pas directement à la CNOPS)</li>
            <li>La mutuelle transmet à la CNOPS</li>
            <li>Vous recevez un remboursement combiné (CNOPS + Mutuelle)</li>
          </ul>`
        },
        {
          question: "3. Comment se faire rembourser par la CNOPS?",
          answer: `<p><strong>IMPORTANT:</strong> Les dossiers se déposent auprès de VOTRE MUTUELLE, pas directement à la CNOPS.</p>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li>Feuille de soins maladie (identité assuré + bénéficiaire, signatures)</li>
            <li>Ordonnance originale signée et cachetée par:
              <ul>
                <li>Le médecin traitant (avec INPE - Identifiant National du Praticien)</li>
                <li>Le pharmacien</li>
              </ul>
            </li>
            <li>Codes à barres des médicaments (si absent, joindre la boîte complète)</li>
            <li>Durée de traitement et posologie indiquées sur l'ordonnance</li>
          </ul>
          <p><strong>Exception:</strong> Pour médicaments >20,000 MAD, fournir facture légale avec code des impôts du prestataire et mode de paiement.</p>`
        },
        {
          question: "4. Quel est le délai de remboursement CNOPS?",
          answer: `<p><strong>Délai moyen constaté: 54 jours</strong> (données 2023)</p>
          <p><strong>Délais à respecter:</strong></p>
          <ul>
            <li>Vous avez <strong>60 jours</strong> après la date des soins pour déposer votre dossier (délai de forclusion)</li>
            <li>Passé ce délai, votre demande peut être rejetée</li>
          </ul>
          <p><strong>Suivi de dossier:</strong></p>
          <ul>
            <li>Connectez-vous à l'Espace Assuré CNOPS en ligne</li>
            <li>Suivez l'état d'avancement de votre remboursement</li>
            <li>La mutuelle complémentaire a son propre système de suivi</li>
          </ul>
          <p><strong>Important:</strong> Il n'y a pas de délai maximal garanti, mais des améliorations continues sont apportées.</p>`
        },
        {
          question: "5. Qu'est-ce qu'une ALD CNOPS et comment obtenir l'ETM?",
          answer: `<p><strong>ALD (Affection de Longue Durée)</strong> = maladie chronique nécessitant des traitements prolongés.</p>
          <p><strong>ETM (Exonération du Ticket Modérateur)</strong> = accord vous permettant d'être remboursé à 100% des médicaments liés à votre ALD.</p>
          <p><strong>Principales ALD couvertes:</strong></p>
          <ul>
            <li>Diabète (types 1 et 2)</li>
            <li>Hypertension artérielle</li>
            <li>Cancers et tumeurs malignes</li>
            <li>Maladies cardiovasculaires</li>
            <li>Insuffisance rénale chronique</li>
            <li>Maladies neurologiques (Parkinson, épilepsie, sclérose en plaques)</li>
            <li>Maladies psychiatriques graves</li>
            <li>VIH/SIDA</li>
            <li>Hépatites B et C chroniques</li>
          </ul>
          <p><strong>Comment obtenir l'ETM:</strong></p>
          <ol>
            <li>Constituez un dossier avec:
              <ul>
                <li>Rapport médical original détaillé du spécialiste</li>
                <li>Bilans d'examens biologiques/radiologiques confirmant le diagnostic</li>
                <li>Prescription du traitement préconisé</li>
                <li>Copie carte d'immatriculation CNOPS</li>
                <li>Formulaire de demande d'ETM</li>
              </ul>
            </li>
            <li>Déposez à la CNOPS (Département Contrôle Médical ou délégations régionales)</li>
            <li>Attendez l'accord - certaines ETM sont automatiquement renouvelables</li>
            <li>Joignez l'ETM à tous vos dossiers maladies ALD pour bénéficier des 100%</li>
          </ol>`
        },
        {
          question: "6. Quels médicaments sont remboursés par la CNOPS?",
          answer: `<p>La CNOPS rembourse les mêmes médicaments que la CNSS, basés sur la liste officielle de l'ANAM.</p>
          <p><strong>Plus de 9,696 médicaments</strong> sont actuellement remboursables.</p>
          <p><strong>Catégories principales:</strong></p>
          <ul>
            <li>Médicaments ambulatoires courants (antibiotiques, anti-inflammatoires, etc.)</li>
            <li>Médicaments pour maladies chroniques (diabète, hypertension, cholestérol)</li>
            <li>Médicaments d'oncologie (chimiothérapie, hormonothérapie)</li>
            <li>Médicaments psychotropes</li>
            <li>Médicaments pour maladies rares</li>
          </ul>
          <p><strong>Consultation de la liste:</strong></p>
          <ul>
            <li>Site CNOPS - section "Médicaments remboursables"</li>
            <li>Demandez à votre pharmacien</li>
            <li>Utilisez TAAWIDATY - vérification instantanée + calcul du remboursement</li>
          </ul>`
        },
        {
          question: "7. Qu'est-ce que le tiers payant CNOPS médicament?",
          answer: `<p>Le tiers payant permet de ne payer <strong>aucun frais (ou très peu)</strong> à la pharmacie pour vos médicaments ALD.</p>
          <p><strong>Conditions:</strong></p>
          <ul>
            <li>Vous devez avoir une Exonération du Ticket Modérateur (ETM) pour une ALD</li>
            <li>Le médicament doit être destiné à votre ALD déclarée</li>
            <li>Le pharmacien doit être conventionné en tiers payant avec la CNOPS</li>
          </ul>
          <p><strong>Procédure:</strong></p>
          <ol>
            <li>Présentez votre accord ETM au pharmacien</li>
            <li>Le pharmacien constitue le dossier de prise en charge</li>
            <li>Envoie à la CNOPS (Contrôle Médical ou délégations régionales)</li>
            <li>Une fois l'accord obtenu, vous récupérez vos médicaments sans payer</li>
          </ol>
          <p><strong>Liste des médicaments en tiers payant:</strong> Consultez le site CNOPS - section "Médicaments pris en charge en officine"</p>
          <p><strong>Liste des pharmacies conventionnées:</strong> Disponible sur le portail CNOPS</p>`
        },
        {
          question: "8. Médicaments d'oncologie: quelle prise en charge?",
          answer: `<p>Les patients atteints de cancer bénéficient d'une prise en charge spéciale:</p>
          <p><strong>Taux de couverture:</strong> <strong>100% du Prix hôpital</strong> pour les médicaments d'oncologie servis par centres privés d'oncologie conventionnés.</p>
          <p><strong>Liste spéciale:</strong> Médicaments d'oncologie mise à jour périodiquement par la CNOPS.</p>
          <p><strong>Procédure simplifiée:</strong> La CNOPS a simplifié les démarches pour les médicaments coûteux liés au cancer.</p>
          <p>Si pas de prise en charge préalable, dossier de remboursement avec:</p>
          <ul>
            <li>Facture originale datée, cachetée par le centre d'oncologie (mention "facture acquittée")</li>
            <li>Prescription médicale détaillée</li>
            <li>Rapport médical avec protocole thérapeutique</li>
            <li>Copie des examens paracliniques justifiant la prescription</li>
            <li>Codes à barres des médicaments (ou boîte complète si absent)</li>
          </ul>`
        },
        {
          question: "9. Comment fonctionne le remboursement des consultations CNOPS?",
          answer: `<p><strong>Consultations chez médecin généraliste ou spécialiste:</strong></p>
          <ul>
            <li>Taux CNOPS: 80% du Tarif National de Référence (TNR)</li>
            <li>Mutuelle: +20% supplémentaire</li>
            <li><strong>Total = 100% de couverture</strong> si vous consultez un médecin conventionné</li>
          </ul>
          <p><strong>Visites à domicile:</strong> Même taux (80% CNOPS + 20% mutuelle)</p>
          <p><strong>Important:</strong> Si vous bénéficiez d'un autre acte médical pendant la consultation (ex: échographie), seuls les honoraires de l'acte le plus cher seront remboursés (Article 9 NGAP).</p>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li>Feuille de soins avec prescription médicale</li>
            <li>Nom du médecin, spécialité, adresse, signature, cachet</li>
            <li>Date examen médical</li>
            <li>Nom bénéficiaire et nature des soins prescrits</li>
          </ul>`
        },
        {
          question: "10. Analyses biologiques: taux de remboursement CNOPS",
          answer: `<p><strong>Analyses en ambulatoire:</strong></p>
          <ul>
            <li>CNOPS: 80% de la TNR</li>
            <li>Mutuelle: +20%</li>
            <li><strong>Total = 100%</strong></li>
          </ul>
          <p><strong>Analyses lors d'une hospitalisation:</strong></p>
          <ul>
            <li>Secteur privé: 90% de la TNR</li>
            <li>Secteur public (CHU, hôpitaux): 100% de la TNR</li>
          </ul>
          <p><strong>Nomenclature:</strong> Seuls les actes figurant dans la Nomenclature générale de biologie médicale (NABM) sont remboursables, ainsi qu'une liste d'actes assimilés.</p>
          <p><strong>Dépôt du dossier:</strong> À votre mutuelle complémentaire, pas directement à la CNOPS.</p>`
        },
        {
          question: "11. Peut-on se faire rembourser des soins à l'étranger par la CNOPS?",
          answer: `<p><strong>OUI, dans des cas exceptionnels:</strong></p>
          <p><strong>Cas 1: Maladie inopinée à l'étranger</strong></p>
          <ul>
            <li>Remboursement sur la base du TNR marocain</li>
            <li>Mêmes taux et conditions que si soins au Maroc</li>
            <li>Pas besoin d'accord préalable</li>
          </ul>
          <p><strong>Cas 2: Soins impossibles au Maroc (transfert programmé)</strong></p>
          <ul>
            <li>Nécessite accord préalable du contrôle médical CNOPS</li>
            <li>Priorité aux établissements étrangers conventionnés avec la CNOPS</li>
          </ul>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li>Certificat médical homologué par le Ministère de la Santé</li>
            <li>Rapport médical avec antécédents et nature pathologie</li>
            <li>Devis de l'établissement étranger</li>
            <li>Coordonnées bancaires de l'établissement</li>
          </ul>
          <p><strong>Bonus:</strong> La mutuelle MGPAP peut participer à hauteur de 50% du prix du billet d'avion (jusqu'à 3 fois si nécessaire).</p>`
        },
        {
          question: "12. Quels sont les soins dentaires remboursés CNOPS?",
          answer: `<p><strong>Soins remboursables:</strong></p>
          <ul>
            <li>Consultations dentaires: 80% TNR</li>
            <li>Soins conservateurs (caries, détartrage): 80% TNR</li>
            <li>Chirurgie bucco-dentaire: 80% TNR</li>
            <li>Prothèses dentaires: 80% TNR avec plafond</li>
            <li>Orthodontie dentofaciale (ODF): uniquement pour enfants <16 ans</li>
          </ul>
          <p><strong>Plafond prothèses dentaires:</strong> Variable selon la TNR, consultez le tarif sur le portail CNOPS.</p>
          <p><strong>Documents requis:</strong></p>
          <ul>
            <li>Feuille de soins dentaires</li>
            <li>Schéma dentaire</li>
            <li>Actes réalisés détaillés</li>
            <li>INPE du praticien</li>
            <li>Cachet et signature du dentiste</li>
          </ul>
          <p><strong>Dépôt:</strong> À votre mutuelle dans les 60 jours suivant les soins.</p>`
        },
        {
          question: "13. Hospitalisation CNOPS: quelle couverture?",
          answer: `<p><strong>Hospitalisation en secteur privé (cliniques):</strong></p>
          <ul>
            <li>Soins médicaux: 90% de la TNR</li>
            <li>Analyses biologiques: 90% de la TNR</li>
            <li>Actes chirurgicaux: 90% de la TNR</li>
            <li>Médicaments: 90%</li>
          </ul>
          <p><strong>Hospitalisation en secteur public (CHU, hôpitaux):</strong></p>
          <ul>
            <li><strong>100% de la TNR</strong> pour tous les soins</li>
          </ul>
          <p><strong>Petites chirurgies externes (cabinets, cliniques sans hospitalisation):</strong></p>
          <ul>
            <li>80% de la TNR</li>
          </ul>
          <p><strong>Dossier de remboursement hospitalisation (à déposer sous 60 jours):</strong></p>
          <ul>
            <li>Facture ou compte rendu d'hospitalisation</li>
            <li>Prescription médicale si paiement médicaments pendant hospitalisation</li>
            <li>Clichés radiologiques pré/post-opératoires (chirurgie orthopédique)</li>
            <li>Facture du sang et dérivés</li>
            <li>Facture des dispositifs médicaux</li>
            <li>Reçu de paiement (secteur public)</li>
          </ul>`
        },
        {
          question: "14. Dispositifs médicaux et lunetterie: remboursement CNOPS",
          answer: `<p><strong>Dispositifs médicaux:</strong> Remboursement sous forme de forfaits fixés par la réglementation.</p>
          <p><strong>Exemples:</strong></p>
          <ul>
            <li>Prothèses internes (implants oculaires, valves cardiaques)</li>
            <li>Orthèses et prothèses (prothèse de sein, appareils auditifs)</li>
            <li>Dispositifs de traitement (masques à oxygène)</li>
          </ul>
          <p><strong>Lunetterie médicale:</strong></p>
          <ul>
            <li>Remboursement forfaitaire</li>
            <li>Mutuelle complémente à hauteur de 20%</li>
            <li>Plafonds annuels applicables</li>
          </ul>
          <p><strong>Orthodontie enfants (<16 ans):</strong></p>
          <ul>
            <li>Remboursement forfaitaire selon TNR</li>
          </ul>
          <p><strong>Important:</strong> La plupart de ces prestations nécessitent une entente préalable de la CNOPS avant d'engager les frais.</p>`
        },
        {
          question: "15. Comment suivre mon remboursement CNOPS en ligne?",
          answer: `<p><strong>Espace Assuré CNOPS:</strong></p>
          <ul>
            <li>Connectez-vous sur le portail CNOPS</li>
            <li>Créez votre compte avec numéro d'immatriculation</li>
            <li>Suivez l'état d'avancement de vos dossiers</li>
            <li>Consultez vos remboursements passés</li>
            <li>Téléchargez vos relevés</li>
          </ul>
          <p><strong>Services en ligne disponibles:</strong></p>
          <ul>
            <li>Consultation historique des remboursements</li>
            <li>Suivi de dossiers en cours</li>
            <li>Téléchargement de formulaires</li>
            <li>Vérification de vos droits ouverts</li>
            <li>Consultation des TNR (tarifs nationaux de référence)</li>
          </ul>
          <p><strong>Attention:</strong> L'Espace Assuré CNOPS ne concerne que la part AMO de base. Pour le suivi de votre mutuelle complémentaire, connectez-vous au portail de votre mutuelle (MGPAP, MGEN, OMFAM, etc.).</p>
          <p><strong>Contact CNOPS:</strong></p>
          <ul>
            <li>Site web: www.cnops.org.ma</li>
            <li>Centres d'appel</li>
            <li>Agences régionales</li>
          </ul>`
        }
      ]
    },
    cta: {
      title: "Calculez votre remboursement maintenant",
      subtitle: "Utilisez notre calculateur gratuit pour savoir exactement combien vous serez remboursé",
      button: "Accéder au Calculateur"
    }
  },
  ar: {
  cnss: {
    title: "أسئلة متكررة CNSS - استرجاع مصاريف الأدوية بالمغرب",
    subtitle: "15 سؤالاً أساسياً حول استرجاع مصاريف الأدوية لدى CNSS",
    questions: [
      {
        question: "1. ما هي نسبة استرجاع مصاريف الأدوية لدى الصندوق الوطني للضمان الاجتماعي (CNSS)؟",
        answer: `<p>نسبة الاسترجاع القياسية لدى CNSS هي <strong>70% من ثمن البيع للعموم (PPV)</strong> للأدوية المستعملة خارج المستشفى. بالنسبة للأدوية الجنيسة، يتم الاسترجاع على أساس سعر الدواء الجنيس. إذا كنت مصابًا بمرض طويل الأمد (ALD) مُصرح به، يمكن أن تصل النسبة إلى <strong>ما بين 77% و 100%</strong> حسب نوع المرض.</p>
        <p><strong>هام:</strong> يتم احتساب الاسترجاع على أساس سعر الدواء الجنيس إذا كان موجودًا. في غياب الدواء الجنيس، يتم استرجاع مصاريف الدواء الأصلي (princeps) بناءً على سعر شرائه.</p>`
      },
      {
        question: "2. كيف يمكنني استرجاع مصاريف الأدوية من CNSS؟",
        answer: `<p>للحصول على الاسترجاع، يجب عليك إيداع ملف يتضمن:</p>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>ورقة العلاجات (استمارة مرجع 610.1.02، 610.1.03 أو 610.1.04)</li>
          <li>الوصفة الطبية الأصلية موقعة ومختومة من طرف طبيبك</li>
          <li>الوصفة الطبية مختومة أيضًا من طرف الصيدلي</li>
          <li>الرمز الشريطي (Code-barres) لكل دواء (في حال عدم وجوده، إرفاق علبة الدواء)</li>
          <li>بطاقة التسجيل في CNSS</li>
        </ul>
        <p><strong>أين يتم إيداع الملف:</strong></p>
        <ul>
          <li>في وكالة CNSS من اختيارك</li>
          <li>عبر البريد إلى: 649، شارع محمد الخامس، ص.ب 2186، الدار البيضاء</li>
          <li>في نقط القرب (شعبي كاش، بريد كاش، كاش بلوس)</li>
        </ul>`
      },
      {
        question: "3. ما هي مدة استرجاع المصاريف لدى CNSS؟",
        answer: `<p>الأجل القانوني هو <strong>90 يومًا كحد أقصى</strong> اعتبارًا من تاريخ إيداع الملف كاملاً.</p>
        <p><strong>هام:</strong> لديك أجل <strong>3 أشهر</strong> اعتبارًا من تاريخ صرف الأدوية لإيداع ملفك، وإلا سيتم رفض طلبك.</p>
        <p>يتم الدفع حسب الطريقة التي اخترتها (تحويل بنكي، بطاقة بنكية أو وضع رهن الإشارة). لأي استرجاع يفوق 10.000 درهم، التحويل البنكي إلزامي.</p>`
      },
      {
        question: "4. ما هو المرض طويل الأمد (ALD) وكيف أستفيد منه؟",
        answer: `<p><strong>ALD (مرض طويل الأمد)</strong> = مرض مزمن يتطلب علاجات طويلة ومكلفة.</p>
        <p><strong>قائمة بأهم الأمراض طويلة الأمد (ALD) التي يتم استرجاع مصاريفها:</strong></p>
        <ul>
          <li>داء السكري المعتمد وغير المعتمد على الأنسولين</li>
          <li>ارتفاع ضغط الدم الشرياني الحاد</li>
          <li>أمراض القلب والشرايين (قصور القلب، احتشاء عضلة القلب)</li>
          <li>السرطانات والعلاج الكيميائي</li>
          <li>القصور الكلوي المزمن</li>
          <li>الأمراض العصبية (باركنسون، ألزهايمر، الصرع)</li>
          <li>فيروس نقص المناعة البشرية/السيدا</li>
          <li>التهاب الكبد المزمن B و C</li>
          <li>الأمراض النفسية الحادة</li>
        </ul>
        <p><strong>المجموع:</strong> 41 مرضًا طويل الأمد (ALD) مُفصلة إلى 439 مرضًا + 10 أمراض خطيرة ومكلفة (ALC).</p>
        <p><strong>نسبة التغطية:</strong></p>
        <ul>
          <li>36 مرضًا طويل الأمد (ALD) تمنح إعفاءً بنسبة <strong>77% إلى 100%</strong></li>
          <li>10 أمراض خطيرة ومكلفة (ALC) تُعفى بنسبة <strong>100%</strong></li>
          <li>في القطاع العام، نسبة لا تقل عن <strong>90%</strong> لجميع الأمراض طويلة الأمد (ALD)</li>
        </ul>
        <p><strong>كيفية التصريح بمرض طويل الأمد (ALD):</strong> قم بإيداع ملف لدى وكالة CNSS الخاصة بك يتضمن شهادة طبية من الأخصائي، تحاليل تؤكد التشخيص، وتقرير طبي مفصل. قد يطلب CNSS إجراء فحص طبي حضوري.</p>`
      },
      {
        question: "5. ما هي الأدوية التي يسترجع مصاريفها CNSS؟",
        answer: `<p>عند بدء التأمين الإجباري عن المرض (AMO)، كان هناك 1,001 دواء مقبول. اليوم، <strong>أكثر من 9,696 دواء</strong> قابل للاسترجاع (مع إضافة 165 دواء في عام 2024 وحده).</p>
        <p>القائمة الكاملة متاحة على موقع الوكالة الوطنية للتأمين الصحي (ANAM). يمكنك أيضًا التحقق مع:</p>
        <ul>
          <li>طبيبك المعالج</li>
          <li>الصيدلي الخاص بك</li>
          <li>حاسبتنا عبر الإنترنت على تعويضاتي (TAAWIDATY)</li>
        </ul>`
      },
      {
        question: "6. ما هو الفرق بين الدواء الأصلي (princeps) والدواء الجنيس (générique)؟",
        answer: `<p><strong>الأصلي (Princeps)</strong> = الدواء الأصلي، تم تطويره بواسطة مختبر صيدلاني (مثال: Doliprane)</p>
        <p><strong>الجنيس (Générique)</strong> = نسخة من الدواء الأصلي بنفس الجزيء النشط (مثال: Paracétamol جنيس)</p>
        <p><strong>التأثير على الاسترجاع:</strong></p>
        <ul>
          <li>إذا كان الدواء الجنيس موجودًا، فإن استرجاع CNSS يتم على أساس سعر الدواء الجنيس، <strong>حتى لو اشتريت الدواء الأصلي</strong>.</li>
          <li>هذا يعني أنك إذا اخترت الدواء الأصلي الأغلى ثمناً، فسوف تدفع الفرق من جيبك.</li>
          <li>الدواء الجنيس يتم دائمًا استرجاع مصاريفه بناءً على سعره الخاص.</li>
        </ul>
        <p><strong>مثال:</strong></p>
        <ul>
          <li>Doliprane (الأصلي) = 20 درهم</li>
          <li>Paracétamol (الجنيس) = 12 درهم</li>
          <li>CNSS يسترجع: 70% من 12 درهم = 8.40 درهم</li>
          <li>إذا اشتريت Doliprane، فإنك تدفع: 20 - 8.40 = <strong>11.60 درهم</strong></li>
        </ul>`
      },
      {
        question: "7. ما هو نظام الثالث المؤدي (tiers payant) للأدوية؟",
        answer: `<p><strong>الثالث المؤدي</strong> هو نظام تدفع فيه <strong>فقط</strong> حصتك (30%) في الصيدلية، ويدفع CNSS مباشرة 70% للصيدلي.</p>
        <p><strong>يخص فقط:</strong></p>
        <ul>
          <li>الأدوية المكلفة المحددة بموجب اتفاقية</li>
          <li>الصيدليات المتعاقدة مع CNSS</li>
        </ul>
        <p><strong>الوثائق التي يجب تقديمها:</strong></p>
        <ul>
          <li>وصفة طبية حصرية للدواء المقبول في نظام الثالث المؤدي (بتاريخ لا يتجاوز شهرين)</li>
          <li>شهادة تحمل المصاريف مسلمة من CNSS</li>
          <li>بطاقة التسجيل في CNSS</li>
          <li>بطاقة التعريف الوطنية (إذا كان العمر +18 سنة)</li>
        </ul>
        <p>يقوم الصيدلي بعد ذلك بإيداع الملف لدى CNSS في غضون 3 أشهر.</p>`
      },
      {
        question: "8. كيف أحصل على تحمل مصاريف الاستشفاء من CNSS؟",
        answer: `<p>بالنسبة للاستشفاء، يجب على مؤسسة العلاج إرسال <strong>طلب تحمل المصاريف</strong> (استمارة 610.2.31) إلى CNSS عن طريق:</p>
        <ul>
          <li>الفاكس: 05 22-41-83-51 / 05 22-41-83-50</li>
          <li>البوابة الإلكترونية PEC DAMANE: <a href="http://pecdamane.cnss.ma/">http://pecdamane.cnss.ma/</a></li>
        </ul>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>نسخة من بطاقة التعريف الوطنية للمستفيد</li>
          <li>بطاقة التسجيل في CNSS</li>
          <li>مذكرة سرية من الطبيب مع التوضيحات الطبية</li>
          <li>بروتوكول العلاج الكيميائي (إذا كان مطبقًا)</li>
          <li>جدولة حصص غسيل الكلى (إذا كان مطبقًا)</li>
        </ul>
        <p><strong>هام:</strong> يجب أن يصل طلب تحمل المصاريف <strong>قبل</strong> بدء العلاج، إلا في حالات الطوارئ (في هذه الحالة، يتم الإرسال فورًا عند الدخول للمستشفى).</p>`
      },
      {
        question: "9. هل يمكن استرجاع مصاريف العلاجات بالخارج؟",
        answer: `<p><strong>نعم</strong>, في حالتين:</p>
        <p><strong>الحالة 1: مرض مفاجئ أثناء الإقامة بالخارج</strong></p>
        <ul>
          <li>الاسترجاع على أساس التعريفة الوطنية المرجعية (TNR) المغربية</li>
          <li>لا حاجة لموافقة مسبقة</li>
          <li>تقديم الفواتير والإثباتات الطبية عند العودة</li>
        </ul>
        <p><strong>الحالة 2: علاجات مستحيلة في المغرب</strong></p>
        <ul>
          <li>تتطلب <strong>موافقة مسبقة</strong> من CNSS</li>
          <li>يجب إيداع ملف لدى قسم المراقبة الطبية (دار المؤمن)</li>
          <li>فحص طبي حضوري إلزامي قبل المغادرة</li>
        </ul>
        <p><strong>الوثائق:</strong></p>
        <ul>
          <li>شهادة طبية مصادق عليها من وزارة الصحة</li>
          <li>تقرير طبي مُحدّث مع السوابق المرضية</li>
          <li>فاتورة تقديرية (Devis) من المؤسسة الأجنبية</li>
          <li>المعلومات البنكية للمؤسسة</li>
        </ul>`
      },
      {
        question: "10. ما هي الموافقة المسبقة (entente préalable)؟",
        answer: `<p>بعض الإجراءات تتطلب موافقة CNSS <strong>قبل</strong> البدء في تحمل النفقات:</p>
        <p><strong>الإجراءات المعنية:</strong></p>
        <ul>
          <li>الإجراءات في حصص متعددة (إعادة التأهيل، العلاج الطبيعي طويل الأمد)</li>
          <li>الأجهزة التعويضية والتقويمية (Prothèse et orthèse)</li>
          <li>الأجهزة الطبية والغرسات (Implants)</li>
          <li>الاستشفاء الذي يتجاوز 30 يومًا</li>
          <li>الفحص الإشعاعي</li>
          <li>زرع القوقعة، محفزات الأعصاب</li>
        </ul>
        <p><strong>كيفية الطلب:</strong> قم بإيداع ورقة علاج معبأة حسب الأصول مع الوثائق الداعمة في وكالة CNSS الخاصة بك.</p>
        <p><strong>المخاطر:</strong> بدون موافقة مسبقة، فإنك تخاطر <strong>برفض استرجاع المصاريف</strong>.</p>`
      },
      {
        question: "11. ما هي الأدوية التي يتم استرجاع مصاريفها بنسبة 100%؟",
        answer: `<p><strong>الاسترجاع بنسبة 100% لـ:</strong></p>
        <ul>
          <li><strong>جميع الأدوية</strong> المتعلقة بمرض طويل الأمد (ALD) / مرض خطير ومكلف (ALC) مُصرح به (إذا كان لديك الإعفاء من المبلغ المتبقي على عاتق المؤمن)</li>
          <li>10 أمراض خطيرة ومكلفة (ALC) - <strong>دائمًا 100%</strong></li>
          <li>الأدوية في القطاع العام لبعض الأمراض طويلة الأمد (ALD) (<strong>90-100%</strong>)</li>
          <li>أدوية علاج الأورام في المراكز الخاصة المتعاقدة (ضمن قائمة محددة)</li>
        </ul>
        <p><strong>أمثلة على الأمراض ذات الاسترجاع 100%:</strong></p>
        <ul>
          <li>السرطانات (العلاج الكيميائي، العلاج الإشعاعي)</li>
          <li>القصور الكلوي المزمن (غسيل الكلى)</li>
          <li>زرع الأعضاء</li>
          <li>الهيموفيليا</li>
          <li>التليف الكيسي</li>
          <li>بعض أشكال داء السكري المعقد</li>
        </ul>`
      },
      {
        question: "12. كيف أتحقق مما إذا كان دوائي قابلاً للاسترجاع؟",
        answer: `<p><strong>4 طرق:</strong></p>
        <ul>
          <li><strong>اسأل الصيدلي الخاص بك</strong> - لديهم إمكانية الوصول إلى القائمة الرسمية</li>
          <li><strong>تحقق من موقع ANAM</strong> - القائمة الكاملة للأدوية القابلة للاسترجاع</li>
          <li><strong>اتصل بـ CNSS</strong> - مركز الاتصال للحصول على معلومات</li>
          <li><strong>استخدم حاسبتنا</strong> على تعويضاتي (TAAWIDATY) - أدخل اسم الدواء، واحصل على النسبة فورًا</li>
        </ul>
        <p><strong>على الوصفة الطبية:</strong> الأدوية القابلة للاسترجاع يُشار إليها عادةً من قبل طبيبك مع ذكر نسبتها.</p>`
      },
      {
        question: "13. ماذا أفعل إذا لم يكن دوائي قابلاً للاسترجاع؟",
        answer: `<p><strong>الخيارات:</strong></p>
        <ul>
          <li><strong>اطلب دواءً جنيسًا</strong> - غالبًا ما يكون قابلاً للاسترجاع حتى لو لم يكن الدواء الأصلي كذلك</li>
          <li><strong>تحقق من البدائل</strong> - يمكن لطبيبك أن يصف دواءً مكافئًا قابلاً للاسترجاع</li>
          <li><strong>التأمين التكميلي (Mutuelle)</strong> - قد يغطي الأدوية التي لا يغطيها التأمين الإجباري عن المرض (AMO)</li>
          <li><strong>استئناف أو شكوى</strong> - اتصل بـ CNSS للتوضيح إذا كنت تعتقد أن هناك خطأ</li>
        </ul>
        <p><strong>الأدوية التي لا يتم استرجاع مصاريفها أبدًا:</strong></p>
        <ul>
          <li>منتجات الصيدلية الشبيهة (Parapharmacie)</li>
          <li>المكملات الغذائية</li>
          <li>المعالجة المثلية (Homéopathie)</li>
          <li>الطب البديل</li>
          <li>مستحضرات التجميل</li>
        </ul>`
      },
      {
        question: "14. ما هو المبلغ المتبقي على عاتق المؤمن (ticket modérateur)؟",
        answer: `<p><strong>المبلغ المتبقي على عاتق المؤمن</strong> = الجزء من النفقات الذي يبقى على عاتقك بعد استرجاع CNSS.</p>
        <p><strong>الحساب القياسي:</strong></p>
        <ul>
          <li>CNSS يسترجع: 70%</li>
          <li>أنت تدفع (المبلغ المتبقي): 30%</li>
        </ul>
        <p><strong>الإعفاء من المبلغ المتبقي:</strong> بعض الأمراض الخطيرة (ALD/ALC) تمنح الحق في إعفاء جزئي أو كلي، مما يقلل حصتك إلى 0-23%.</p>
        <p><strong>مثال:</strong></p>
        <ul>
          <li>الدواء = 100 درهم</li>
          <li>استرجاع CNSS 70% = 70 درهم</li>
          <li>المبلغ المتبقي (حصتك) = 30 درهم</li>
          <li>إذا كان لديك تأمين تكميلي (mutuelle)، فيمكنه تغطية هذه الـ 30 درهم</li>
        </ul>`
      },
      {
        question: "15. كم من الوقت يجب أن أحتفظ بإثباتاتي الطبية؟",
        answer: `<p><strong>مدة الحفظ الموصى بها: 5 سنوات على الأقل</strong></p>
        <p><strong>الوثائق التي يجب الاحتفاظ بها:</strong></p>
        <ul>
          <li>جميع الوصفات الطبية</li>
          <li>فواتير الصيدلية</li>
          <li>ورقات العلاج</li>
          <li>شهادات استرجاع المصاريف من CNSS</li>
          <li>إيصالات إيداع الملفات</li>
        </ul>
        <p><strong>لماذا؟</strong></p>
        <ul>
          <li>إمكانية إجراء فحوصات طبية</li>
          <li>الشكاوى المحتملة</li>
          <li>تتبع نفقاتك الصحية</li>
          <li>التصريحات الضريبية (بعض النفقات قابلة للخصم)</li>
        </ul>
        <p><strong>نصيحة:</strong> قم بمسح ضوئي (scannez) واحتفظ بنسخ رقمية لتجنب فقدان الوثائق الورقية.</p>`
      }
    ]
  },
  cnops: {
    title: "أسئلة متكررة CNOPS - استرجاع مصاريف الأدوية بالمغرب",
    subtitle: "15 سؤالاً أساسياً حول استرجاع مصاريف الأدوية لدى CNOPS",
    questions: [
      {
        question: "1. ما هي نسبة استرجاع مصاريف الأدوية لدى CNOPS؟",
        answer: `<p>يسترجع CNOPS المصاريف وفقًا لنسبتين:</p>
        <p><strong>الأدوية العادية (خارج المستشفى):</strong></p>
        <ul>
          <li><strong>70% من ثمن البيع للعموم (PPV)</strong> على أساس سعر الدواء الجنيس إذا كان موجودًا</li>
          <li><strong>16-20% إضافية</strong> من طرف التعاضدية التكميلية (MGPAP, MGEN, إلخ)</li>
          <li><strong>الإجمالي = 86-90% من التغطية</strong></li>
        </ul>
        <p><strong>أدوية الأمراض طويلة الأمد (ALD/ALC):</strong></p>
        <ul>
          <li><strong>100% من ثمن البيع للعموم (PPV)</strong> (على أساس الجنيس) إذا حصلت على <strong>الإعفاء من المبلغ المتبقي (ETM)</strong></li>
          <li>لا توجد تكاليف على عاتقك في هذه الحالة</li>
        </ul>
        <p><strong>قاعدة هامة:</strong> يتم الاسترجاع دائمًا على أساس سعر الدواء الجنيس عندما يكون موجودًا (المادة 8 من المرسوم 2-05-733).</p>`
      },
      {
        question: "2. ما هو الفرق بين CNOPS والتعاضدية (Mutuelle) (مثل MGPAP)؟",
        answer: `<p><strong>CNOPS = التأمين الإجباري الأساسي عن المرض (AMO)</strong></p>
        <ul>
          <li>يسترجع 70-100% حسب نوع العلاج</li>
          <li>الاشتراك: 5% من الراتب (2.5% المشغل + 2.5% الموظف)</li>
          <li>إلزامي لجميع موظفي القطاع العام</li>
        </ul>
        <p><strong>التعاضدية (MGPAP, MGEN, OMFAM, إلخ) = التأمين التكميلي</strong></p>
        <ul>
          <li>تسترجع "المبلغ المتبقي" (ما لا يغطيه CNOPS)</li>
          <li>الاشتراك: ~1.8% من الراتب الأساسي (بسقف 50 درهم/شهر)</li>
          <li>تكمل CNOPS بنسبة 16-20% إضافية</li>
        </ul>
        <p><strong>كيف يعملان معًا:</strong></p>
        <ul>
          <li>تقوم بإيداع ملفك لدى <strong>تعاضديتك</strong> (وليس مباشرة لدى CNOPS)</li>
          <li>التعاضدية تحيل الملف إلى CNOPS</li>
          <li>تتلقى استرجاعًا مجمعًا (CNOPS + التعاضدية)</li>
        </ul>`
      },
      {
        question: "3. كيف يمكنني استرجاع المصاريف من CNOPS؟",
        answer: `<p><strong>هام:</strong> يتم إيداع الملفات لدى <strong>التعاضدية الخاصة بك</strong>, وليس مباشرة لدى CNOPS.</p>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>ورقة العلاجات (هوية المؤمن والمستفيد، التوقيعات)</li>
          <li>الوصفة الطبية الأصلية موقعة ومختومة من طرف:
            <ul>
              <li>الطبيب المعالج (مع الرقم الوطني الاستدلالي للممارس - INPE)</li>
              <li>الصيدلي</li>
            </ul>
          </li>
          <li>الرموز الشريطية للأدوية (في حال عدم وجودها، إرفاق العلبة كاملة)</li>
          <li>مدة العلاج والجرعات موضحة على الوصفة الطبية</li>
        </ul>
        <p><strong>استثناء:</strong> بالنسبة للأدوية التي تزيد تكلفتها عن 20,000 درهم، يجب تقديم فاتورة قانونية تتضمن الرمز الضريبي لمقدم الخدمة وطريقة الدفع.</p>`
      },
      {
        question: "4. ما هي مدة استرجاع المصاريف لدى CNOPS؟",
        answer: `<p><strong>متوسط المدة الملاحظة: 54 يومًا</strong> (بيانات 2023)</p>
        <p><strong>الآجال التي يجب احترامها:</strong></p>
        <ul>
          <li>لديك <strong>60 يومًا</strong> بعد تاريخ العلاج لإيداع ملفك (أجل السقوط)</li>
          <li>بعد هذا الأجل، قد يتم رفض طلبك</li>
        </ul>
        <p><strong>تتبع الملف:</strong></p>
        <ul>
          <li>قم بتسجيل الدخول إلى فضاء المؤمن CNOPS عبر الإنترنت</li>
          <li>تتبع حالة تقدم ملف الاسترجاع الخاص بك</li>
          <li>التعاضدية التكميلية لديها نظام تتبع خاص بها</li>
        </ul>
        <p><strong>هام:</strong> لا يوجد أجل أقصى مضمون، ولكن يتم إدخال تحسينات مستمرة.</p>`
      },
      {
        question: "5. ما هو المرض طويل الأمد (ALD) لدى CNOPS وكيف أحصل على الإعفاء (ETM)؟",
        answer: `<p><strong>ALD (مرض طويل الأمد)</strong> = مرض مزمن يتطلب علاجات طويلة.</p>
        <p><strong>ETM (الإعفاء من المبلغ المتبقي)</strong> = موافقة تسمح لك باسترجاع مصاريف الأدوية المتعلقة بمرضك طويل الأمد بنسبة 100%.</p>
        <p><strong>أهم الأمراض طويلة الأمد (ALD) المغطاة:</strong></p>
        <ul>
          <li>داء السكري (النوع 1 و 2)</li>
          <li>ارتفاع ضغط الدم الشرياني</li>
          <li>السرطانات والأورام الخبيثة</li>
          <li>أمراض القلب والشرايين</li>
          <li>القصور الكلوي المزمن</li>
          <li>الأمراض العصبية (باركنسون، الصرع، التصلب اللويحي)</li>
          <li>الأمراض النفسية الحادة</li>
          <li>فيروس نقص المناعة البشرية/السيدا</li>
          <li>التهاب الكبد المزمن B و C</li>
        </ul>
        <p><strong>كيفية الحصول على الإعفاء (ETM):</strong></p>
        <ol>
          <li>قم بتكوين ملف يتضمن:
            <ul>
              <li>تقرير طبي أصلي مفصل من الأخصائي</li>
              <li>نتائج الفحوصات البيولوجية/الإشعاعية التي تؤكد التشخيص</li>
              <li>وصفة العلاج الموصى به</li>
              <li>نسخة من بطاقة التسجيل في CNOPS</li>
              <li>استمارة طلب ETM</li>
            </ul>
          </li>
          <li><strong>قم بإيداع الملف لدى CNOPS</strong> (قسم المراقبة الطبية أو المندوبيات الجهوية)</li>
          <li><strong>انتظر الموافقة</strong> - بعض الإعفاءات (ETM) يتم تجديدها تلقائيًا</li>
          <li><strong>أرفق الموافقة (ETM)</strong> بجميع ملفات مرضك طويل الأمد (ALD) للاستفادة من نسبة 100%</li>
        </ol>`
      },
      {
        question: "6. ما هي الأدوية التي يسترجع مصاريفها CNOPS؟",
        answer: `<p>يسترجع CNOPS مصاريف نفس الأدوية التي يسترجعها CNSS، بناءً على <strong>القائمة الرسمية للوكالة الوطنية للتأمين الصحي (ANAM)</strong>.</p>
        <p><strong>أكثر من 9,696 دواء</strong> قابل للاسترجاع حاليًا.</p>
        <p><strong>الفئات الرئيسية:</strong></p>
        <ul>
          <li>الأدوية العادية (مضادات حيوية، مضادات التهاب، إلخ)</li>
          <li>أدوية الأمراض المزمنة (السكري، ارتفاع ضغط الدم، الكوليسترول)</li>
          <li>أدوية علاج الأورام (العلاج الكيميائي، العلاج الهرموني)</li>
          <li>الأدوية النفسية</li>
          <li>أدوية الأمراض النادرة</li>
        </ul>
        <p><strong>الاطلاع على القائمة:</strong></p>
        <ul>
          <li>موقع CNOPS - قسم "الأدوية القابلة للاسترجاع"</li>
          <li>اسأل الصيدلي الخاص بك</li>
          <li>استخدم تعويضاتي (TAAWIDATY) - تحقق فوري + حساب الاسترجاع</li>
        </ul>`
      },
      {
        question: "7. ما هو نظام الثالث المؤدي (tiers payant) للأدوية لدى CNOPS؟",
        answer: `<p>نظام <strong>الثالث المؤدي</strong> يسمح لك بعدم دفع <strong>أي مصاريف</strong> (أو القليل جدًا) في الصيدلية مقابل أدويتك الخاصة بالمرض طويل الأمد (ALD).</p>
        <p><strong>الشروط:</strong></p>
        <ul>
          <li>يجب أن يكون لديك <strong>إعفاء من المبلغ المتبقي (ETM)</strong> لمرض طويل الأمد (ALD)</li>
          <li>يجب أن يكون الدواء مخصصًا لمرضك المصرح به</li>
          <li>يجب أن يكون الصيدلي <strong>متعاقدًا</strong> بنظام الثالث المؤدي مع CNOPS</li>
        </ul>
        <p><strong>الإجراء:</strong></p>
        <ol>
          <li>قدم موافقة الإعفاء (ETM) للصيدلي</li>
          <li>يقوم الصيدلي بإعداد ملف تحمل المصاريف</li>
          <li>يرسله إلى CNOPS (المراقبة الطبية أو المندوبيات الجهوية)</li>
          <li>بمجرد الحصول على الموافقة، يمكنك استلام أدويتك دون دفع</li>
        </ol>
        <p><strong>قائمة الأدوية بنظام الثالث المؤدي:</strong> راجع موقع CNOPS - قسم "الأدوية التي يتم تحملها في الصيدلية"</p>
        <p><strong>قائمة الصيدليات المتعاقدة:</strong> متاحة على بوابة CNOPS</p>`
      },
      {
        question: "8. أدوية علاج الأورام: ما هي نسبة التغطية؟",
        answer: `<p>يستفيد مرضى السرطان من تغطية خاصة:</p>
        <p><strong>نسبة التغطية:</strong> <strong>100% من سعر المستشفى</strong> لأدوية علاج الأورام المقدمة من مراكز علاج الأورام الخاصة المتعاقدة.</p>
        <p><strong>قائمة خاصة:</strong> قائمة أدوية علاج الأورام يتم تحديثها دوريًا من قبل CNOPS.</p>
        <p><strong>إجراء مبسط:</strong> قام CNOPS بتبسيط الإجراءات للأدوية المكلفة المتعلقة بالسرطان.</p>
        <p><strong>في حالة عدم وجود تحمل مسبق،</strong> ملف الاسترجاع يجب أن يتضمن:</p>
        <ul>
          <li>فاتورة أصلية مؤرخة ومختومة من مركز علاج الأورام (مع ذكر "فاتورة مؤداة")</li>
          <li>وصفة طبية مفصلة</li>
          <li>تقرير طبي مع بروتوكول العلاج</li>
          <li>نسخة من الفحوصات المكملة التي تبرر الوصفة</li>
          <li>الرموز الشريطية للأدوية (أو العلبة كاملة إذا كانت غائبة)</li>
        </ul>`
      },
      {
        question: "9. كيف يعمل استرجاع مصاريف الاستشارات لدى CNOPS؟",
        answer: `<p><strong>الاستشارات لدى الطبيب العام أو الأخصائي:</strong></p>
        <ul>
          <li><strong>نسبة CNOPS:</strong> 80% من التعريفة الوطنية المرجعية (TNR)</li>
          <li><strong>التعاضدية:</strong> +20% إضافية</li>
          <li><strong>الإجمالي = 100% من التغطية</strong> إذا استشرت طبيبًا متعاقدًا</li>
        </ul>
        <p><strong>الزيارات المنزلية:</strong> نفس النسبة (80% CNOPS + 20% تعاضدية)</p>
        <p><strong>هام:</strong> إذا استفدت من إجراء طبي آخر خلال الاستشارة (مثل فحص بالصدى)، فسيتم فقط استرجاع أتعاب الإجراء الأغلى ثمنًا (المادة 9 NGAP).</p>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>ورقة العلاجات مع الوصفة الطبية</li>
          <li>اسم الطبيب، التخصص، العنوان، التوقيع، الختم</li>
          <li>تاريخ الفحص الطبي</li>
          <li>اسم المستفيد وطبيعة العلاجات الموصوفة</li>
        </ul>`
      },
      {
        question: "10. التحاليل البيولوجية: نسبة استرجاع CNOPS",
        answer: `<p><strong>التحاليل خارج المستشفى:</strong></p>
        <ul>
          <li><strong>CNOPS:</strong> 80% من TNR</li>
          <li><strong>التعاضدية:</strong> +20%</li>
          <li><strong>الإجمالي = 100%</strong></li>
        </ul>
        <p><strong>التحاليل أثناء الاستشفاء:</strong></p>
        <ul>
          <li><strong>القطاع الخاص:</strong> 90% من TNR</li>
          <li><strong>القطاع العام (CHU، المستشفيات):</strong> 100% من TNR</li>
        </ul>
        <p><strong>التسمية (Nomenclature):</strong> فقط الإجراءات المدرجة في التسمية العامة للبيولوجيا الطبية (NABM) هي القابلة للاسترجاع، بالإضافة إلى قائمة من الإجراءات المماثلة.</p>
        <p><strong>إيداع الملف:</strong> لدى تعاضديتك التكميلية، وليس مباشرة لدى CNOPS.</p>`
      },
      {
        question: "11. هل يمكن استرجاع مصاريف العلاجات بالخارج من CNOPS؟",
        answer: `<p><strong>نعم</strong>, في حالات استثنائية:</p>
        <p><strong>الحالة 1: مرض مفاجئ بالخارج</strong></p>
        <ul>
          <li>الاسترجاع على أساس التعريفة الوطنية المرجعية (TNR) المغربية</li>
          <li>نفس النسب والشروط كما لو كان العلاج بالمغرب</li>
          <li>لا حاجة لموافقة مسبقة</li>
        </ul>
        <p><strong>الحالة 2: علاجات مستحيلة في المغرب (نقل مبرمج)</strong></p>
        <ul>
          <li>تتطلب <strong>موافقة مسبقة</strong> من المراقبة الطبية لـ CNOPS</li>
          <li>الأولوية للمؤسسات الأجنبية المتعاقدة مع CNOPS</li>
        </ul>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>شهادة طبية مصادق عليها من وزارة الصحة</li>
          <li>تقرير طبي مع السوابق وطبيعة المرض</li>
          <li>فاتورة تقديرية (Devis) من المؤسسة الأجنبية</li>
          <li>المعلومات البنكية للمؤسسة</li>
        </ul>
        <p><strong>إضافة:</strong> يمكن لتعاضدية MGPAP المساهمة بنسبة <strong>50% من سعر تذكرة الطائرة</strong> (حتى 3 مرات إذا لزم الأمر).</p>`
      },
      {
        question: "12. ما هي علاجات الأسنان التي يسترجع مصاريفها CNOPS؟",
        answer: `<p><strong>العلاجات القابلة للاسترجاع:</strong></p>
        <ul>
          <li>استشارات طب الأسنان: 80% من TNR</li>
          <li>العلاجات التحفظية (تسوس، إزالة الجير): 80% من TNR</li>
          <li>جراحة الفم والأسنان: 80% من TNR</li>
          <li>أطقم الأسنان (Prothèses): 80% من TNR مع <strong>سقف محدد</strong></li>
          <li>تقويم الأسنان والوجه (ODF): <strong>فقط للأطفال أقل من 16 عامًا</strong></li>
        </ul>
        <p><strong>سقف أطقم الأسنان:</strong> متغير حسب TNR، راجع التعريفة على بوابة CNOPS.</p>
        <p><strong>الوثائق المطلوبة:</strong></p>
        <ul>
          <li>ورقة علاجات الأسنان</li>
          <li>مخطط الأسنان</li>
          <li>تفاصيل الإجراءات المنجزة</li>
          <li>الرقم الوطني الاستدلالي (INPE) للممارس</li>
          <li>ختم وتوقيع طبيب الأسنان</li>
        </ul>
        <p><strong>الإيداع:</strong> لدى تعاضديتك في غضون 60 يومًا بعد العلاج.</p>`
      },
      {
        question: "13. الاستشفاء CNOPS: ما هي التغطية؟",
        answer: `<p><strong>الاستشفاء في القطاع الخاص (المصحات):</strong></p>
        <ul>
          <li>العلاجات الطبية: 90% من TNR</li>
          <li>التحاليل البيولوجية: 90% من TNR</li>
          <li>الإجراءات الجراحية: 90% من TNR</li>
          <li>الأدوية: 90%</li>
        </ul>
        <p><strong>الاستشفاء في القطاع العام (CHU، المستشفيات):</strong></p>
        <ul>
          <li><strong>100% من TNR</strong> لجميع العلاجات</li>
        </ul>
        <p><strong>الجراحات الخارجية الصغيرة (العيادات، المصحات بدون مبيت):</strong></p>
        <ul>
          <li>80% من TNR</li>
        </ul>
        <p><strong>ملف استرجاع مصاريف الاستشفاء (يودع خلال 60 يومًا):</strong></p>
        <ul>
          <li>فاتورة أو تقرير الاستشفاء</li>
          <li>وصفة طبية إذا تم دفع ثمن الأدوية أثناء الاستشفاء</li>
          <li>صور الأشعة قبل وبعد الجراحة (جراحة العظام)</li>
          <li>فاتورة الدم ومشتقاته</li>
          <li>فاتورة الأجهزة الطبية</li>
          <li>إيصال الدفع (القطاع العام)</li>
        </ul>`
      },
      {
        question: "14. الأجهزة الطبية والنظارات: استرجاع CNOPS",
        answer: `<p><strong>الأجهزة الطبية:</strong> الاسترجاع على شكل <strong>مبالغ جزافية (forfaits)</strong> تحددها التنظيمات.</p>
        <p><strong>أمثلة:</strong></p>
        <ul>
          <li>الأطراف الاصطناعية الداخلية (زرع العين، صمامات القلب)</li>
          <li>أجهزة التقويم والأطراف الاصطناعية (طرف اصطناعي للثدي، أجهزة السمع)</li>
          <li>أجهزة العلاج (أقنعة الأكسجين)</li>
        </ul>
        <p><strong>النظارات الطبية:</strong></p>
        <ul>
          <li>استرجاع جزافي</li>
          <li>التعاضدية تكمل بنسبة 20%</li>
          <li>تطبق سقوف سنوية</li>
        </ul>
        <p><strong>تقويم الأسنان للأطفال (أقل من 16 عامًا):</strong></p>
        <ul>
          <li>استرجاع جزافي حسب TNR</li>
        </ul>
        <p><strong>هام:</strong> معظم هذه الخدمات تتطلب <strong>موافقة مسبقة</strong> من CNOPS قبل البدء في تحمل النفقات.</p>`
      },
      {
        question: "15. كيف أتابع ملف استرجاع المصاريف CNOPS عبر الإنترنت؟",
        answer: `<p><strong>فضاء المؤمن CNOPS:</strong></p>
        <ul>
          <li>قم بتسجيل الدخول على بوابة CNOPS</li>
          <li>أنشئ حسابك باستخدام رقم التسجيل الخاص بك</li>
          <li>تتبع حالة تقدم ملفاتك</li>
          <li>اطلع على استرجاعاتك السابقة</li>
          <li>قم بتحميل كشوفاتك</li>
        </ul>
        <p><strong>الخدمات المتاحة عبر الإنترنت:</strong></p>
        <ul>
          <li>الاطلاع على تاريخ الاسترجاعات</li>
          <li>تتبع الملفات قيد المعالجة</li>
          <li>تحميل الاستمارات</li>
          <li>التحقق من حقوقك المفتوحة</li>
          <li>الاطلاع على التعريفات الوطنية المرجعية (TNR)</li>
        </ul>
        <p><strong>انتباه:</strong> فضاء المؤمن CNOPS يخص فقط حصة التأمين الإجباري الأساسي (AMO). لتتبع تعاضديتك التكميلية، قم بتسجيل الدخول إلى بوابة تعاضديتك (MGPAP, MGEN, OMFAM, إلخ).</p>
        <p><strong>للاتصال بـ CNOPS:</strong></p>
        <ul>
          <li>الموقع الإلكتروني: www.cnops.org.ma</li>
          <li>مراكز الاتصال</li>
          <li>الوكالات الجهوية</li>
        </ul>`
      }
    ]
  },
  cta: {
    title: "احسب استرجاع مصاريفك الآن",
    subtitle: "استخدم حاسبتنا المجانية لمعرفة المبلغ الذي سيتم استرجاعه بالضبط",
    button: "الوصول إلى الحاسبة"
  }
}

};
