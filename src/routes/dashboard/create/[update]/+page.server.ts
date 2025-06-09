
 import { db} from "$lib/firebase-admin";
import type { Actions, PageServerLoad } from "../$types";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "$env/static/private";
import { v2 as cloudinary } from 'cloudinary';
import { fail } from "@sveltejs/kit";
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
            const projects = snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              category: doc.data().category,
              description: doc.data().description,
              link: doc.data().link,
              screenshots: doc.data().screenshots,
              screenshotsMobile: doc.data().screenshotsMobile,
              technology: doc.data().technology,
              featured: doc.data().featured
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

  update: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const category = formData.get('category');
    const description = formData.get('description');
    const technology = formData.get('technology');
    const link = formData.get('link');

    const existingScreenshots = formData.getAll('screenshots') as string[];
    const existingScreenshotsMobile = formData.getAll('screenshotsMobile') as string[];

    const newScreenshotsFiles = formData.getAll('newScreenshots') as File[];
    const newScreenshotsMobileFiles = formData.getAll('newScreenshotsMobile');
    const newFeaturedFile = formData.getAll('newFeatured') as File[] || null;

    let featured = formData.get('featured') as string | null; 

    const technologyArray = typeof technology === 'string'
        ? technology.split(',').map(item => item.trim())
        : [];

    if (newFeaturedFile && newFeaturedFile.length > 0) {
        for (const file of newFeaturedFile) {
            if (file instanceof File && file.size > 0) { 
                const imageUrl = await uploadToCloudinary(file);
                featured = imageUrl;
                break; 
            }
        }
    }

    const newScreenshotsUrls: string[] = [];
    for (const file of newScreenshotsFiles) {
        if (file instanceof File && file.size > 0) {
            const imageUrl = await uploadToCloudinary(file);
            newScreenshotsUrls.push(imageUrl);
        }
    }

    const newScreenshotsMobileUrls: string[] = [];
    for (const file of newScreenshotsMobileFiles) {
        if (file instanceof File && file.size > 0) {
            const imageUrl = await uploadToCloudinary(file);
            newScreenshotsMobileUrls.push(imageUrl);
        }
    }

    if (typeof name !== 'string' || !name.trim()) {
        return fail(400, { error: "Project name is required." });
    }

    try {
        const { update } = params || {};
        if (!update) {
            return fail(400, { error: "No Project with this name is required for update." });
        }

        const snapshot = await db.collection("projects")
            .where("slug", "==", update)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return fail(404, { error: "Project not found." });
        }
        

        const docRef = snapshot.docs[0].ref;

        const finalScreenshots = [...existingScreenshots, ...newScreenshotsUrls];
        const finalScreenshotsMobile = [...existingScreenshotsMobile, ...newScreenshotsMobileUrls];

        await docRef.update({
            name,
            category,
            description,
            link,
            screenshots: finalScreenshots,
            screenshotsMobile: finalScreenshotsMobile,
            technology: technologyArray,
            featured
        });

        return {
            success: true,   
        };
    } catch (error: unknown) {
        console.error("Update failed:", error);
        const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
        return fail(500, {
            error: true,
            message: "Error: " + errorMessage
        });
    }
}
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