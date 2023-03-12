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
import {sha256} from 'js-sha256';

interface Alert {
  id: string;
  element: JSX.Element;
  hash: string;
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
          const hash = getMessageHash(element);
          if (old.some(a => a.hash === hash)) {
            return old;
          }
          return [
            ...old,
            {
              id: id,
              element: element,
              hash: hash,
            },
          ];
        });
      }),
    [],
  );

  function getMessageHash(element: JSX.Element): string {
    return sha256(JSON.stringify(element.props));
  }

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
