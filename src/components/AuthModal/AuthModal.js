import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { MdPerson, MdClose } from "react-icons/md";

import {
  ModalBackdrop,
  ModalContainer,
  ModalText,
  GoogleButton,
} from "./AuthModal.styled";
import { selectUser } from "../../features/auth/authSlice";
import { useGoogleAuth } from "../../hooks";
import IconButton from "../IconButton/IconButton";

const AuthModal = ({ closeModal }) => {
  const backdropRef = useRef(null);
  const user = useSelector(selectUser);
  const { signIn } = useGoogleAuth();

  useEffect(() => {
    if (backdropRef.current) {
      // Close modal if user clicked on the backdrop
      const backdropElement = backdropRef.current;
      const handleClick = (e) => e.target === backdropElement && closeModal();

      // Listen for click events on the backdrop
      backdropElement.addEventListener("click", handleClick);

      return () => {
        // Cleanup on unmount
        backdropElement.removeEventListener("click", handleClick);
      };
    }
  }, [closeModal]);

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user, closeModal]);

  return ReactDOM.createPortal(
    <ModalBackdrop ref={backdropRef}>
      <ModalContainer>
        <IconButton onClick={closeModal}>
          <MdClose />
        </IconButton>
        <MdPerson />
        <h2>Sign in</h2>
        <ModalText>
          <h3>Use these credentials to sign in with a dummy Google account:</h3>
          <hr />
          <p>
            <b>Username:</b>
            <span>{process.env.REACT_APP_DEMO_USERNAME}</span>
          </p>
          <p>
            <b>Password:</b>
            <span>{process.env.REACT_APP_DEMO_PASSWORD}</span>
          </p>
          <hr />
        </ModalText>
        <GoogleButton onClick={signIn}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google icon"
          />
          <p>
            <b>Sign in with Google</b>
          </p>
        </GoogleButton>
      </ModalContainer>
    </ModalBackdrop>,
    document.getElementById("modal-root")
  );
};

AuthModal.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default AuthModal;
