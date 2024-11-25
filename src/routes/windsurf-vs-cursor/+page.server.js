/** @type {import('./$types').PageServerLoad} */
import { adminAuth, adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load() {

    const pollRef = adminDB.collection('polls').doc('windsurf-vs-cursor');
    const pollDoc = await pollRef.get();

    console.log("poll: ", pollDoc.data());

    return {};
};