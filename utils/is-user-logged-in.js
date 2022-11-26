export default function isUserLoggedIn(req) {
  return req.session.user !== undefined;
}
