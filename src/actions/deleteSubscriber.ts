'use server'

import connectDB from '@/lib/database';
import Subscriber from '@/models/subscriber';
import { revalidatePath } from 'next/cache';

export async function deleteSubscriber(formData: FormData) {
  const id = formData.get('id');

  if (id) {
    await connectDB();
    await Subscriber.findByIdAndDelete(id);
    
    // Refresh the subscriptions page so the deleted item disappears immediately
    revalidatePath('/admin/subscriptions');
  }
}