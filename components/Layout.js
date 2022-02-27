import { useState } from 'react';

import Header from "./Header";
import LoginModal from './LoginModal';
import Modal from './Modal';
import RegistrationModal from './RegistrationModal';

export default function Layout(props) {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    return (
        <div>
            <Header />
            <main>{props.content}</main>
            {
                showModal && <Modal close={() => setShowModal(false)}>
                    { showLoginModal && (
                        <LoginModal
                            showSignUp={() => {
                                setShowRegistrationModal(true);
                                setShowLoginModal(false);
                            }}
                        />
                    ) }
                    { showRegistrationModal && (
                        <RegistrationModal
                            showLogin={() => {
                                setShowRegistrationModal(false);
                                setShowLoginModal(true);
                            }}
                        />
                    ) }
                </Modal>
            }
            <style jsx>{`
                main {
                    position: relative;
                    max-width: 56em;
                    background-color: white;
                    padding: 2em;
                    margin: 0 auto;
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}