import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [form, setForm] = useState({
    name: user.firstName,
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!form.prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);
      const response = await fetch("https://dall-e-clone-srv.onrender.com/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.prompt || !form.photo)
      return alert("Please enter a prompt and generate an image");

    setLoading(true);
    try {
      const response = await fetch("https://dall-e-clone-srv.onrender.com/api/v1/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      await response.json();
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSupriseMe = () => {
    const randPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-between">
      <div className="flex-1">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
            Create imaginative and visually stunning images through DALL-E AI
            and share them with the community
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A plush toy robot sitting against a yellow wall"
              value={form.prompt}
              handleChange={handleChange}
              isSupriseMe
              handleSupriseMe={handleSupriseMe}
            />
            <div className="mt-5 flex flex-col md:flex-row gap-5">
              <button
                type="button"
                onClick={generateImage}
                className="text-white bg-green-700 font-medium rounded-md text-sm px-5 py-2.5 text-center md:w-auto"
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
              <div className="flex md:hidden justify-center items-center w-full sm:w-auto">
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-96 flex justify-center items-center">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-9/12 h-9/12 object-contain opacity-40"
                    />
                  )}
                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <p className="mt-2 text-[#666e75] text-[14px]">
                Once you have created the image you want, you can share it with
                others in the community
              </p>
              <button
                type="submit"
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full md:w-auto px-5 py-2.5 text-center"
              >
                {loading ? "Sharing..." : "Share with the community"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden md:flex justify-center items-center w-full md:w-auto ">
        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-96 p-3 h-96 flex justify-center items-center shadow-card shadow-slate-300 ">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain opacity-40"
            />
          )}
          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default CreatePost;
