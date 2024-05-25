import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  resize: none;
`;

const Button = styled.button`
  background-color: #0073b1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #005582;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoadingMessage = styled.p`
  color: #0073b1;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const CompanyResults = styled.div`
  margin-bottom: 20px;
`;

const CompanyTitle = styled.h2`
  font-size: 1.5em;
  color: #0073b1;
`;

const InfoText = styled.p`
  font-size: 1.2em;
  color: #333;
`;

function App() {
  const [companies, setCompanies] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCompanies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData([]);

    const companyList = companies.split('\n').filter((name) => name.trim() !== '');

    try {
      const results = await Promise.all(
        companyList.map(async (company) => {
          const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ company }),
          });

          const result = await response.json();
          return {
            company,
            followers: result.followers,
            employees: result.employees,
          };
        })
      );

      setData(results);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>LinkedIn Company Data</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <TextArea
          value={companies}
          onChange={handleChange}
          placeholder="Enter company names, each on a new line"
          required
        />
        <Button type="submit">Get Data</Button>
      </Form>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data.length > 0 && (
        <ResultContainer>
          {data.map((result, index) => (
            <CompanyResults key={index}>
              <CompanyTitle>{result.company}</CompanyTitle>
              <InfoText><strong>Followers:</strong> {result.followers}</InfoText>
              <InfoText><strong>Employees:</strong> {result.employees}</InfoText>
            </CompanyResults>
          ))}
        </ResultContainer>
      )}
    </Container>
  );
}

export default App;
