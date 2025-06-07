
 import { db} from "$lib/firebase-admin";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({params}) => {

  const { update } = params;
     
      

      if (!update)
    throw new Error("Project slug is required");
     const slug = update;
    try {

        const snapshot = await db.collection("projects")
      .where("slug", "==", slug) 
      .limit(1) 
      .get();

        let project = null;

         if(!snapshot.empty) {
            const projects = snapshot.docs.map(docs => ({

                id: docs.id,
                ...docs.data()
            }));

            project = projects[0] || null;
            return {project};
         }



    } catch (error) {
    console.error('Failed to load project:', error);
    return { project: null };
  }


     
 }