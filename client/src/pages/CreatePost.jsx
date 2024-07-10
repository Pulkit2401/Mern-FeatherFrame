import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import c1Background from '../assets/c1.jpg'; // Import the background image


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generatingImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/replicate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: data.photo });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-white text-[32px]">Create</h1>
        <p className="mt-2 text-gray-300 text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through Stability AI and
          share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setShowModal(true)}
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                // className="object-contain"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generatingImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
          {/* <button
            type="button"
            onClick={() => navigate('/')}
            className="text-white bg-blue-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Go to Home
          </button> */}
        </div>
        <div className="mt-10">
          <p className="mt-2 text-white text-[16px]">Once you have created the image you want, you can share it with others in the community</p>
          <button type="submit" className="mt-3 text-white bg-blue-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
      {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto max-w-3xl mx-auto my-6 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
          <div className="relative flex flex-col w-full bg-cover bg-center" style={{ backgroundImage: `url(${c1Background})` }}>
            <div className="p-6 flex-auto text-white">
              <h3 className="text-3xl font-semibold mb-4">{form.prompt}</h3>
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full max-h-[70vh] object-contain border border-gray-300 hover:shadow-md outline-none"
              />
              <p className="mt-2">Created by: {form.name}</p>
            </div>
            <button
              className="absolute top-2 right-2 p-1 bg-transparent border-0 text-white text-xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
        </div>
      </div>
    )}

    </section>
  );
};

export default CreatePost;
