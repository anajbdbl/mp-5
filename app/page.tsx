'use client';
import { useState } from 'react';
import styled from 'styled-components';

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

const Form = styled.div`
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
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ alias, url }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
      setShortUrl('');
    } else {
      setMessage('');
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <>
    <NavBar>My URL Shortener</NavBar>
    <Container>
    <Heading>My URL Shortener</Heading>
    <Subtitle>Create custom short links you can copy, share, and use anywhere.</Subtitle>
      <Form>
        <Input
          placeholder="Custom Alias (e.g. my-link)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <Input
          placeholder="Full URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleSubmit}>Shorten URL</Button>
        {message && <Message>{message}</Message>}
        {shortUrl && (
          <ResultLink href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </ResultLink>
        )}
      </Form>
    </Container>
    </>
  );
}
