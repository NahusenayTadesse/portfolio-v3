import { db } from "$lib/firebase-admin";
import { fail } from "@sveltejs/kit";

import type { PageServerLoad, Actions } from "./$types";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "$env/static/private";
import { v2 as cloudinary } from 'cloudinary';

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
            
            await db.collection("projects").add({
                name,
                slug,
                category,
                description,
                link,
                screenshots: screenshotsUrls,
                screenshotsMobile: screenshotsMobileUrls,
                technology: technologyArray,
                featured: featuredUrls
            });
            return { success: true,
                 loading: true
             };
        } catch (error) {
            console.error("Create failed:", error);
            return fail(500, {error: true,
                message: "Error: " + error.message
            });
        }
    },


    // Assuming streamToBuffer is defined correctly above
// Assuming Firebase Admin SDK and Cloudinary config are initialized correctly above

test: async ({ request }) => {
  try {
    const formData = await request.formData();
    const imageFiles = formData.getAll('image');
    const imageUrls = [];

    if (!imageFiles || imageFiles.length === 0) {
      return fail(400, {
        error: true,
        message: 'No image file provided or file is empty.'
      });
    }

    for (const file of imageFiles) {
      const imageUrl = await uploadToCloudinary(file);
      imageUrls.push(imageUrl);
    }

    return {
      success: true,
      message: 'Portfolio item added successfully',
      imageUrls
    };

  } catch (err) {
    console.error(err);
    return fail(500, {
      error: true,
      message: 'Something went wrong during upload.'
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