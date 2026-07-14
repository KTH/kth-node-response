/**
 * Utility for returning html responses to browser.
 */

const CONST_CONTENT_TYPE = 'Content-Type'
const CONST_CONTENT_DISP = 'Content-Disposition'
const CONST_LOCATION = 'Location'
const CONST_TYPE_JSON = 'application/json; charset=utf-8'
const CONST_TYPE_XLS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const CONST_TYPE_SVG = 'image/svg+xml'
const CONST_TYPE_TEXT = 'text/plain'
const CONST_VARY = 'Vary'
const CONST_VARY_ACCEPT_ENCODING = 'Accept-Encoding'

function jsonErrorResponse(res, statusCode, messageKey, errKey, errorMessage) {
  res.statusCode = statusCode
  res.header(CONST_CONTENT_TYPE, CONST_TYPE_JSON)
  const errorJsonResponse = { messageKey, errKey, errorMessage }
  res.send(errorJsonResponse)
}

function notFound(res, message) {
  res.statusCode = 404
  if (message) {
    res.send(message)
  } else {
    res.send('404 Page Not Found')
  }
}

function error(res, err) {
  res.statusCode = 500
  if (err) {
    res.send('500 Internal Server Error: ' + err)
  } else {
    res.send('500 Internal Server Error')
  }
}

function json(res, data, statusCode) {
  res.statusCode = statusCode || 200
  res.header(CONST_CONTENT_TYPE, CONST_TYPE_JSON)
  res.send(data)
}

function redirect(res, location) {
  res.statusCode = 301
  res.header(CONST_LOCATION, location)
  res.end()
}

function unauthorized(res, data) {
  res.statusCode = 401
  res.send(data || 'unauthorized')
}

function forbidden(res, data) {
  res.statusCode = 403
  res.send(data || 'forbidden')
}

function jsonError(res, messageKey, errKey, errorMessage) {
  jsonErrorResponse(res, 500, messageKey, errKey, errorMessage)
}

function excel(res, data, fileName) {
  res.statusCode = 200
  res.setHeader(CONST_CONTENT_DISP, 'attachment; filename="' + fileName + '"')
  res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_XLS)
  res.end(data, 'binary')
}

function text(res, data) {
  res.statusCode = 200
  res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_TEXT)
  res.end(data)
}

function svg(res, data) {
  res.statusCode = 200
  res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_SVG)
  res.setHeader(CONST_VARY, CONST_VARY_ACCEPT_ENCODING)
  res.end(data)
}

module.exports = {
  /**
   * Status code 404. Page not found.
   */
  notFound,

  /**
   * Status code 500, internal server error.
   */
  error,

  /**
   * Status code 200 with content-type application/json
   */
  json,

  /**
   * Status code 301 redirect, location provided as argument
   */
  redirect,

  /**
   * Status code 401 with content-type application/json
   */
  unauthorized,

  /**
   * Status code 403 with content-type application/json
   */
  forbidden,

  /**
   * Status code 500 with content-type application/json
   *
   * messageKey and errKey should be keys that match
   * a language translation construct
   */
  jsonError,

  /**
   * Customizable status code with content-type application/json
   *
   * messageKey and errKey should be keys that match
   * a language translation construct
   */
  jsonErrorResponse,

  /**
   * Status code 200 with content-type application/vnd.openxmlformats
   *
   * Returns a binary excel file
   */
  excel,

  /**
   * Status code 200 with content-type image/svg+xml
   *
   * Returns a svg file
   */
  svg,

  /**
   * Status code 200 with content-type text/plain
   *
   * Returns a plain text string
   */
  text,
}
