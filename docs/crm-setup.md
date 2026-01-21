# Creator CRM V1 Setup

## Environment variables

Create a local `.env` file with:

```
DATABASE_URL="file:./dev.db"
APP_URL="http://localhost:3000"
SHOPIFY_SHOP_DOMAIN=""
SHOPIFY_ADMIN_API_TOKEN=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
AUTH_SECRET="b20bf5c335c64256b58e9e09e9183cc51212a52f3dfd42bfa24dea3863ed761a"
ADMIN_PASSWORD="38afc73db379485caf6356be"
```

## Notes
- Admin API + Stripe Connect are required for full functionality.
- Profit inputs (COGS / shipping / tax) are placeholders for now.
- Admin and creator routes are protected by session cookies.
i 