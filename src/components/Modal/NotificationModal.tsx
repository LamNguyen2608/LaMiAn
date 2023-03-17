import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import React from 'react';
import { Notification } from '../Navbar/RightContent/Notifications';

type NotificationModalProps = {
    noti: Notification;
    showModal: boolean,
    setShowModal: (value: boolean) => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({ noti, showModal, setShowModal }) => {
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Noti Header</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
                            {noti.content}
                            {noti.noti_time}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => setShowModal(false)}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default NotificationModal;