import React, {useState} from 'react';
import {Button, Input, InputGroup, InputLeftAddon} from '@chakra-ui/react';
import {setSaveState} from '../../features/save/db';

type NewGameProps = {
  setLoaded: (loaded: boolean) => void;
  setShowNewGame: (loaded: boolean) => void;
};

export default function NewGame({setLoaded, setShowNewGame}: NewGameProps): React.ReactElement {
  const [profileName, setProfileName] = useState('');
  const [isProfileNameValid, setIsProfileNameValid] = useState(false);

  const validateProfileName = (value: string): boolean => {
    if (!value) {
      return false;
    }

    return true;
  };

  const handleProfileNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setProfileName(event.target.value);
    setIsProfileNameValid(validateProfileName(profileName));
  };

  const startNewGame = () => {
    if (isProfileNameValid) {
      setSaveState(profileName);
      setLoaded(true);
    }
  };

  return (
    <div>
      New Game
      <InputGroup>
        <InputLeftAddon children="Profile Name" />
        <Input
          value={profileName}
          onChange={handleProfileNameChange}
          isInvalid={isProfileNameValid}
          placeholder="Ener Profile Name.."
        />
      </InputGroup>
      <Button
        disabled={isProfileNameValid}
        onClick={() => startNewGame()}
      >
        Start Game
      </Button>
      <Button onClick={() => setShowNewGame(false)}>Back</Button>
    </div>
  );
}
