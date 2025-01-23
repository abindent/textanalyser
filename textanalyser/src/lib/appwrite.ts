import type { Dispatch, SetStateAction } from "react";
import { Client, Databases, Models, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

function getDocuments(dispatchFunc: Dispatch<any>) {
  const documents = databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    []
  );
  documents.then(
    function (response) {
      dispatchFunc(response.documents);
    },
    function (error: Error) {
      throw Error(`${error.name}: ${error.message}`);
    }
  );
}

function getDocument(slug: string, dispatchFunc: Dispatch<any>) {
  const document = databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    [Query.equal("slug", slug)]
  );

  document.then(
    function (response) {
      dispatchFunc(response.documents[0]);
    },
    function (error: Error) {
      throw Error(`${error.name}: ${error.message}`);
    }
  );
}

export { getDocuments, getDocument };
