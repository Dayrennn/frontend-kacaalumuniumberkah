"use client";

import { useCreateProjectMutation } from "@/hooks/api/projectSliceAPI";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function FormTambahProject({ onCancel, onSuccess }) {
    const [createProject, { isLoading, isError, error }] = useCreateProjectMutation();
    const [deskripsi, setDeskripsi] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");

    // thumbnail
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState(null);

    // video
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);

    const [formError, setFormError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setFormError("Format file tidak didukung. Hanya JPEG, JPG, PNG, WEBP.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setFormError("Ukuran file maksimal 5MB");
            return;
        }

        setFormError("");
        setThumbnailImage(file);
        setThumbnailImageUrl(URL.createObjectURL(file));
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["video/mp4", "video/quicktime", "video/webm"];
        if (!allowedTypes.includes(file.type)) {
            setFormError("Format tidak didukung. Hanya MP4, MOV, atau WEBM.");
            return;
        }

        const maxSize = 30 * 1024 * 1024;
        if (file.size > maxSize) {
            setFormError("Ukuran file maksimal 30MB");
            return;
        }

        setFormError("");
        setVideo(file);
        setVideoUrl(URL.createObjectURL(file));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!title) {
            setFormError("Judul Wajib diisi");
            return;
        }
        if (!thumbnailImage) {
            setFormError("Thumbnail Wajib di Upload");
            return;
        }

        const formData = new FormData();
        formData.append("thumbnail", thumbnailImage);
        formData.append("title", title);
        if (video) {
            formData.append("video", video);
        }
        if (deskripsi) {
            formData.append("deskripsi", deskripsi);
        }
        if (location) {
            formData.append("location", location);
        }

        try {
            const result = await createProject({ data: formData }).unwrap();
            resetForm();
            onSuccess?.(result);
        } catch (err) {
            console.error("GAGAL TAMBAH PROJECT", err);
            setFormError(err?.data?.message || "Gagal Tambah Project");
        }
    };

    const errorMessage = formError || error?.data?.message || (isError ? "Gagal memposting iklan" : "");

    return (
        <form onSubmit={handleCreate}>
            <div className="px-6 py-5 space-y-4">
                {errorMessage && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{errorMessage}</p>}

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Judul</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        placeholder="Tulis judul iklan..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        placeholder="Tulis deskripsi iklan..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Thumbnail Video</label>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} />
                    {thumbnailImageUrl && (
                        <div className="mt-2 w-full max-w-sm rounded-lg border bg-white overflow-hidden">
                            <div className="aspect-video bg-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={thumbnailImageUrl} alt="Preview thumbnail" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-3 py-2">
                                <p className="text-sm text-gray-700 truncate">{thumbnailImage?.name}</p>
                                <p className="text-xs text-gray-400">{(thumbnailImage?.size / (1024 * 1024)).toFixed(1)} MB</p>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Video</label>
                    <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={handleVideoChange} />
                    {videoUrl && (
                        <div className="mt-2 w-full max-w-sm rounded-lg border bg-white overflow-hidden">
                            <div className="aspect-video bg-black">
                                <video src={`${videoUrl}#t=0.1`} controls muted playsInline preload="metadata" className="w-full h-full object-contain" />
                            </div>
                            <div className="px-3 py-2">
                                <p className="text-sm text-gray-700 truncate">{video?.name}</p>
                                <p className="text-xs text-gray-400">{(video?.size / (1024 * 1024)).toFixed(1)} MB</p>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Lokasi</label>
                    <textarea
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        placeholder="Tulis lokasi iklan..."
                    />
                </div>

                <div className="flex gap-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border" disabled={isLoading}>
                        Batal
                    </button>
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </div>
        </form>
    );
}
