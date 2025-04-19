'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleCreateAlias } from '@/lib/create';
import { Short } from '@/type';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vh 2rem;
  background-color: #e9fbe5;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

const NavBar = styled.nav`
  width: 100%;
  background-color: #2c5f2d;
  padding: 1rem 2rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #2c5f2d;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #4f7942;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 128, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #a8d5ba;
  border-radius: 0.5rem;

  &:focus {
    border-color: #6bbf59;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #2c5f2d;
  font-weight: 600;
`;

const Hint = styled.div`
  font-size: 0.9rem;
  color: #6a926f;
`;

const Button = styled.button`
  background-color: #6bbf59;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #58a14c;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #e63946;
`;

const ResultLink = styled.a`
  margin-top: 1rem;
  font-weight: bold;
  color: #2c5f2d;
  word-break: break-word;
`;

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [error, setError] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortened('');

    const response: Short | null = await handleCreateAlias(alias, url);

    if (!response) {
      setError('Alias may be taken or URL is invalid.');
      return;
    }

    const shortUrl = `${window.location.origin}/${response.alias}`;
    setShortened(shortUrl);
  };

  return (
    <>
      <NavBar>My URL Shortener</NavBar>
      <Container>
        <Heading>My URL Shortener</Heading>
        <Subtitle>Create custom short links you can copy, share, and use anywhere.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Label>URL</Label>
          <Input
            type="text"
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <Label>Custom Alias</Label>
          {origin && (
            <Hint>
              {origin}/<span>your-custom-alias</span>
            </Hint>
          )}
          <Input
            type="text"
            placeholder="your-custom-alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />

          <Button type="submit">Shorten URL</Button>

          {shortened && (
            <ResultLink href={shortened} target="_blank" rel="noopener noreferrer">
              {shortened}
            </ResultLink>
          )}

          {error && <Message>Error: {error}</Message>}
        </Form>
      </Container>
    </>
  );
}