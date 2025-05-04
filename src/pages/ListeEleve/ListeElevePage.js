import React, { useEffect, useState } from 'react';
import EleveService from '../../services/eleveService'; // ⚠️ Vérifie la casse exacte du fichier
import ModalModificationEleve from '../EleveModifPage/EleveModifPage'; // 
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import ModalMatricule from '../../component//modalMatricule/ModalMatricule';
import { data } from 'react-router-dom';


//table 




const ListeElevePge = () => {
  const [eleves, setEleves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eleveActif, setEleveActif] = useState(null);
  const [filter, setFilter] = useState({ escadron: '', peloton: '' ,search:''});

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
        console.log("donne ve reto",data)
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
  //pour le filtre 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
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

  
 
  // Application du filtre
const elevesAAfficher = eleves.filter(eleve => {
  const escadronMatch = filter.escadron === '' || eleve.escadron === Number(filter.escadron);
  const pelotonMatch = filter.peloton === '' || eleve.peloton === Number(filter.peloton);
  const matchSearch = !filter.search || (
    eleve.nom?.toLowerCase().includes(filter.search.toLowerCase()) ||
    eleve.prenom?.toLowerCase().includes(filter.search.toLowerCase()) ||
    eleve.numeroIncorporation?.toString().includes(filter.search)
  );
  // Si escadron sélectionné mais pas peloton → OK
  // Si escadron + peloton → OK
  // Si aucun → tout s’affiche
  // Si peloton sélectionné mais escadron vide → on ignore peloton
  if (filter.peloton !== '' && filter.escadron === '' && filter.search) {
    return true; 
  }

  return escadronMatch && pelotonMatch && matchSearch;
});
const columns = [
  { name: 'Nom', selector: row => row.nom, sortable: true },
  { name: 'Prénom', selector: row => row.prenom, sortable: true },
  { name: 'Escadron', selector: row => row.escadron, sortable :true},
  { name: 'Peloton', selector: row => row.peloton },
  { name: 'Matricule', selector: row => row.matricule} ,
  { name: 'Incorporation', selector: row => row.numeroIncorporation },
  {
    name: 'Actions',
    cell: row => (
      <>
        <button className="btn btn-warning btn-sm me-2" onClick={() => handleOpenModal(row)}>
          View
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
          Delete
        </button>
      </>
    )
  }
];
  

  return (
    <div className="container mt-5">
      <h2>Liste des Élèves Gendarmes</h2>
      <div className="row justify-content-center mb-5">
  <div className="col-md-6">
    <div className="row g-2">
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom, prénom ou incorporation"
          name="search"
          value={filter.search}
          onChange={handleFilterChange}
        />
      </div>

      <div className="col-6">
        <select
          className="form-select"
          name="escadron"
          value={filter.escadron}
          onChange={handleFilterChange}
        >
          <option value="">Sélectionner un escadron</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="col-6">
        <select
          className="form-select"
          name="peloton"
          value={filter.peloton}
          onChange={handleFilterChange}
        >
          <option value="">Peloton</option>
          {[1, 2, 3].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <button
          className="btn btn-secondary w-100"
          onClick={() => setFilter({ escadron: '', peloton: '', search: '' })}
        >
          Réinitialiser le filtre
        </button>
      </div>
    </div>
  </div>
</div>
             <DataTable
                    columns={columns}
                    data={elevesAAfficher}
                    pagination
                    paginationPerPage={50}
                    paginationRowsPerPageOptions={[50, 100]}
                    highlightOnHover
                    striped
                    noDataComponent="Aucun élève à afficher"
                    customStyles={customStyles}
                    
                    
                 />

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
const customStyles = {
  headCells: {
    style: {
      fontSize: '17px', // Taille du texte des en-têtes
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '17px', // Taille du texte des cellules
    },
  },
};



export default ListeElevePge;
