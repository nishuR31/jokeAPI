
 import express


let helpRouter= asyncHandler(async (req, res) => {
    return res.status(codes.ok).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Joke API Helper</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body
    class="bg-gradient-to-tl from-black via-gray-700 to-black text-white min-h-screen p-4 sm:p-6"
  >
    <div
      class="w-full mx-auto bg-transparent backdrop-blur-xs p-6 sm:p-8 rounded-2xl shadow-2xl"
    >
      <!-- Heading -->
      <h1
        class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-transparent via-[#ffffff11] to-transparent p-4 rounded-xl shadow-xl"
      >
        Joke API Helper
      </h1>

      <hr
        class="h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent border-0 rounded-full mb-8"
      />

      <!-- Homepage Route -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-gray-300 mb-2">
          Homepage Route
        </h2>
        <p class="text-gray-300">
          <span class="font-semibold">Home page:</span>
          <a
            href="/api/v1"
            class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
          >
            <code>/api/v1</code>
          </a>
          – Shows welcome or API root page.
        </p>
      </section>

      <!-- Routes Overview -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-gray-300 mb-4">
          Routes Overview
        </h2>
        <div class="space-y-3 text-gray-200 text-sm sm:text-base">
          <div>
            <span>- Get a joke by tags</span> • <strong>GET</strong>:
            <a
              href="/joke-api/joke?tags=tag1&tags=tag2"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/joke?tags=tag1&amp;tags=tag2
            </a>
          </div>
          <div>
            <span>- Get all jokes with optional tags</span> •
            <strong>GET</strong>:
            <a
              href="/joke-api/jokes?tags=tag1&tagNames=tag2"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/jokes?tags=tag1&amp;tagNames=tag2
            </a>
          </div>
          <div>
            <span>- Get joke by ID</span> • <strong>GET</strong>:
            <a
              href="/joke-api/:id"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/:id
            </a>
          </div>
          <div>
            <span>- Submit a new joke</span> • <strong>POST</strong>:
            <a
              href="/joke-api/joke"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/joke
            </a>
          </div>
          <div>
            <span>- Delete a joke by ID</span> • <strong>DELETE</strong>:
            <a
              href="/joke-api/:id/delete"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/:id/delete
            </a>
          </div>
          <div>
            <span>- Edit a joke by ID</span> • <strong>PUT</strong>:
            <a
              href="/joke-api/:id/edit"
              class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] px-3 to-transparent px-3 py-1 rounded shadow hover:shadow-white/20 transition"
            >
              /joke-api/:id/edit
            </a>
          </div>
        </div>
      </section>

      <!-- POST Format -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-gray-300 mb-2">
          POST /joke Body Format
        </h2>
        <pre
          class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] p-3 to-transparent rounded shadow hover:shadow-white/20 transition border-none rounded p-4 text-sm overflow-x-auto text-gray-100"
        >
        <code>{
  "joke": "Why did the chicken cross the road?",
  "tags": ["animal", "classic"],
  "rating": 4.5
}</code></pre>
      </section>

      <!-- Pagination -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-gray-300 mb-2">
          Pagination Support
        </h2>
        <p class="text-gray-400 mb-2">
          Use
          <code class="bg-gray-800 text-white px-2 py-1 rounded">page</code> and
          <code class="bg-gray-800 text-white px-2 py-1 rounded">limit</code>
          query parameters with jokes endpoint:
        </p>
        <pre
          class="inline-block ml-2 bg-gradient-to-r from-transparent via-[#ffffff44] p-3 to-transparent rounded shadow hover:shadow-white/20 transition border-none rounded p-4 text-sm overflow-x-auto text-gray-100"
        >
        <code>GET /joke-api/jokes?page=2&limit=10</code></pre>
        <p class="text-gray-400 mt-2">
          This returns the second page of jokes with 10 items per page.
        </p>
      </section>

      <!-- Footer -->
      <footer class="mt-12 text-sm text-gray-500 text-center">
        Joke API Route Documentation
      </footer>
    </div>
  </body>
</html>
`);
  })

export default helpRouter;
