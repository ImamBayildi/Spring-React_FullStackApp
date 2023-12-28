import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;

})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: '200px', padding: '10px', margin: '25px', bgcolor:'' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
            {props.fullName[0]}
          </Avatar>
        }

        title={props.fullName}
        subheader={props.reportDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${atob(props.photo)}`}
        alt="Rapor Fotografi"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Tc: {props.tc}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Typography variant="body2" color="text.secondary">
          Son Tanı: {props.reports[0].diagnosis}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="daha fazlası"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Raporlar:</Typography>

          {props.reports.map((v) => {
            return (
              <Typography key={props.id} paragraph>
                {v.diagnosis}
              </Typography>
            )
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
