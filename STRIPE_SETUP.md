# Stripe Integration Setup Guide

## Prerequisites
- Stripe account with API keys
- Next.js project with the environment variables configured

## Step 1: Environment Variables
Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 2: Create Recurring Product in Stripe Dashboard
1. Log into your Stripe Dashboard
2. Go to Products > Add Product
3. Create a recurring product (e.g., "$5/month donation")
4. Note the Price ID (e.g., `price_1YourRecurringPriceId`)

## Step 3: Using the Stripe Checkout Component

### Basic Usage
```tsx
import { StripeCheckout } from '@/app/components/StripeCheckout';

export default function DonationPage() {
  return (
    <div>
      <h1>Support My Work</h1>
      <StripeCheckout 
        priceId="price_1YourRecurringPriceId"
        buttonText="Donate $5/month"
      />
    </div>
  );
}
```

### Advanced Usage with Custom Styling
```tsx
import { StripeCheckout } from '@/app/components/StripeCheckout';

export default function DonationPage() {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4">Support My Projects</h2>
      <p className="mb-6 text-gray-600">
        Help me continue building awesome tools and content!
      </p>
      <StripeCheckout 
        priceId="price_1YourRecurringPriceId"
        buttonText="Start Monthly Donation"
        className="text-lg px-8 py-4"
      />
    </div>
  );
}
```

## Step 4: Direct API Usage
If you need more control, you can use the utility function directly:

```tsx
import { createCheckoutSession } from '@/app/utils/stripe';

const handleDonation = async () => {
  try {
    await createCheckoutSession('price_1YourRecurringPriceId');
  } catch (error) {
    console.error('Checkout failed:', error);
  }
};
```

## API Endpoints

### POST /api/stripe/checkout
Creates a Stripe checkout session for recurring subscriptions.

**Request Body:**
```json
{
  "priceId": "price_1YourRecurringPriceId"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_..."
}
```

## Success and Cancel Pages
- Success page: `/success` - Shown after successful payment
- Cancel page: `/cancel` - Shown when user cancels payment

## Testing
1. Use test mode keys for development
2. Test with Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## Production Deployment
1. Replace test keys with live keys in production
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Ensure webhook endpoints are configured in Stripe Dashboard

## Security Notes
- Never expose `STRIPE_SECRET_KEY` on the client side
- Always validate webhook signatures in production
- Use environment variables for all sensitive data 