import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeCard(props) {
    const ingredients = props.ingredients
    const instructions = props.instructions
    const number = props.number + 1
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="p-5">
            <Card className={classes.root}>
                <CardHeader
                    title={'Recipe no. ' + number}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {ingredients.map((e) => (
                        <h4>{e}</h4>
                    ))}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className="container mx-auto bg-purple-200 bg-opacity-20">
                    <CardContent>
                    <Typography paragraph>Instructions</Typography>
                    <Typography paragraph>
                        {instructions.map((e) => (
                            <h4>{e}</h4>))}
                    </Typography>
                    </CardContent>
                    </div>
                    
                </Collapse>
                </Card>
        </div>
        
    );
}

