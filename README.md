## Hello 👋
This is an implementation of Shopping Cart using NextJS app router. Showcases appropriate rendering choices and an authentication system built with all the best practices.

### Tech Stack

- Next.js 13+ (with App Router)
- TypeScript
- Tailwind CSS
- Custom JWT Authentication

### A Quick Summary

> This project is rolling JWT auth made & tested within mere 3 days time. (You can actually see the commits!)

All the pages in the app are rendered thoughtfully either on server or client. Here's a quick summary

| Route     | Rendering Style                     |
| --------- | ----------------------------------- |
| /         | Server Side                         |
| /signin   | Server Side                         |
| /signup   | Server Side                         |
| /products | Server Side (sorting - client side) |
| /cart     | Server Side                         |
| /unauth   | Server Side                         |

Additionally, it also has server-side APIs, which are called when a client component needs some data.

Apart from that, the components which use client side features are rendered client side.

I have made sure that it checks out all the requirements specified in the document.

### Notes about folder structure

This project uses NextJS App Router. Which means every page has following structure -

| file               | actual pathname |
| ------------------ | --------------- |
| /cart/page.tsx     | /cart           |
| /products/page.tsx | /products       |
| /signin/page.tsx   | /signin         |
| /signup/page.tsx   | /signup         |
| /unauth/page.tsx   | /unauth         |

And for API Routes -
`/api/cart/route.ts` is actually `api/cart/`

- Each folder also contains components specific to it, which are not reusable elsewhere.
- Most of these specific components mostly wrap around or are a composition of highly reusable components, which are stored in /components. e.g. - `SortDropdown` is a wrapper around `Dropdown`

### Docs

> I am trying to add Documentation As soon as I can, if you happen see this before that, Please wait for a bit !
