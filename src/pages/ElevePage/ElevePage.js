import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import eleveService from '../../services/eleveService';

const ElevePage = () => {
  const [formData, setFormData] = useState({
    numCandidature: '',
    numIncorporation: '',
    escadron: '',
    peloton: '',
    centreConcours: '',
    genreConcours: '',
    specialite: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    cin: '',
    dateDelivrance: '',
    lieuDelivrance: '',
    duplicata: '',
    famille: {
      conjointe: { nom: '', prenom: '', adresse: '', phone: '' },
      pere: { nom: '', prenom: '', adresse: '', phone: '' },
      mere: { nom: '', prenom: '', adresse: '', phone: '' },
      contact: { nom: '', adresse: '', phone: '' },
      enfants: [
        { nom: '', prenom: '', dateNaissance: '', sexe: '' },
        { nom: '', prenom: '', dateNaissance: '', sexe: '' },
        { nom: '', prenom: '', dateNaissance: '', sexe: '' },
      ],
    },
    image :""
  });

  const [showFamille, setShowFamille] = useState(false); // Etat pour afficher/masquer la section famille
  
  const [imagePreview, setImagePreview] = useState(''); // Pour afficher l'image sélectionnée
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name.startsWith('famille.enfants') && index !== null) {
      const fieldName = name.split('.').pop();

      setFormData(prevState => {
        const updatedEnfants = [...prevState.famille.enfants];
        updatedEnfants[index][fieldName] = value;

        return {
          ...prevState,
          famille: {
            ...prevState.famille,
            enfants: updatedEnfants,
          },
        };
      });
    } else if (name.startsWith('famille.')) {
      const path = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        famille: {
          ...prevState.famille,
          [path[1]]: {
            ...prevState.famille[path[1]],
            [path[2]]: value,
          },
        },
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*if (!formData.escadron || !formData.peloton) {
      alert('Tous les champs obligatoires doivent être remplis!');
      return; // Ne pas soumettre si des champs sont vides
    }*/
    console.log('Formulaire soumis:', formData);

    try {
      const response = await eleveService.post(formData);
      console.log('Élève créé avec succès:', response);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'élève:', error);
    }
  };

  // Fonction pour basculer l'affichage de la section famille
  const toggleFamille = () => {
    setShowFamille(!showFamille);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ajouter un Élève</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Ligne 1 */}
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" name="numCandidature" placeholder="Numéro de candidature" value={formData.numCandidature} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" name="numIncorporation" placeholder="Numéro d'incorporation" value={formData.numIncorporation} onChange={handleChange} />
          </div>
        </div>

        {/* Ligne 2 */}
        <div className="row mb-3">
        <div className="col">
  <select
    className="form-select"
    name="escadron"
    value={formData.escadron}
    onChange={handleChange}
  >
    <option value="">Sélectionner un escadron</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</div>

<div className="col">
  <select
    className="form-select"
    name="peloton"
    value={formData.peloton}
    onChange={handleChange}
  >
    <option value="">Peloton</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
 
  </select>
</div>
        </div>

        {/* Ligne 3 */}
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" name="centreConcours" placeholder="Centre de concours" value={formData.centreConcours} onChange={handleChange} />
          </div>
          <div className="col">
            <select className="form-select" name="genreConcours" value={formData.genreConcours} onChange={handleChange}>
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
        {formData.genreConcours === 'specialiste' && (
          <div className="mb-3">
            <label className="form-label">Spécialité :</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="specialite" value="informatique" onChange={handleChange} />
              <label className="form-check-label">Informatique</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="specialite" value="sport" onChange={handleChange} />
              <label className="form-check-label">Sport</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="specialite" value="infirmier" onChange={handleChange} />
              <label className="form-check-label">Infirmier</label>
            </div>
          </div>
        )}

        {/* Ligne 4 */}
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
          </div>
        </div>

        {/* Ligne 5 */}
        <div className="row mb-3">
          <div className="col">
            <input type="date" className="form-control" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" name="lieuNaissance" placeholder="Lieu de naissance" value={formData.lieuNaissance} onChange={handleChange} />
          </div>
        </div>

        {/* Ligne 6 */}
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" name="cin" placeholder="Numéro CIN" value={formData.cin} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="date" className="form-control" name="dateDelivrance" value={formData.dateDelivrance} onChange={handleChange} />
          </div>
        </div>

        {/* Ligne 7 */}
        <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control" name="lieuDelivrance" placeholder="Lieu de délivrance" value={formData.lieuDelivrance} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" className="form-control" name="duplicata" placeholder="Duplicata (si applicable)" value={formData.duplicata} onChange={handleChange} />
          </div>
        </div>

        {/* Bouton pour afficher/masquer la section famille */}
        <div className="text-center mb-3">
          <button type="button" className="btn btn-secondary" onClick={toggleFamille}>
            {showFamille ? 'Masquer' : 'Afficher'} les Informations Famille
          </button>
        </div>

        {/* Informations de la Famille */}
        {showFamille && (
          <div className="mt-4 border p-4">
            <h4>Informations Membres de Famille</h4>

            {/* Conjointe */}
            <div className="row mb-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <label className="form-label">Téléphone Conjointe</label>
                <input
                  type="text"
                  name="famille.conjointe.phone"
                  className="form-control"
                  value={formData.famille.conjointe.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
              </div>
            </div>

            {/* Père */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nom et Prénom Père</label>
                <input
                  type="text"
                  name="famille.pere.nom"
                  className="form-control"
                  value={formData.famille.pere.nom}
                  onChange={handleChange}
                  placeholder="Nom et Prénom du père"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Téléphone Père</label>
                <input
                  type="text"
                  name="famille.pere.phone"
                  className="form-control"
                  value={formData.famille.pere.phone}
                  onChange={handleChange}
                  placeholder="Téléphone du père"
                />
              </div>
            </div>

            {/* Mère */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nom et Prénom Mère</label>
                <input
                  type="text"
                  name="famille.mere.nom"
                  className="form-control"
                  value={formData.famille.mere.nom}
                  onChange={handleChange}
                  placeholder="Nom et Prénom de la mère"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Téléphone Mère</label>
                <input
                  type="text"
                  name="famille.mere.phone"
                  className="form-control"
                  value={formData.famille.mere.phone}
                  onChange={handleChange}
                  placeholder="Téléphone de la mère"
                />
              </div>
            </div>

            {/* ENFANTS */}
            {formData.famille.enfants.map((enfant, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Nom enfant {index + 1}</label>
                  <input
                    type="text"
                    name={`famille.enfants[${index}].nom`}
                    className="form-control"
                    value={enfant.nom || ''}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Nom de l'enfant"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Prénom enfant {index + 1}</label>
                  <input
                    type="text"
                    name={`famille.enfants[${index}].prenom`}
                    className="form-control"
                    value={enfant.prenom || ''}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Prénom de l'enfant"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Date de naissance</label>
                  <input
                    type="date"
                    name={`famille.enfants[${index}].dateNaissance`}
                    className="form-control"
                    value={enfant.dateNaissance || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Sexe</label>
                  <select
                    name={`famille.enfants[${index}].sexe`}
                    className="form-select"
                    value={enfant.sexe || ''}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Sélectionner</option>
                    <option value="masculin">Masculin</option>
                    <option value="féminin">Féminin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

         <button
           type="button"  // Utiliser type="button" pour éviter que le formulaire soit soumis
           className="btn btn-primary"
           onClick={handleSubmit} // Lancer la fonction handleSubmit au clic
         >
           Enregistrer
         </button>

      </form>
    </div>
  );
};

export default ElevePage;
