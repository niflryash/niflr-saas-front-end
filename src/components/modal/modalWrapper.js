import React from 'react';
import { Modal } from '@mui/material';
import {connect} from "react-redux";
import AddDummyEventModal from './addDummyEventModal';
import ConfirmTicketModal from './confirmTicketModal';
import confirmCartModal from './confirmCartModal';
import ViewStoreProducts from './viewStoreProducts';
import { setModalState } from '../../actions/index';



const ModalWrapper = (props) => {

const closeModal = () => {
  props.setModalState({ visible: false });
      
    };
const renderModal = () => {

    switch (props.modal.modalName) {
      case 'AddDummyEvent':
        console.log("modal props", props.modal)
        return (
          <AddDummyEventModal
            closeModal={closeModal}
            ticketId ={props.modal.modalContent}
          />
        );
      case 'confirmTicket':
        console.log("modal props", props.modal)
        return (
          <ConfirmTicketModal
            closeModal={closeModal}
            // ticketId ={props.modal.modalContent}
          />
        );
      case 'viewStoreProducts':
        console.log(" viewStoreProducts modal props", props.modal)
        return (
          props.product.product.productId?(
            <AddDummyEventModal
            closeModal={closeModal}
            ticket ={props.ticket.ticket}
            product = {props.product.product}
          />
          )
          :
          <ViewStoreProducts
              closeModal = {closeModal}
              products = {props.modal.modalContent}
          />
        );

        // case  'confirmCart':
        //   console.log("modal props", props.modal)
        //   return (
        //     <confirmCartModal
        //       closeModal={closeModal}
        //     // ticketId ={props.modal.modalContent}
        //   />
        //   );
      // Add other cases here for different modal types
      default:
        return null;
    }
  };

  return (
    <Modal 
            open={props.modal.visible} 
            onClose={closeModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              margin: '0 auto',
              overflow: "hidden"

            }}
            >
      <div>{renderModal()}</div>
    </Modal>
  );
};

const mapStateToProps =({modal,product,ticket})=>({
    modal,product,ticket
})
export default connect(mapStateToProps,{setModalState}) (ModalWrapper);