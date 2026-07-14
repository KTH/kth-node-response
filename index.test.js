const response = require('./index')

function createRes() {
  return {
    statusCode: undefined,
    headers: {},
    sent: undefined,
    ended: false,
    endData: undefined,
    endEncoding: undefined,
    header(name, value) {
      this.headers[name] = value
    },
    setHeader(name, value) {
      this.headers[name] = value
    },
    send(data) {
      this.sent = data
    },
    end(data, encoding) {
      this.ended = true
      this.endData = data
      this.endEncoding = encoding
    },
  }
}

test('json sets status, content-type, and sends payload', () => {
  const res = createRes()

  response.json(res, { ok: true }, 201)

  expect(res.statusCode).toBe(201)
  expect(res.headers['Content-Type']).toBe('application/json; charset=utf-8')
  expect(res.sent).toEqual({ ok: true })
})

test('notFound uses default message', () => {
  const res = createRes()

  response.notFound(res)

  expect(res.statusCode).toBe(404)
  expect(res.sent).toBe('404 Page Not Found')
})

test('redirect sets location header and ends response', () => {
  const res = createRes()

  response.redirect(res, '/new-url')

  expect(res.statusCode).toBe(301)
  expect(res.headers.Location).toBe('/new-url')
  expect(res.ended).toBe(true)
})

test('jsonErrorResponse sends expected error shape', () => {
  const res = createRes()

  response.jsonErrorResponse(res, 422, 'validation.error', 'MISSING_FIELD', 'name is required')

  expect(res.statusCode).toBe(422)
  expect(res.headers['Content-Type']).toBe('application/json; charset=utf-8')
  expect(res.sent).toEqual({
    messageKey: 'validation.error',
    errKey: 'MISSING_FIELD',
    errorMessage: 'name is required',
  })
})

test('svg sets svg and vary headers and ends response', () => {
  const res = createRes()

  response.svg(res, '<svg></svg>')

  expect(res.statusCode).toBe(200)
  expect(res.headers['Content-Type']).toBe('image/svg+xml')
  expect(res.headers.Vary).toBe('Accept-Encoding')
  expect(res.ended).toBe(true)
  expect(res.endData).toBe('<svg></svg>')
})
