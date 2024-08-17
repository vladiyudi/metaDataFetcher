import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  IconButton,
  Paper,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const getcsrfToken = async (setToken)=>{
  try {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'/csrf-token', { withCredentials: true })
    setToken(res.data.csrfToken)
  } catch (error) {
    console.log(error)
  }
}

function App() {
  const [urls, setUrls] = useState(['', '', '']);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState([]);

  const [csrfToken, setCsrfToken] = useState('');
  

  useEffect(() => {
    getcsrfToken(setCsrfToken)
}, []);


  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newInputErrors = [...inputErrors];
    newInputErrors[index] = '';
    setInputErrors(newInputErrors);
  };

  const addUrlInput = () => {
    setUrls([...urls, '']);
    setInputErrors([...inputErrors, '']);
  };

  const removeUrlInput = (index) => {
    if (urls.length > 3) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
      const newInputErrors = inputErrors.filter((_, i) => i !== index);
      setInputErrors(newInputErrors);
    }
  };

  const validateUrl = (url) => {
    const pattern = /^(https:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    const newInputErrors = urls.map(url => {
      if (!url) return 'URL is required';
      if (!validateUrl(url)) return 'Invalid URL';
      return '';
    });

    setInputErrors(newInputErrors);

    if (newInputErrors.some(error => error !== '')) {
      setError('Please correct the errors before submitting.');
      return;
    }

    const validUrls = urls.filter(Boolean).map(url => url.startsWith('https://') ? url : `https://${url}`);
    if (validUrls.length < 3) {
      setError('Please provide at least 3 valid URLs');
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/fetch-metadata', { urls: validUrls }, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken 
        },
        withCredentials: true 
    });
      setResults(response.data);
    } catch (error) {
      setError('An error occurred while fetching metadata');
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          URL Metadata Fetcher
        </Typography>
        <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
          <form onSubmit={handleSubmit}>
            {urls.map((url, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  fullWidth
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="Enter URL"
                  variant="outlined"
                  required
                  error={!!inputErrors[index]}
                  helperText={inputErrors[index]}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                  }}
                />
                {urls.length > 3 && (
                  <IconButton onClick={() => removeUrlInput(index)} color="secondary" sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addUrlInput}
              >
                Add URL
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Fetch Metadata
              </Button>
            </Box>
          </form>
        </Paper>
        {error && (
          <Typography color="error" variant="body1" align="center">
            {error}
          </Typography>
        )}
        <Box mt={4}>
          {results.map((result, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{result.title || 'No title'}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {result.description || 'No description'}
                </Typography>
                {result.error && (
                  <Typography color="error" variant="body2">
                    {result.error}
                  </Typography>
                )}
              </CardContent>
                <CardMedia
                  component="img"
                  height="340"
                  image={result.image?result.image:"https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq"}
                  alt={result.title}
                />
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default App;