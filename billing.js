import stripePackage from 'stripe';
import { calculateCost } from './libs/billing-lib.js';
import { success, failure } from './libs/response-lib';

export async function main(event) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd',
    });

    return success({ status: true });
  } catch (err) {
    return failure({ message: err.message });
  }
}
