import React, { useEffect, useState } from 'react';
import EleveService from '../../services/eleveService'; // ⚠️ Vérifie la casse exacte du fichier
import ModalModificationEleve from '../EleveModifPage/EleveModifPage'; // 
import Swal from 'sweetalert2';

const ListeElevePge = () => {
  const [eleves, setEleves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eleveActif, setEleveActif] = useState(null);
  const [filter, setFilter] = useState({ escadron: '', peloton: '' });

  const elevesAAfficher = filter.escadron === '' && filter.peloton === ''
  ? eleves
  : eleves.filter(eleve =>
      (filter.escadron === '' || eleve.escadron === Number(filter.escadron)) &&
      (filter.peloton === '' || eleve.peloton === Number(filter.peloton))
    );

  
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
  
  
// maka donne rehetra
useEffect(() => {
  EleveService.get()
    .then(response => {
      if (Array.isArray(response.data)) {
        setEleves(response.data);
      } else {
        console.error("Données inattendues :", response.data);
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement des élèves :", error);
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
      <div className="row mb-3">
  <div className="col">
    <select
      className="form-select"
      name="escadron"
      value={filter.escadron}
      onChange={handleChange}
    >
      <option value="">Sélectionner un escadron</option>
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>
  <div className="col">
    <select
      className="form-select"
      name="peloton"
      value={filter.peloton}
      onChange={handleChange}
    >
      <option value="">Peloton</option>
      {[1, 2, 3].map(p => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
  </div>
</div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Escadron</th>
            <th>Peloton</th>
            <th>Matricule</th>
            <th>Incorporation</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {elevesAAfficher.map((eleve) => (
            <tr key={eleve.id}>
            <td>{eleve.nom}</td>
           <td>{eleve.prenom}</td>
           <td>{eleve.escadron}</td>
          <td>{eleve.peloton}</td>
          <td>{eleve.matricule}</td>
          <td>{eleve.numeroIncorporation}</td>
            <td>
                <button
                name='btn modifie'
                  className="btn btn-warning btn-sm me-2"
                  onClick= { () => handleOpenModal(eleve) }
                >
                  Afficher
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
