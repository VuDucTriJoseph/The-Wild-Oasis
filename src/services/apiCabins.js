import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  // https://nywmlqwstwsgkqvbklbs.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  // 1.create/edit cabin
  let query = supabase.from("cabins");

  // a. create new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b. edit cabin

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be added");
  }

  //2. Uploade image
  if (hasImagePath) return data;

  const { error: imageerror } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (imageerror) {
    console.error(imageerror);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded and the cabin was not created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be delete");
  }
}
