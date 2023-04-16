/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton, Grid, Box } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

function LED() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <IconButton color="primary" sx={{ color: 'green' }}>
            <LightbulbIcon sx={{ fontSize: '200px' }} />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Box display="flex" flexDirection="column" justifyContent="space-evenly" height="100%">
          <Box>
            <p>
              <strong>Green: Situation A</strong>
            </p>
            <p>
              A brief description of Situation A and its meaning.
            </p>
          </Box>
          <Box>
            <p>
              <strong>Yellow: Situation B</strong>
            </p>
            <p>
              A brief description of Situation B and its meaning.
            </p>
          </Box>
          <Box>
            <p>
              <strong>Red: Situation C</strong>
            </p>
            <p>
              A brief description of Situation C and its meaning.
            </p>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LED;
