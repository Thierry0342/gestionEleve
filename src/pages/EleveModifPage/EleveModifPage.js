import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ModalModificationEleve = ({ show, onClose, eleve, onChange, onSave }) => {

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

  return (
    <Modal show={show} onHide={onClose} size="xl">
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
                    <select className="form-select" name="escadron" value={eleve.escadron} onChange={onChange}>
                      <option value="">Sélectionner un escadron</option>
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <select className="form-select" name="peloton" value={eleve.peloton} onChange={onChange}>
                      <option value="">Peloton</option>
                      {[1, 2, 3].map(i => (
                        <option key={i} value={i}>{i}</option>
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
                        onChange={() => onChange({ ...eleve, etatCivil: status })}
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
          </div>

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
