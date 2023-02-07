import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { textAlign } from '@mui/system';

export default function MediaCard() {
  return (
    <Card sx={{ width: 500, maxHeight: 200 }}>
      <Grid container>
        <Grid item xs={5}>
          <CardMedia
          sx={{ height: 200, maxWidth: 180 }}
          image="https://randomuser.me/api/portraits/men/52.jpg"
          title="Owen Lopez"
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent textAlign="left">
            <Typography variant="h6" component="div">
            Quentin Roger (36 ans)
            </Typography>
            <Typography component="div">
            Saint-pierre, France
            </Typography>
            <Link variant="button" component="div">
            quentin.roger@example.com
            </Link>
            <Link variant="button" component="div">
            04-05-29-42-43
            </Link>
            <Typography component="div">
              Anniversaire: 11 décembre
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
    );
    }
