import React from 'react';
import numeral from "numeral";
import './Table.css'

const Table = ({countries}) => {
  return (
    <div className='table'>
      {
        countries.map(({country, cases}, index) => (
          <tr key={index}>
            <td>{country}</td>
            <td style={{fontWeight: '700'}}>{numeral(cases).format("0,0")}</td>
          </tr>
        ))
      }
    </div>
  );
};

export default Table;
