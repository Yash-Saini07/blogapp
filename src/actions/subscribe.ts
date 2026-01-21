'use server' // <--- Crucial! This runs on the server, not the browser.

import dbConnect from '@/lib/database';
import Subscriber from '@/models/subscriber';

export async function subscribeUser(formData: FormData) {
  // 1. Get the email from the form
  const email = formData.get('email');

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    // 2. Connect to DB
    await dbConnect();

    // 3. Create the new subscriber
    // (This will fail if email already exists because of unique: true)
    await Subscriber.create({ email });

    return { success: true, message: "Thank you for subscribing!" };
    
  } catch (error : any) {
    // Handle duplicates (Code 11000 is Mongo's "Duplicate Key" error)
    if (error.code === 11000) {
      return { success: false, message: "You are already subscribed!" };
    }
    return { success: false, message: "Something went wrong. Try again." };
  }
}