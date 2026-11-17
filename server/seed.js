import  movies from './content.js';
import { openai, supabase } from './config.js';

async function createAndStoreEmbeddings(input) {
  const data = await Promise.all(
    input.map(async (movie) => {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: movie.content
      });
      return { 
        content: movie.content, 
        embedding: embeddingResponse.data[0].embedding 
      }
    })
  );
  const {error } = await supabase.from('movies').insert(data)
  console.log(error ? `Error inserting data: ${error.message}` : 'Data inserted successfully');
} 

createAndStoreEmbeddings(movies)