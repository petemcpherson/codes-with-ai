import { adminDB } from '$lib/server/admin';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { choice } = await request.json();
    
    const pollRef = adminDB.collection('polls').doc('windsurf-vs-cursor');
    
    // Use a transaction to safely update the vote counts
    await adminDB.runTransaction(async (transaction) => {
        const pollDoc = await transaction.get(pollRef);
        const currentData = pollDoc.data();
        
        transaction.update(pollRef, {
            [choice]: currentData[choice] + 1,
            totalVotes: currentData.totalVotes + 1
        });
    });

    return json({ success: true });
} 