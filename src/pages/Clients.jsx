import React, { useEffect, useState, useRef } from "react";
import {
  LetterButtonsContainer,
  Pagination,
  Modal,
  Details,
  Form,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients } from "../features/Clients";

let pageSize = 6;

function Clients() {
  const dispatch = useDispatch();
  const clientList = useSelector((state) => state.clients.value);

  const modalRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState(null);
  const [letter, setLetter] = useState(null);
  const [numberOfClients, setNumberOfClients] = useState(clientList.length);

  useEffect(() => {
    dispatch(
      getAllClients({
        currentPage: currentPage,
        pageSize: pageSize,
        term: null,
        letter: null,
      })
    );
  }, [currentPage]);

  useEffect(() => {
    setLetter(null);
    dispatch(
      getAllClients({
        currentPage: currentPage,
        pageSize: pageSize,
        term: term,
        letter: null,
      })
    );
  }, [term]);

  useEffect(() => {
    setTerm("");
    dispatch(
      getAllClients({
        currentPage: currentPage,
        pageSize: pageSize,
        term: null,
        letter: letter,
      })
    );
    console.log(clientList);
  }, [letter]);

  const openModal = () => {
    modalRef.current.openModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <>
      <h2>
        <i className="ico clients"></i>Clients
      </h2>
      <div className="grey-box-wrap reports">
        <a className="link new-member-popup" onClick={openModal}>
          Create new client
        </a>
        <div className="search-page">
          <input
            defaultValue=""
            type="search"
            name="search-clients"
            className="in-search"
            onChange={(e) => {
              setTerm(e?.target?.value);
              console.log(term);
            }}
          />
        </div>
      </div>

      <LetterButtonsContainer onSetLetter={(letter) => setLetter(letter)} />
      <div className="accordion-wrap projects">
        {clientList.map((client, index) => (
          <Details
            id={client.id}
            client={client.name}
            address={client.address}
            city={client.city}
            postalCode={client.postalCode}
            key={index}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={numberOfClients}
        pageSize={pageSize}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <Modal ref={modalRef}>
        <Form isClient={true} close={closeModal} />
      </Modal>
    </>
  );
}

export default Clients;
