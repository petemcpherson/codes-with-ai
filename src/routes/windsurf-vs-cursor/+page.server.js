import { adminDB } from '$lib/server/admin';
import { fail } from '@sveltejs/kit';

export async function load() {
    const pollRef = adminDB.collection('polls').doc('windsurf-vs-cursor');
    const pollDoc = await pollRef.get();
    
    if (!pollDoc.exists) {
        // Initialize the poll if it doesn't exist
        await pollRef.set({
            cursor: 0,
            windsurf: 0,
            totalVotes: 0
        });
        return {
            pollData: {
                cursor: 0,
                windsurf: 0,
                totalVotes: 0
            }
        };
    }

    return {
        pollData: pollDoc.data()
    };
}

export const actions = {
    vote: async ({ request }) => {
        const formData = await request.formData();
        const choice = formData.get('choice');

        if (!choice || (choice !== 'cursor' && choice !== 'windsurf')) {
            return fail(400, { error: 'Invalid choice' });
        }

        const pollRef = adminDB.collection('polls').doc('windsurf-vs-cursor');
        
        try {
            await adminDB.runTransaction(async (transaction) => {
                const pollDoc = await transaction.get(pollRef);
                const currentData = pollDoc.data();
                
                transaction.update(pollRef, {
                    [choice]: currentData[choice] + 1,
                    totalVotes: currentData.totalVotes + 1
                });
            });

            return { success: true };
        } catch (error) {
            return fail(500, { error: 'Failed to submit vote' });
        }
    }
}; 