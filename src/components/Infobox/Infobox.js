import React from 'react';
import './Infobox.css'
import {Card, CardContent, Typography} from "@material-ui/core";

const Infobox = ({title, cases, total}) => {
  return (
      <Card className='infobox'>
        <CardContent>
          <Typography color="textSecondary" className='infobox__title'>
            {title}
          </Typography>
          <h2 className='infobox__cases'>{cases}</h2>
          <Typography color='textSecondary' className='infobox__total'>
            {total} Total
          </Typography>
        </CardContent>
      </Card>
  );
};

export default Infobox;
