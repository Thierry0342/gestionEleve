import React, { useEffect, useState } from 'react';
import EleveService from '../../services/eleveService'; // ⚠️ Vérifie la casse exacte du fichier
import ModalModificationEleve from '../EleveModifPage/EleveModifPage'; // 
import Swal from 'sweetalert2';

const ListeElevePge = () => {
  const [eleves, setEleves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eleveActif, setEleveActif] = useState(null);
  //fonction delete
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        EleveService.delete(id)
          .then(() => {
            setEleves(prev => prev.filter(e => e.id !== id));
            Swal.fire('Supprimé !', 'L\'élève a été supprimé.', 'success');
          })
          .catch(error => {
            console.error("Erreur lors de la suppression :", error);
            Swal.fire('Erreur', 'Impossible de supprimer cet élève.', 'error');
          });
      }
    });
  };
  
  

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
     id :'',
     numCandidature: 'c14ml',
    numIncorporation: '498',
    escadron: '5',
    peloton: '1',
    diplomes:['CEPE','Licence'],
    filiereDoctorat: 'informatique', 
    filiereMasterOne: '', 
    filiereLicence: 'informatique', 
    centreConcours: 'ambositra',
    genreConcours: 'specialiste',
    SpecialisteAptitude: 'medecine',
    niveauEtude :'master one',
    nom: 'rakotomalala',
    prenom: 'thierry',
    dateNaissance: '19/10/2000',
    lieuNaissance: 'fianarantsoa',
    cin: '203011065856',
    dateDelivrance: '2025-05-09',
    lieuDelivrance: 'ambositra',
    duplicata: '',
    sports:'Football',
    loisir:'',
    religion:'EKAR',
    specialite:'informatique',
    niveau:'',
    groupeSanguin:'A+',
    tailleChemise: "L",
    tourTete: "55",
    pointurePantalon: "42",
    pointureChaussure: "43",
    relationsGenantes: "toliara",
    famille: {
      conjointe: { nom: 'tiana', prenom: '', adresse: 'lot amboay', phone: '0344049829' },
      pere: { nom: 'gaston', prenom: '', adresse: 'lot amboay', phone: '0345869865' },
      mere: { nom: '', prenom: '', adresse: '', phone: '' },
      contact: { nom: '', adresse: '', phone: '' },
      enfants: [
        { nom: 'zanako voalo', prenom: '', dateNaissance: '', sexe: '' },
        { nom: 'zanako faharoa', prenom: '', dateNaissance: '', sexe: '' },

      ],
      soeur: [{ nom: '' }],
      frere: [{ nom: '' }],
    },
    image: "",
    etatCivil: 'Celibataire',
    eleveTelephone: {
      telephone1: '0345588130',
      telephone2: '0337906932',
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
                name='btn modifie'
                  className="btn btn-warning btn-sm me-2"
                  onClick= { () => handleOpenModal(eleve) }
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(eleve.id)}
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
