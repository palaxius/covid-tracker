import React from 'react';
import './Infobox.css'
import {Card, CardContent, Typography} from "@material-ui/core";

const Infobox = ({title, cases, total, active, styleProp, ...props}) => {

  return (
      <Card
        className={`${active && 'infobox__selected'} infobox infobox__${styleProp}`}
        onClick={props.onClick}
      >
        <CardContent>
          <Typography color="textSecondary" className='infobox__title'>
            {title}
          </Typography>
          <h2 className={`infobox__cases infobox__cases-${styleProp}`}>{cases}</h2>
          <Typography color='textSecondary' className='infobox__total'>
            {total} Total
          </Typography>
        </CardContent>
      </Card>
  );
};

export default Infobox;
