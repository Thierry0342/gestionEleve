import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import consultationService from "../../services/consultation-service";
import eleveService from "../../services/eleveService";
import cadreService from "../../services/cadre-service";
import Swal from 'sweetalert2';



  const ConsultationPage = () => {
  const [incorporation, setIncorporation] = useState('');
  const [matriculeCadre ,setMatriculeCadre] = useState('');
  const [cour2, setCour2] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  // ajout  eleve et cadre
  const [eleveData, setEleveData] = useState({});
  const [cadres, setCadres] = useState([]);
  const [formData, setFormData] = useState({
    status:"en cours de traitement...."

  });
  //un eleve
 
  //fin 

  const fetchConsultations = () => {
    consultationService.getAll()
      .then(res => setConsultations(res.data))
      .catch(err => console.error("Erreur chargement consultations :", err));
  };

  //fecth all cadre
  const fetchCadreData = async (mat)=> {
    try {
       // console.log("matricule ve e",mat) //pk ity
        const responseCadre = await cadreService.getbyMat(mat)
        console.log(responseCadre.data);
        if(responseCadre.data){
            setCadres(responseCadre.data);
        }
        else{
            console.log("cadre non trouvé")
            
        }
  
    } catch (error) {
        setCadres({});
        console.error('Erreur lors de la récupération des données:', error);
        
    }
  }

  const fetchEleveData = async (inc, cour) => {
    try {
      const response = await eleveService.getByInc(inc, cour);
     
      if (response.data) {
        setEleveData(response.data);  // Stocke les données récupérées
        
        
      } else {
        console.log('Élève non trouvé');
          
        alert("Elève non trouvé")
      }
    } catch (err) {
        setEleveData({});
        console.error('Erreur lors de la récupération des données:', err);
    }
  };
  useEffect(() => {
    if (incorporation && cour2) {
        fetchEleveData(incorporation, cour2);  // Passe à la fonction fetchEleveData
      }
   if(matriculeCadre){
        fetchCadreData(matriculeCadre);
      }
 
    
    fetchConsultations();
    //get cadre , 
  },  [incorporation, cour2,matriculeCadre]);
  
  //handle chanhge 
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle save 
  
 const handleSave = async () => {
  try {
    const dataToSend = {
      ...formData,
      eleveId: eleveData.eleve.id,
      cadreId:cadres.id,
    };

    await consultationService.post(dataToSend);

    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Consultation enregistrée avec succès',
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      // 🔄 Recharge la page après succès
      window.location.reload();
    });

  } catch (error) {
    console.error("Erreur :", error);
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Erreur lors de l\'enregistrement',
    });
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette consultation ?")) {
      await consultationService.delete(id);
      fetchConsultations(); // Refresh
    }
  };
  //serach eleve par inco
  // Fonction pour la recherche de l'élève en fonction du numéro d'incorporation et du cours


  const columns = [
    { name: "Nom et prénom de l'élève", selector: row => row.Eleve?.nom +" "+ row.Eleve.prenom, sortable: true },
    { name: "Esc", selector: row => row.Eleve?.escadron, sortable: true  ,width: "70px"},
    { name: "Pon", selector: row => row.Eleve?.peloton, width: "70px"},
    { name: "Nom Cadre", selector: row => row.Cadre?.nom },
    { name: "Téléphone Cadre", selector: row => row.phone },
    { name: "Date Départ", selector: row => row.dateDepart },
    { name: "Date Arrivée", selector: row => row.dateArrive || "-" },
    { name: "Service Médical", selector: row => row.service || "-" },
    { name: "Référé", selector: row => row.refere },
    { name: "status", cell: row => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {row.status}
        </span>
      ),
      
    },

    {
      name: "Actions",
      cell: row => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.id)}
        >
          Supprimer
        </button>
      )
    }
  ];

  return (
<div className="container py-4">
  <div className="mb-4">
  {/* Section de recherche élève et cadre */}
  <div className="row">
    {/* Recherche Élève à gauche */}
    <div className="col-md-6">
      <h5>Recherche Élève</h5>
      <div className="mb-3">
        <label>Numéro d'incorporation</label>
       

        <input
          type="text"
          className="form-control"
          name="numeroIncorporation"
          value={incorporation}
          
          onChange={(e) => setIncorporation(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Cours</label>
        <input
          type="text"
          className="form-control"
          name="cour" 
          value={cour2}
          onChange={(e) => setCour2(e.target.value)}
        />
      </div>
      
    </div>

    {/* Sélection cadre à droite */}
    <div className="col-md-6">
      <h5>Cadre Responsable</h5>
      <div className="mb-3">
      <label>Matricule</label>
        <input
          type="text"
          className="form-control"
          name="matricule"
          value={matriculeCadre}
          onChange={(e) => setMatriculeCadre(e.target.value)}
        />
      </div>
    </div>
  </div>

  {/* Affichage infos élève */}
  {eleveData && Object.keys(eleveData).length > 0 && (
  <div className="row mt-4">
    {/* Bloc élève à gauche */}
    <div className="col-md-6">
      <div className="border rounded p-4 bg-light">
        <h5 className="mb-3">Informations de l'élève</h5>
        <div className="row">
          <div className="col-md-4 mb-2">
            <label>ID</label>
            <input className="form-control" value={eleveData.eleve.id} readOnly />
          </div>
          <div className="col-md-4 mb-2">
            <label>Nom</label>
            <input className="form-control" value={eleveData.eleve.nom} readOnly />
          </div>
          <div className="col-md-4 mb-2">
            <label>Prénom</label>
            <input className="form-control" value={eleveData.eleve.prenom} readOnly />
          </div>
          <div className="col-md-3 mb-2">
            <label>Escadron</label>
            <input className="form-control" value={eleveData.eleve.escadron} readOnly />
          </div>
          <div className="col-md-3 mb-2">
            <label>Peloton</label>
            <input className="form-control" value={eleveData.eleve.peloton} readOnly />
          </div>
          <div className="col-md-3 mb-2">
            <label>Incorporation</label>
            <input className="form-control" value={eleveData.eleve.numeroIncorporation} readOnly />
          </div>
          <div className="col-md-3 mb-2">
            <label>Cours</label>
            <input className="form-control" value={eleveData.eleve.cour} readOnly />
          </div>
        </div>
      </div>
    </div>

    {/* Bloc cadre à droite */}
    <div className="col-md-6">
      <div className="border rounded p-4 bg-light">
        <h5 className="mb-3">Informations du cadre</h5>
       
     
              <div className="row">
                <div className="col-md-6 mb-2">
                    
                  <label>Nom</label>
                  <input className="form-control" value={cadres.grade +" "+cadres.nom} readOnly />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Service</label>
                  <input className="form-control" value={cadres.service} readOnly />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Matricule</label>
                  <input className="form-control" value={cadres.matricule} readOnly />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Phone</label>
                  <input className="form-control" value={cadres.phone} readOnly />
                </div>
              </div>
      
        
        
   
      </div>
    </div>
  </div>
)}

  {/* Formulaire principal en dessous */}
  <div className="mt-4">
    <h5>Informations de la Consultation</h5>
    <div className="row">
      <div className="col-md-6 mb-3">
        <label>Date de départ</label>
        <input
          type="date"
          className="form-control"
          name="dateDepart"
          value={formData.dateDepart}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label>Date d'arrivée</label>
        <input
          type="date"
          className="form-control"
          name="dateArrive"
          value={formData.dateArrive}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label>Référé</label>
        <input
          type="text"
          className="form-control"
          name="refere"
          value={formData.refere}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label>Service</label>
        <input
          type="text"
          className="form-control"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label>Référence Message</label>
        <input
          type="text"
          className="form-control"
          name="refMessage"
          value={formData.refMessage}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label>Téléphone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="mt-4 text-center">
      <button className="btn btn-success" onClick={handleSave}>Enregistrer</button>
    </div>
  </div>
</div>

    
        
        {/*commence ici le tableau*/}
      <h2 className="text-2xl font-bold mb-4">Consultations</h2>
      
      {/* Bouton pour afficher/masquer la table */}
      <button 
        onClick={() => setIsTableVisible(!isTableVisible)} 
        className="btn btn-primary mb-3"
      >
        {isTableVisible ? "Masquer la Liste" : "Afficher la Liste"}
      </button>

      {/* Afficher ou masquer la table */}
      {isTableVisible && (
        <DataTable
          columns={columns}
          data={consultations}
          pagination
          highlightOnHover
          responsive
          striped
          noDataComponent="Aucune consultation trouvée"
        />
      )}
    </div>
  );
};

export default ConsultationPage;
