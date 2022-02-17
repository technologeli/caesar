import {
  Accordion,
  AppShell,
  Button,
  Grid,
  Group,
  Header,
  Modal,
  NumberInput,
  SegmentedControl,
  Table,
  Textarea,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { crypt, decrypt, encrypt } from '../lib/caesar';

const Home: NextPage = () => {
  const [encryptOrDecrypt, setEncryptOrDecrypt] = useState('encrypt');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [shift, setShift] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Change plaintext on ciphertext change
  useEffect(() => {
    if (encryptOrDecrypt === 'decrypt') {
      const newPlaintext = decrypt(ciphertext, shift);
      if (plaintext !== newPlaintext) setPlaintext(newPlaintext);
    }
  }, [ciphertext, shift]);

  // Change ciphertext on plaintext change
  useEffect(() => {
    if (encryptOrDecrypt === 'encrypt') {
      const newCiphertext = encrypt(plaintext, shift);
      if (ciphertext !== newCiphertext) setCiphertext(newCiphertext);
    }
  }, [plaintext, shift]);

  return (
    <AppShell
      header={
        <Header height={60} padding='xs'>
          <Title align='center' color='violet'>
            Caesar Ciphers
          </Title>
        </Header>
      }
    >
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Why?'
      >
        I use the Caesar cipher to name my music playlists for fun, so I made a
        tool that I could use anywhere.
      </Modal>
      <Grid mb='md'>
        <Grid.Col span={12}>
          <SegmentedControl
            fullWidth
            value={encryptOrDecrypt}
            onChange={setEncryptOrDecrypt}
            data={[
              { label: 'Encrypt', value: 'encrypt' },
              { label: 'Decrypt', value: 'decrypt' },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={6}>
          <Textarea
            placeholder='Plaintext'
            label='Plaintext'
            value={plaintext}
            readOnly={encryptOrDecrypt === 'decrypt'}
            onChange={(e) => setPlaintext(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={6}>
          <Textarea
            placeholder='Ciphertext'
            label='Ciphertext'
            value={ciphertext}
            readOnly={encryptOrDecrypt === 'encrypt'}
            onChange={(e) => setCiphertext(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            label='Shift'
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            value={shift}
            onChange={(num: number) => setShift(num)}
          />
        </Grid.Col>
      </Grid>
      <Accordion mb='md'>
        <Accordion.Item label='All Possible Texts'>
          <Table striped highlightOnHover style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Shift</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(26).keys()).map((shift: number) => (
                <tr key={shift}>
                  <td>{shift}</td>
                  <td>
                    {crypt(plaintext, shift, encryptOrDecrypt === 'encrypt')}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Item>
      </Accordion>
      <Group position='center'>
        <Button onClick={() => setModalOpen(true)}>Why?</Button>
      </Group>
    </AppShell>
  );
};

export default Home;
