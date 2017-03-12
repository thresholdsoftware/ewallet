import React, {PropTypes} from 'react';

const JSONTableViewer = ({headers = [], data = []}) =>
(<table>
  <thead>
    <tr>{headers.map((eachHeader, i) => <td key={i}>{eachHeader}</td>)}</tr>
  </thead>
  <tbody>
    {
        data.map((row, index) => <tr key={index}>{headers.map((eachHeader, i) => <td key={i}>{row[eachHeader]}</td>)}</tr>)
    }
  </tbody>
</table>
);

JSONTableViewer.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default JSONTableViewer;
