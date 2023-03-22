import { Idea } from '@/atoms/ideaAtom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import React from 'react';

type DeleteIdeaModalProps = {
    showModal: any;
    hideModal: any;
    confirmModal: (index: number, topicId: string) => void;
    idea: Idea;
    index: number
};

const DeleteIdeaModal: React.FC<DeleteIdeaModalProps> = ({
    showModal,
    hideModal,
    confirmModal,
    idea,
    index
}) => {
    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={showModal} onClose={hideModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Confirmation</ModalHeader>
                    <ModalBody pb={6}>Are you sure you want to delete this idea: <b>{idea.name}</b>?</ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            spinnerPlacement="start"
                            _loading={{ opacity: 2 }}
                            onClick={() => {
                                confirmModal(index, idea.topic.id.toString());
                                hideModal();
                            }}
                        >
                            Confirm
                        </Button>
                        <Button onClick={hideModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default DeleteIdeaModal;