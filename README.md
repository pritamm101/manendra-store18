# Manendra Store — starter website

A beginner-friendly static storefront with a black-and-gold luxury look, product categories, cart, and WhatsApp order messages.

## Before publishing
1. Open `script.js`.
2. Replace `91XXXXXXXXXX` in `WHATSAPP_NUMBER` with your WhatsApp number including India country code. Example format: `919876543210`. Do not include `+`, spaces, or dashes.
3. In the `products` array, replace demo names, categories, prices, tags, and image URLs with your real product details. Only use photos you have permission to use.
4. Save and open `index.html` in a browser to test.

## Files
- `index.html` — page structure
- `style.css` — responsive black-and-gold design
- `script.js` — sample products, category filters, cart and WhatsApp order logic

## Publish for free with Cloudflare Pages (GitHub method)
1. Create/sign in to GitHub.
2. Create a new repository named `manendra-store`.
3. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
4. Sign in to Cloudflare and open Workers & Pages.
5. Choose Create application / Pages / Connect to Git, then choose the `manendra-store` repository.
6. Use production branch `main`. For a plain static website, use build command `exit 0` (or leave blank if the dashboard allows it) and build output directory `.` if accepted by the setup. Deploy.
7. Open the generated `*.pages.dev` address and test on phone and desktop.

## Alternative: direct upload
Cloudflare Pages supports drag-and-drop direct upload for static files. Upload the three website files (`index.html`, `style.css`, `script.js`) and deploy. If you use direct upload, note that Cloudflare says you cannot later switch that same project to Git integration; choose the route you prefer.

## Important limits
- This is a front-end demo, not a full e-commerce backend.
- Cart contents are not stored in a server database.
- Orders are sent to WhatsApp; no online payment is processed.
- Product prices and availability are sample values until you replace them.
- Confirm order details, delivery charges, returns and any applicable business requirements before taking real orders.
