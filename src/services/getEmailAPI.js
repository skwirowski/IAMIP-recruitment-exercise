import { secondaryApiUrl } from '../static/apiUrls';

const getEmail = () => fetch(`${secondaryApiUrl}/?inc=email&nat=au,ca,gb,ie,us`)
  .then(response => response.json())
  .then(data => data.results[0].email);

export default getEmail;
