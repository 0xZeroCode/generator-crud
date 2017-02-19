var tokenKey = 'Authorization';

function getAuthHeaderConfig(header) {
  return {headers: {'Authorization': header, 'Content-Type': 'application/json'}};
}
