import { supabase } from "./connection";

export const getIdSession = async () => {
  try {
    const data = await supabase.from("user").select("uuid_kolegahr").single();

    if (data) {
      return data;
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    return error.message;
  }
};

export const changelocalid = async ({ newUserId }: any) => {
  try {
    const data = await supabase
      .from("user")
      .update({ uuid_kolegahr: newUserId })
      .eq("id", 2);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
