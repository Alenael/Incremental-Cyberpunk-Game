import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {EventEmitter} from '/@/utils/EventEmitter';

interface Alert {
  id: string;
  element: JSX.Element;
}

let i = 0;
export const AlertEvents = new EventEmitter<[JSX.Element]>();
export function AlertManager(): React.ReactElement {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(
    () =>
      AlertEvents.subscribe((element: JSX.Element) => {
        const id = i + '';
        i++;
        setAlerts(old => {
          return [
            ...old,
            {
              id: id,
              element: element,
            },
          ];
        });
      }),
    [],
  );

  function close(): void {
    setAlerts(old => {
      return old.slice(1);
    });
  }

  return (
    <>
      {alerts.length > 0 && (
        <Modal
          isOpen={true}
          onClose={close}
        >
          <ModalOverlay />
          <ModalContent bg={'smoke.300'}>
            <ModalHeader>Message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{alerts[0].element}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
