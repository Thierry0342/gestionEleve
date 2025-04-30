import React, { useEffect, useState } from 'react';
import EleveService from '../../services/eleveService'; // ⚠️ Vérifie la casse exacte du fichier
import ModalModificationEleve from '../EleveModifPage/EleveModifPage'; // ⚠️ Assure-toi que ce chemin est bon

const ListeElevePge = () => {
  const [eleves, setEleves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eleveActif, setEleveActif] = useState(null);

  useEffect(() => {
    EleveService.get()
      .then(response => {
        setEleves(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des élèves :", error);

        // ➕ Données fictives ici si l'API échoue
        const fakeEleves = [
          {
            numCandidature: 'c14ml',
    numIncorporation: '498',
    escadron: '8',
    peloton: '5',
    centreConcours: 'ambositra',
    genreConcours: 'ordinaire',
    SpecialisteAptitude: 'informatique',
    nom: 'rakotomalala',
    prenom: 'thierry',
    dateNaissance: '19/10/2000',
    lieuNaissance: 'fianarantsoa',
    cin: '203011065856',
    dateDelivrance: '',
    lieuDelivrance: '',
    duplicata: '',
    sports:'',
    loisir:'',
    religion:'',
    specialite:'',
    niveau:'',
    groupeSanguin:'',
    tailleChemise: "",
    tourTete: "",
    pointurePantalon: "",
    pointureChaussure: "",
    relationsGenantes: "",
    famille: {
      conjointe: { nom: '', prenom: '', adresse: '', phone: '' },
      pere: { nom: '', prenom: '', adresse: '', phone: '' },
      mere: { nom: '', prenom: '', adresse: '', phone: '' },
      contact: { nom: '', adresse: '', phone: '' },
      enfants: [
        { nom: '', prenom: '', dateNaissance: '', sexe: '' },

      ],
      soeur: [{ nom: '' }],
      frere: [{ nom: '' }],
    },
    image: "",
    etatCivil: 'Divorce',
    eleveTelephone: {
      telephone1: '0345588130',
      telephone2: '',
      telephone3: '',
    },
    facebook: "",

          },
         
        ];

        setEleves(fakeEleves);
      });
  }, []);

  const handleOpenModal = (eleve) => {
    setEleveActif(eleve);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEleveActif(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEleveActif(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (EleveService.update) {
        await EleveService.update(eleveActif); // Assure-toi que cette méthode est bien dans ton service
      }
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Liste des Élèves</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Escadron</th>
            <th>Peloton</th>
            <th>Incorporation</th>
            <th>Matricule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((eleve, index) => (
            <tr key={index}>
              <td>{eleve.nom}</td>
              <td>{eleve.prenom}</td>
              <td>{eleve.escadron}</td>
              <td>{eleve.peloton}</td>
              <td>{eleve.numIncorporation}</td>
              <td>{eleve.matricule}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleOpenModal(eleve)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => console.log("Suppression pas encore implémentée")}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {eleveActif && (
        <ModalModificationEleve
          show={showModal}
          onClose={handleCloseModal}
          eleve={eleveActif}
          onChange={handleChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ListeElevePge;
