
import { db } from "$lib/firebase-admin";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {

    const snapshot =  await db.collection("contacts").select("email", "message","createdAt").orderBy('createdAt').get();
    const contacts = snapshot.docs.map(doc=>  ({
        id:doc.id,
        email: doc.data().email,
        message: doc.data().message,
        createdAt: doc.data().createdAt,
        ...doc.data()
    })
    
    ) 
     return {
     contacts
   };

}


export const actions: Actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const ids = formData.getAll("ids").map((id) => id.toString());

        if (ids.length === 0) {
            return fail(400, { error: "No IDs provided." });
        }

        try {
            const batch = db.batch();
            ids.forEach(id => {
                const docRef = db.collection("contacts").doc(id);
                batch.delete(docRef);
            });

            await batch.commit();

            return { success: true };
        } catch (error) {
            console.error("Batch delete failed:", error);
            return fail(500, { error: "Failed to delete contacts." });
        }
    }
};

