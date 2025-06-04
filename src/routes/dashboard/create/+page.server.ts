import { db } from "$lib/firebase-admin";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

 export const load: PageServerLoad = async () => {
    

    const snapshot = await db.collection('projects').select("name", "featured", "slug").get();


    const projects = snapshot.docs.map(doc=> ({

         id: doc.id,
         name: doc.data().name,
         featured: doc.data().featured,
         slug: doc.data().slug
         
    }))

    return {
        projects
    }

 }

export const actions: Actions = {

    delete: async ({ request }) => {

        const formData = await request.formData();
        const id = formData.get('id');

        if (typeof id !== 'string') {
            return fail(400, { error: "Invalid project ID." });
        }

        try {
            await db.collection("projects").doc(id).delete();
            return { success: true };
        } catch (error) {
            console.error("Delete failed:", error);
            return fail(500, { error: "Failed to delete contact." });
        }
    },

    create: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const category = formData.get('category');
        const description = formData.get('description');
        const technology = formData.get('technology');
        const link = formData.get('link');
        const screenshots = formData.get('screenshots');
        const screenshotsMobile = formData.get('screenshotsMobile');
        const featured = formData.get('featured');

        if (typeof name !== 'string' || !name.trim()) {
            return fail(400, { error: "Project name is required." });
        }

        // Sluggify the name
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing -

        try {
            await db.collection("projects").add({
                name,
                slug,
                category,
                description,
                link,
                screenshots,
                screenshotsMobile,
                technology,
                featured
            });
            return { success: true };
        } catch (error) {
            console.error("Create failed:", error);
            return fail(500, { error: "Failed to create project." });
        }
    }
}