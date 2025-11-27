"use server";

import { Client, TablesDB, Query } from "node-appwrite";



const client = new Client()

    .setEndpoint("https://fra.cloud.appwrite.io/v1")

    .setProject(process.env.APPWRITE_PROJECT_ID as string)

    .setKey(process.env.APPWRITE_API_KEY as string);



const getDocuments = async () => {

    try {

        const databases = new TablesDB(client);

        const response = await databases.listRows({

            databaseId: process.env.APPWRITE_DATABASE_ID as string,

            tableId: process.env.APPWRITE_TABLE_ID as string,

            queries: [

                Query.equal("is_published", true),

                Query.orderDesc("$createdAt"),

            ],

        });
        return response.rows;

    } catch (error) {

        console.error("Appwrite Error:", error);

        throw new Error("Failed to fetch blogs");

    }

};

const fetchBlog = (slug: string): Promise<any> => {

    const documents = new TablesDB(client);

    return documents.listRows({

        databaseId: process.env.APPWRITE_DATABASE_ID as string,

        tableId: process.env.APPWRITE_TABLE_ID as string,

        queries: [Query.equal("slug", slug), Query.equal("is_published", true)]

    });

}


export { getDocuments, fetchBlog }