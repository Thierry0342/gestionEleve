
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './style.css';

const ModalModificationEleve = ({ show, onClose, eleve, onChange, onSave }) => {
  //initie donne
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (eleve) {
      setFormData(eleve);
    }
  }, [eleve]);
 
 // console.log(eleve.peloton)
 const [showFamille, setShowFamille] = useState(false); // Etat pour afficher/masquer la section famille
 
  


  // Fonction pour mettre à jour les valeurs de téléphone
  const handlePhoneChange = (e, phoneKey) => {
    const newValue = e.target.value.replace(/\D/g, '').slice(0, 11); // Autorise seulement les chiffres, max 11 caractères
    onChange({
      ...eleve,
      eleveTelephone: {
        ...eleve.eleveTelephone,
        [phoneKey]: newValue
      }
    });
    
  };
  const ajouterEnfant = () => {
    setFormData((prev) => ({
      ...prev,
      famille: {
        ...prev.famille,
        enfants: [...prev.famille.enfants, { nom: '', prenom: '', dateNaissance: '', sexe: '' }],
      },
    }));
  };
  //suprime formulaire efant 
  const supprimerEnfant = (index) => {
    setFormData((prevState) => {
      const enfants = [...prevState.famille.enfants];
      enfants.splice(index, 1); // Supprime l'enfant à l'index donné

      return {
        ...prevState,
        famille: {
          ...prevState.famille,
          enfants,
        },
      };
    });
  };
  // fomulaire soeur et frere
  // Fonction pour ajouter un frère
  const ajouterFrere = () => {
    setFormData((prev) => ({
      ...prev,
      famille: {
        ...prev.famille,
        frere: [...prev.famille.frere, { nom: '', }],
      },
    }));
  };
  //suprim

  // Fonction pour ajouter une soeur
  const ajouterSoeur = () => {
    setFormData((prev) => ({
      ...prev,
      famille: {
        ...prev.famille,
        soeur: [...prev.famille.soeur, { nom: '' }],
      },
    }));
  };
  //suprim
  // Fonction pour supprimer un frère
  const supprimerFrere = (index) => {
    setFormData((prevState) => {
      const frere = [...prevState.famille.frere];
      frere.splice(index, 1); // Supprime l'enfant à l'index donné

      return {
        ...prevState,
        famille: {
          ...prevState.famille,
          frere,
        },
      };
    });
  };
  // Fonction pour supprimer une soeur
  const supprimerSoeur = (index) => {
    setFormData((prevState) => {
      const soeur = [...prevState.famille.soeur];
      soeur.splice(index, 1); // Supprime l'enfant à l'index donné

      return {
        ...prevState,
        famille: {
          ...prevState.famille,
          soeur,
        },
      };
    });
  };

  const handleChange = (e, index = null) => {
    if (!e?.target) return;
  
    const { name, value, type, checked } = e.target;
  
    if (name.startsWith('famille.enfants')) {
      const field = name.split('.')[2];
      const newEnfants = [...formData.famille.enfants];
      newEnfants[index][field] = value;
  
      setFormData(prev => ({
        ...prev,
        famille: {
          ...prev.famille,
          enfants: newEnfants,
        },
      }));
    } else if (name.startsWith('famille.soeur')) {
      const field = name.split('.')[2];
      const newSoeur = [...formData.famille.soeur];
      newSoeur[index][field] = value;
  
      setFormData(prev => ({
        ...prev,
        famille: {
          ...prev.famille,
          soeur: newSoeur,
        },
      }));
    } else if (name.startsWith('famille.frere')) {
      const field = name.split('.')[2];
      const newFrere = [...formData.famille.frere];
      newFrere[index][field] = value;
  
      setFormData(prev => ({
        ...prev,
        famille: {
          ...prev.famille,
          frere: newFrere,
        },
      }));
    } else if (name.startsWith('famille.')) {
      const path = name.split('.');
      setFormData(prev => ({
        ...prev,
        famille: {
          ...prev.famille,
          [path[1]]: {
            ...prev.famille[path[1]],
            [path[2]]: value,
          },
        },
      }));
    }
  
    // 🔹 Téléphones
    else if (name.startsWith('eleveTelephone.')) {
      const phoneKey = name.split('.')[1];
      const onlyDigits = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({
        ...prev,
        eleveTelephone: {
          ...prev.eleveTelephone,
          [phoneKey]: onlyDigits,
        },
      }));
    }
  
    // 🔹 Checkbox (par exemple etatCivil)
    else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  
    // 🔹 Conversion peloton en nombre
    else if (name === 'peloton' || name === 'escadron') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value),
      }));
    }
  
    // 🔹 Champs simples (nom, prenom, etc.)
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
   // Fonction pour basculer l'affichage de la section famille
   const toggleFamille = () => {
    setShowFamille(!showFamille);
  };
  


  return (
    <Modal show={show} onHide={onClose} size="xl" dialogClassName="large-modal" >
      <Modal.Header closeButton>
        <Modal.Title>Modifier les informations de l'élève</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          <div className="row">
            {/* Colonne gauche : formulaire principal */}
            <div className="col-md-5">
              <div className="card shadow-lg border rounded p-3">
                {/* Ligne 1 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" name="numCandidature" placeholder="Numéro de candidature" value={eleve.numCandidature} onChange={onChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="numIncorporation" placeholder="Numéro d'incorporation" value={eleve.numIncorporation} onChange={onChange} />
                  </div>
                </div>

                {/* Ligne 2 */}
                <div className="row mb-3">
                  <div className="col">
                    <select className="form-select" name="escadron" value={formData.escadron} onChange={handleChange}>
                      <option value="">Sélectionner un escadron</option>
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col">
                  <select
                   className="form-select"
                   name="peloton"
                   value={eleve.peloton ?? ''}
                   onChange={handleChange}
                  >
                  <option value="">Peloton</option>
                   {[1, 2, 3].map(i => (
                  <option key={i} value={String(i)}>{i}</option>
                   ))}
                   </select>

              </div>
                </div>

                {/* Ligne 3 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" name="centreConcours" placeholder="Centre de concours" value={eleve.centreConcours} onChange={onChange} />
                  </div>
                  <div className="col">
                    <select className="form-select" name="genreConcours" value={eleve.genreConcours} onChange={onChange}>
                      <option value="">Choisir le genre de concours</option>
                      <option value="ordinaire">Ordinaire</option>
                      <option value="veuve">Veuve</option>
                      <option value="orphelin">Orphelin</option>
                      <option value="ex-militaire">Ex-militaire</option>
                      <option value="specialiste">Spécialiste</option>
                    </select>
                  </div>
                </div>

                {/* Si spécialiste, afficher les choix */}
                {eleve.genreConcours === 'specialiste' && (
                  <div className="mb-3">
                    <label className="form-label">Spécialité :</label>
                    {['informatique', 'sport', 'infirmier'].map(speciality => (
                      <div className="form-check" key={speciality}>
                        <input className="form-check-input" type="radio" name="specialite" value={speciality} checked={eleve.specialite === speciality} onChange={onChange} />
                        <label className="form-check-label">{speciality.charAt(0).toUpperCase() + speciality.slice(1)}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Ligne 4 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" name="nom" placeholder="Nom" value={eleve.nom} onChange={onChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="prenom" placeholder="Prénom" value={eleve.prenom} onChange={onChange} />
                  </div>
                </div>

                {/* Ligne 5 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="date" className="form-control" name="dateNaissance" value={eleve.dateNaissance} onChange={onChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="lieuNaissance" placeholder="Lieu de naissance" value={eleve.lieuNaissance} onChange={onChange} />
                  </div>
                </div>

                {/* Ligne 6 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" name="cin" placeholder="Numéro CIN" value={eleve.cin} onChange={onChange} />
                  </div>
                  <div className="col">
                    <input type="date" className="form-control" name="dateDelivrance" value={eleve.dateDelivrance} onChange={onChange} />
                  </div>
                </div>

                {/* Ligne 7 */}
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" className="form-control" name="lieuDelivrance" placeholder="Lieu de délivrance" value={eleve.lieuDelivrance} onChange={onChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" name="duplicata" placeholder="Duplicata (si applicable)" value={eleve.duplicata} onChange={onChange} />
                  </div>
                </div>

                {/* Situation de famille */}
                <div className="mb-3">
                  <label className="form-label">Situation de famille:</label>
                  {['Celibataire', 'Marie', 'Divorce'].map(status => (
                    <div className="form-check" key={status}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="etatCivil"
                        value={status}
                        checked={eleve.etatCivil === status}
                        onChange={() => onChange({
                          target: {
                            name: 'etatCivil',
                            value: status
                          }
                        })}
                      />
                      <label className="form-check-label">{status}</label>
                    </div>
                  ))}
                </div>

                {/* Téléphone */}
                <div className="d-flex gap-3 mb-3">
                  {['telephone1', 'telephone2', 'telephone3'].map((phoneKey, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control"
                      placeholder={`Téléphone ${index + 1}`}
                      maxLength="11"
                      value={eleve.eleveTelephone[phoneKey]}
                      onChange={(e) => handlePhoneChange(e, phoneKey)}
                    />
                  ))}
                </div>

                <div className="col">
                  <input type="text" className="form-control" name="facebook" placeholder="facebook" value={eleve.facebook} onChange={onChange} />
                </div>
              </div>
            </div>
            {/* card milie commence ici*/ }
            <div className="col-md-5">
  <div className="card shadow-lg border rounded p-3">
    <h5 className="card-title mb-3">Informations supplémentaires</h5>

    {/* Spécialité ou aptitude */}
    <div className="mb-3">
      <label className="form-label">Spécialité ou aptitude particulière</label>
      <input
        type="text"
        className="form-control"
        name="SpecialisteAptitude"
        value={formData.SpecialisteAptitude}
        onChange={handleChange}
      />
    </div>

    {/* Sports pratiqués (checkbox) */}
    <div className="mb-3">
  <label className="form-label">Sport(s) pratiqué(s)</label>
  <div className="d-flex flex-wrap gap-3">
    {["Football", "Basketball", "Volley-ball", "Athlétisme", "Tennis", "Autre"].map((sport) => (
      <div className="form-check form-check-inline" key={sport}>
        <input
          className="form-check-input"
          type="checkbox"
          name="sports"
          value={sport}
          checked={formData.sports?.includes(sport)}
          onChange={(e) => {
            const checked = e.target.checked;
            const value = e.target.value;
            setFormData((prev) => {
              const sports = new Set(prev.sports || []);
              checked ? sports.add(value) : sports.delete(value);
              return { ...prev, sports: Array.from(sports) };
            });
          }}
        />
        <label className="form-check-label">{sport}</label>
      </div>
    ))}
  </div>
</div>


    {/* Religion (radio) */}
    <div className="mb-3">
      <label className="form-label">Religion</label>
      <div className="d-flex flex-wrap gap-3">
      {["EKAR", "FJKM", "FLM", "Islam", "Autre"].map((religion) => (
        <div className="form-check form-check-inline" key={religion}>
          <input
            className="form-check-input"
            type="radio"
            name="religion"
            value={religion}
            checked={formData.religion === religion}
            onChange={handleChange}
          />
          <label className="form-check-label">{religion}</label>
        </div>
      ))}
    </div>
    </div>
      {/* groupe saguin */}

    <div className="mb-3">
  <label className="form-label">Groupe sanguin</label>
  <div className="d-flex flex-wrap gap-3">
    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((groupeSanguin) => (
      <div className="form-check form-check-inline" key={groupeSanguin}>
        <input
          className="form-check-input"
          type="radio"
          name="groupeSanguin"
          value={groupeSanguin}
          checked={formData.groupeSanguin === groupeSanguin}
          onChange={handleChange}
        />
        <label className="form-check-label">{groupeSanguin}</label>
      </div>
    ))}
  </div>
</div>

    {/* Niveau d’étude */}
    <div className="mb-3">
      <label className="form-label">Dernière classe suivie</label>
      <input
        type="text"
        className="form-control"
        name="niveauEtude"
        value={formData.niveauEtude}
        onChange={handleChange}
      />
    </div>

 {/* Diplômes obtenus (checkbox) */}
<div className="mb-3">
  <label className="form-label">Diplômes obtenus</label>
  <div className="d-flex flex-wrap gap-3">
    {["CEPE", "BEPC", "BACC S", "BACC L", "Licence", "Master One", "Master Two", "Doctorat"].map((diplome) => (
      <div className="form-check" key={diplome}>
        <input
          className="form-check-input"
          type="checkbox"
          name="diplomes"
          value={diplome}
          checked={formData.diplomes?.includes(diplome)}
          onChange={(e) => {
            const checked = e.target.checked;
            const value = e.target.value;
            setFormData((prev) => {
              const diplomes = new Set(prev.diplomes || []);
              checked ? diplomes.add(value) : diplomes.delete(value);
              return { ...prev, diplomes: Array.from(diplomes) };
            });
          }}
        />
        <label className="form-check-label">{diplome}</label>
      </div>
    ))}
  </div>
</div>

{/* Champs de filière selon le diplôme */}
{["Licence", "Master One", "Master Two", "Doctorat"].map((niveau) =>
  formData.diplomes?.includes(niveau) && (
    <div className="mb-3" key={niveau}>
      <label className="form-label">
        Filière pour {niveau}
      </label>
      <input
        type="text"
        className="form-control"
        name={`filiere${niveau.replace(/\s/g, '')}`} // ex: filiereMasterOne
        value={formData[`filiere${niveau.replace(/\s/g, '')}`] || ""}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            [`filiere${niveau.replace(/\s/g, '')}`]: e.target.value,
          }))
        }
      />
    </div>
    
  )
)}

<div className="mb-3">
  <label className="form-label">Relation(s) gênante(s)</label>
  <textarea
    className="form-control"
    name="relationsGenantes"
    rows="3"
    placeholder="Toerana tsy tokony hiasana ."
    value={formData.relationsGenantes}
    onChange={handleChange}
  ></textarea>
    </div>
  </div>
</div> 
                 {/* section droite*/}

<div className="col-md-2">
  <div className="card shadow-lg border rounded p-3">
    <h6 className="mb-3 text-center">POINTURE EFFETS</h6>

    {/* Chemise / T-shirt */}
    <div className="mb-3">
      <label className="form-label">Chemise / T-shirt</label>
      <select
        className="form-select"
        name="tailleChemise"
        value={formData.tailleChemise}
        onChange={handleChange}
      >
        <option value="">Choisir la taille</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div>

    {/* Tour de tête */}
    <div className="mb-3">
      <label className="form-label">Tour de tête (cm)</label>
      <input
        type="number"
        className="form-control"
        name="tourTete"
        value={formData.tourTete}
        onChange={handleChange}
        min="28"
        max="60"
        placeholder="Ex: 40"
      />
    </div>

    {/* Pantalon */}
    <div className="mb-3">
      <label className="form-label">Pointure pantalon</label>
      <select
        className="form-select"
        name="pointurePantalon"
        value={formData.pointurePantalon}
        onChange={handleChange}
      >
        <option value="">Choisir</option>
        {[28,30,34, 36, 38, 40, 42, 44, 46, 48, 50].map((taille) => (
          <option key={taille} value={taille}>{taille}</option>
        ))}
      </select>
    </div>

    {/* Chaussure */}
    <div className="mb-3">
      <label className="form-label">Pointure chaussure</label>
      <select
        className="form-select"
        name="pointureChaussure"
        value={formData.pointureChaussure}
        onChange={handleChange}
      >
        <option value="">Choisir</option>
        {[30,34,36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,47,48,49,50].map((taille) => (
          <option key={taille} value={taille}>{taille}</option>
        ))}
      </select>
    </div>
  </div>
</div>




            {/*car milieu termine ici  */}
              {/* Bouton pour afficher/masquer la section famille */}
        <div className="text-center mb-3">
          <button type="button" className="btn btn-secondary" onClick={toggleFamille}>
            {showFamille ? 'Masquer' : 'Afficher'} les Informations Famille
          </button>
        </div>

        {/* Informations de la Famille */}
        {showFamille && (
          <div className="mt-4 border p-5">
            <h4>INFORMATION SUR LES MEMBRES DE FAMILLE</h4>

            {/* Conjointe */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Nom et Prénom Conjointe</label>
                <input
                  type="text"
                  name="famille.conjointe.nom"
                  className="form-control"
                  value={formData.famille.conjointe.nom}
                  onChange={handleChange}
                  placeholder="Nom et Prénom de la conjointe"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Téléphone</label>
                <input
                  type="text"
                  name="famille.conjointe.phone"
                  className="form-control"
                  value={formData.famille.conjointe.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  name="famille.conjointe.adresse"
                  className="form-control"
                  value={formData.famille.conjointe.adresse}
                  onChange={handleChange}
                  placeholder="Adresse"
                />
              </div>
            </div>


            {/* Père */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Nom et Prénom pére</label>
                <input
                  type="text"
                  name="famille.pere.nom"
                  className="form-control"
                  value={formData.famille.pere.nom}
                  onChange={handleChange}
                  placeholder="Nom et Prénom pére"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Téléphone</label>
                <input
                  type="text"
                  name="famille.pere.phone"
                  className="form-control"
                  value={formData.famille.pere.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  name="famille.pere.adresse"
                  className="form-control"
                  value={formData.famille.pere.adresse}
                  onChange={handleChange}
                  placeholder="Adresse"
                />
              </div>
            </div>


            {/* Mère */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Nom et Prénom mére</label>
                <input
                  type="text"
                  name="famille.mere.nom"
                  className="form-control"
                  value={formData.famille.mere.nom}
                  onChange={handleChange}
                  placeholder="Nom et Prénom mere"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Téléphone</label>
                <input
                  type="text"
                  name="famille.mere.phone"
                  className="form-control"
                  value={formData.famille.mere.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  name="famille.mere.adresse"
                  className="form-control"
                  value={formData.famille.mere.adresse}
                  onChange={handleChange}
                  placeholder="Adresse"
                />
              </div>
            </div>
            {formData.famille.enfants.map((enfant, index) => (
              <div key={index} className="row mb-5 align-items-end">
                <div className="col-md-3">
                  <label className="form-label">Nom enfant {index + 1}</label>
                  <input
                    type="text"
                    name="famille.enfants.nom"
                    className="form-control"
                    value={enfant.nom}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Nom"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Date de naissance</label>
                  <input
                    type="date"
                    name="famille.enfants.dateNaissance"
                    className="form-control"
                    value={enfant.dateNaissance}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Sexe</label>
                  <select
                    name="famille.enfants.sexe"
                    className="form-select"
                    value={enfant.sexe}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Sélectionner</option>
                    <option value="masculin">Masculin</option>
                    <option value="féminin">Féminin</option>
                  </select>
                </div>
                <div className="col-md-3 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-danger mt-4"
                    onClick={() => supprimerEnfant(index)}
                    title="Supprimer cet enfant"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {/* btn ajout formulaire enfant*/}
            <button type="button" className="btn btn-primary mb-3" onClick={ajouterEnfant}>
              ENFANT
            </button>

            <div className="row mb-4">
              {/* Formulaire Frère */}
              {formData.famille.frere.map((frere, index) => (
                <div key={index} className="col-md-6">
                  <label className="form-label">Nom Frère {index + 1}</label>
                  <input
                    type="text"
                    name={`famille.frere[${index}].nom`}
                    className="form-control"
                    value={frere.nom}
                    onChange={(e) => handleChange(e, index, "frere")}
                    placeholder="Nom du frère"
                  />
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-2"
                      onClick={() => supprimerFrere(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary mt-4"
                onClick={ajouterFrere}
              >
                FORMULAIRE FRERE
              </button>

              {/* Formulaire Soeur */}
              {formData.famille.soeur.map((soeur, index) => (
                <div key={index} className="col-md-6">
                  <label className="form-label">Nom Soeur {index + 1}</label>
                  <input
                    type="text"
                    name={`famille.soeur[${index}].nom`}
                    className="form-control"
                    value={soeur.nom}
                    onChange={(e) => handleChange(e, index, "soeur")}
                    placeholder="Nom du soeur"
                  />
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-2"
                      onClick={() => supprimerSoeur(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary mt-3"
                onClick={ajouterSoeur}
              >
                FORMULAIRE SOEUR
              </button>
            </div>


          </div>



        )}

          </div>
          {/*fin car */}
          

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button variant="primary" onClick={onSave}>Enregistrer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalModificationEleve;
