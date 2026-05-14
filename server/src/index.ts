const port = Number(Bun.env.PORT ?? 3000)

const server = Bun.serve({
  port,
  fetch() {
    return new Response(JSON.stringify({ status: 'ok', service: 'server' }), {
      headers: {
        'content-type': 'application/json',
      },
    })
  },
})

console.log(`Server running at http://localhost:${server.port}`)
