import { secondaryApiUrl } from '../static/apiUrls';

const getNames = () => fetch(`${secondaryApiUrl}/?inc=name&nat=au,ca,gb,ie,us&results=100`)
  .then(response => response.json())
  .then(data => data.results);

export default getNames;
