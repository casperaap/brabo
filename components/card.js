'use client';

import React, { useState, useEffect } from 'react';

const WEBHOOK_URL =
  'https://discord.com/api/webhooks/1369658786142486640/WqDIVrNw45OwxAQV-ABFr4diuHOLJOkY8Ok6jlOG0mw823QMmguhHiqa43ivoa6qBLk3';

/**
 * CardForm — collects a name, message and optional image & posts them to a Discord webhook.
 */
export default function CardForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'sent' | 'error'
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      setAlertVisible(true);
      const t = setTimeout(() => setAlertVisible(false), 3500);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imageFile) return; // nothing meaningful to send

    setStatus('loading');

    const content =
      `**New Brabo Community submission**\n` +
      `Name: ${name || 'Anonymous'}\n` +
      (message ? `Message: ${message}` : '');

    try {
      let res;
      if (imageFile) {
        // send multipart with attachment
        const formData = new FormData();
        formData.append('payload_json', JSON.stringify({ content }));
        formData.append('files[0]', imageFile, fileName);
        res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          body: formData,
        });
      } else {
        // simple JSON payload
        res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
      }

      if (!res.ok) throw new Error('Webhook error');
      setStatus('sent');
      // clear the form
      setName('');
      setMessage('');
      setImagePreview(null);
      setImageFile(null);
      setFileName('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="flex justify-center p-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="card bg-[#25211DE6] shadow-sm w-full max-w-sm"
      style={{
        boxShadow: 'inset 50px 100px 50px rgba(0,0,0,0.4)'
       }}
      >
        {/* Image / Placeholder */}
        <figure className="w-full aspect-video overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <label
                htmlFor="imageUpload"
                className="btn btn-primary bg-[#E30713] border-[#E30713] normal-case cursor-pointer"
              >
                Upload photo
              </label>
              <span className="text-sm text-gray-500 pointer-events-none">
                {fileName || 'No image chosen'}
              </span>
            </div>
          )}
        </figure>

        {/* Form fields */}
        <div className="card-body items-center text-center">
          <input
            type="text"
            placeholder="Your Name (Optional)"
            className="input input-bordered input-primary w-full bg-[#190F0C] border-[#E30713] focus:outline-[#E30713]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Anything you'd like to share here"
              className="textarea textarea-bordered textarea-primary w-full mt-2 bg-[#190F0C] border-[#E30713] focus:outline-[#E30713]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="card-actions w-full flex-col gap-2">
            <button
              type="submit"
              className="btn btn-primary w-full bg-[#E30713] border-[#E30713]"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Submit'}
            </button>

            {alertVisible && status === 'sent' && (
              <div role="alert" className="alert alert-success w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your submission has been sent!</span>
              </div>
            )}
            {alertVisible && status === 'error' && (
              <div role="alert" className="alert alert-error w-full">
                <span>Oops! Something went wrong.</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}