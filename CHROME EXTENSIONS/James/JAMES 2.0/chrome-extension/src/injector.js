import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://usxmcwfatfhvwfvqspil.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeG1jd2ZhdGZodndmdnFzcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMDI0NTcsImV4cCI6MjAxMjY3ODQ1N30.6ulYTo0WXXPJ_hFseZ5uZl_BJzg1iY7AN7h3ZyeXj-s"
);
async function loadData() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .single();

  if (error) {
    console.log(error);
    return;
  }

  return data;
}

// Autofill the form.
function autofillForm(data) {
  // Get the form elements.
  const nameField = document.getElementById("nameField");
  const emailField = document.getElementById("emailField");
  const addressField = document.getElementById("addressField");
  const phoneField = document.getElementById("phoneField");
  const commentsField = document.getElementById("commentsField");

  // Populate the form fields.
  nameField.value = data.name;
  emailField.value = data.email;
  addressField.value = data.address;
  phoneField.value = data.phone;
  commentsField.value = data.comments;
}


