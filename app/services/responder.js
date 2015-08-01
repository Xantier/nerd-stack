export default function respond(req, res, data) {
  if (req.xhr) {
    res.json(data);
  } else {
    req.flash('message', data.data);
    res.redirect(req.get('Referrer'));
  }
}
