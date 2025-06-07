
 import { db} from "$lib/firebase-admin";
import type { Actions, PageServerLoad } from "../$types";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "$env/static/private";
import { v2 as cloudinary } from 'cloudinary';

export const load: PageServerLoad = async ({params}) => {

  const {update} = params;
     
      

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


 export const actions: Actions = {

  update: async ({ request }) => {
     
        
        const formData = await request.formData();
        const name = formData.get('name');
        const category = formData.get('category');
        const description = formData.get('description');
        const technology = formData.get('technology');
        const link = formData.get('link');
        const screenshots = formData.getAll('screenshots');
        const screenshotsMobile = formData.getAll('screenshotsMobile');
        const featured = formData.getAll('featured');
        
        const technologyArray = typeof technology === 'string'
            ? technology.split(',').map(item => item.trim())
            : [];

        
        const featuredUrls = [];
        const screenshotsUrls= [];
        const screenshotsMobileUrls = [];
        
        
        
    for (const file of featured) {
      const imageUrl = await uploadToCloudinary(file);
      featuredUrls.push(imageUrl);
    }
    for (const file of screenshots) {
      const imageUrl = await uploadToCloudinary(file);
      screenshotsUrls.push(imageUrl);
    }
    for (const file of screenshotsMobile) {
      const imageUrl = await uploadToCloudinary(file);
      screenshotsMobileUrls.push(imageUrl);
    }


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
            const { update } = request.params || {};
            if (!update) {
              return fail(400, { error: "Project ID (slug) is required for update." });
            }

            const snapshot = await db.collection("projects")
              .where("slug", "==", update)
              .limit(1)
              .get();

            if (snapshot.empty) {
              return fail(404, { error: "Project not found." });
            }

            const docRef = snapshot.docs[0].ref;

            await docRef.update({
              name,
              slug,
              category,
              description,
              link,
              screenshots: screenshotsUrls,
              screenshotsMobile: screenshotsMobileUrls,
              technology: technologyArray,
              featured: featuredUrls
            });   return { success: true,
                 loading: true
             };
        } catch (error) {
            console.error("Create failed:", error);
            return fail(500, {error: true,
                message: "Error: " + error.message
            });
        }
    },

 }


 cloudinary.config({
   cloud_name: CLOUDINARY_CLOUD_NAME,
   api_key: CLOUDINARY_API_KEY,
   api_secret: CLOUDINARY_API_SECRET,
   secure: true // Use HTTPS
 });
 
 
 
 
 async function uploadToCloudinary(file: File): Promise<string> {
   const buffer = Buffer.from(await file.arrayBuffer());
 
   return new Promise((resolve, reject) => {
     cloudinary.uploader.upload_stream(
       { folder: 'portfolio' },
       (error, result) => {
         if (error || !result) {
           reject(error);
         } else {
           resolve(result.secure_url);
         }
       }
     ).end(buffer);
   });
 }