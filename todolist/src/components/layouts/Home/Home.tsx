import { useEffect, useState } from "react";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ITodo";
import { CardSprint } from "../ui/CardSprint/CardSprint";
import styles from "./Home.module.css";
import { Button } from "react-bootstrap";
import { ModalAgregarSprint } from "../../modals/ModalAgregarSprint/ModalAgregarSprint";

export const Home = () => {

  const { sprints, getSprints } = useSprint();

    
    console.log("Sprints cargadas:", sprints);
    
  useEffect(() => {
    getSprints(); 
  },[]);

  const [modalAgregarSprint, setModalAgregarSprint] = useState(false);
      const handleModalAgregarSprint = () => {
        setModalAgregarSprint(!modalAgregarSprint);
      };

  return (
    <>
    <div className={styles.navBacklog}>
      <div className={styles.listCardContainer}>
        <div className={styles.titleContainer}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
          >
            clear_all
          </span>
          <h3>Lista de Sprint</h3>
          
        </div>
        
        <div className={styles.addSprintButton}>
          <Button variant="primary"
          onClick={handleModalAgregarSprint}
          >
            Agregar Sprint
            <span className="material-symbols-outlined">add</span>
          </Button>
        </div>
        
        <div className={styles.cardContainer}>
            {sprints.map((sprint : ISprint) => (
              <CardSprint key={sprint.id} sprint={sprint}/>
            ))}
        </div>  
      </div>
    </div>
    <ModalAgregarSprint show={modalAgregarSprint} handleClose={handleModalAgregarSprint}></ModalAgregarSprint>
    
    </>
  );
};
