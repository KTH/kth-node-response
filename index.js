/**
 * Utility for returning html responses to browser.
 */

module.exports = (function () {
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

  function _notFound(res, message) {
    res.statusCode = 404
    if (message) {
      res.send(message)
    } else {
      res.send('404 Page Not Found')
    }
  }

  function _error(res, err) {
    res.statusCode = 500
    if (err) {
      res.send('500 Internal Server Error: ' + err)
    } else {
      res.send('500 Internal Server Error')
    }
  }

  function _json(res, data, statusCode) {
    res.statusCode = statusCode || 200
    res.header(CONST_CONTENT_TYPE, CONST_TYPE_JSON)
    res.send(data)
  }

  function _redirect(res, location) {
    res.statusCode = 301
    res.header(CONST_LOCATION, location)
    res.end()
  }

  function _unauthorized(res, data) {
    res.statusCode = 401
    res.header(CONST_CONTENT_TYPE, CONST_TYPE_JSON)
    res.send(data || 'unauthorized')
  }

  function _jsonError(res, messageKey, errKey, errorMessage) {
    jsonErrorResponse(res, 500, messageKey, errKey, errorMessage)
  }

  function _excel(res, data, fileName) {
    res.statusCode = 200
    res.setHeader(CONST_CONTENT_DISP, 'attachment; filename="' + fileName + '"')
    res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_XLS)
    res.end(data, 'binary')
  }

  function _text(res, data) {
    res.statusCode = 200
    res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_TEXT)
    res.end(data)
  }

  function _svg(res, data) {
    res.statusCode = 200
    res.setHeader(CONST_CONTENT_TYPE, CONST_TYPE_SVG)
    res.setHeader(CONST_VARY, CONST_VARY_ACCEPT_ENCODING)
    res.end(data)
  }

  return {
    /**
     * Status code 404. Page not found.
     */
    notFound: _notFound,

    /**
     * Status code 500, internal server error.
     */
    error: _error,

    /**
     * Status code 200 with content-type application/json
     */
    json: _json,

    /**
     * Status code 301 redirect, location provided as argument
     */
    redirect: _redirect,

    /**
     * Status code 401 with content-type application/json
     */
    unauthorized: _unauthorized,

    /**
     * Status code 500 with content-type application/json
     *
     * messageKey and errKey should be keys that match
     * a language translation construct
     */
    jsonError: _jsonError,

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
    excel: _excel,

    /**
     * Status code 200 with content-type image/svg+xml
     *
     * Returns a svg file
     */
    svg: _svg,

    /**
     * Status code 200 with content-type text/plain
     *
     * Returns a plain text string
     */
    text: _text,
  }
})()
