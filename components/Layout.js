import { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Header from "./Header";
import LoginModal from './LoginModal';
import Modal from './Modal';
import RegistrationModal from './RegistrationModal';

export default function Layout(props) {
    const showModal = useStoreState((state) => state.modals.showModal);
    const showLoginModal = useStoreState((state) => state.modals.showLoginModal);
    const showRegistrationModal = useStoreState((state) => state.modals.showRegistrationModal);

    const setHideModal = useStoreActions((actions) => actions.modals.setHideModal);
    const setShowLoginModal = useStoreActions((actions) => actions.modals.setShowLoginModal);
    const setShowRegistrationModal = useStoreActions((actions) => actions.modals.setShowRegistrationModal);
    return (
        <div>
            <Header />
            <main>{props.content}</main>
            {
                showModal && <Modal close={() => setHideModal}>
                    { showLoginModal && (
                        <LoginModal
                            showSignUp={() => {
                                setShowRegistrationModal();
                            }}
                        />
                    ) }
                    { showRegistrationModal && (
                        <RegistrationModal
                            showLogin={() => {
                                setShowLoginModal();
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