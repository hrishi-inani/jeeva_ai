import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import fire from '../firebase';

const Interface = () => {

    const { final, getForm, recordings } = useContext(UserContext);

    const [isPlaying, setIsPlaying] = useState(false);

    const [formData, setFormData] = useState({
        doctorName: '',
        patientName: '',
        patientAge: '',
        recordingDate: '',
        soundFile: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAudio = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, soundFile: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Here you can handle form submission, e.g., send data to server or process it further
        const file = fire.storage().ref(`uploads/jeeva/${formData.soundFile.name}`);

        file.put(formData.soundFile).on("state_changed", (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
            (error) => {
                console.log(error)
            },
            async () => {
                const audioFile = await file.getDownloadURL();

                const x = await final(formData.doctorName, formData.patientName, formData.patientAge, formData.recordingDate, audioFile);

                if (x === 200) {
                    setFormData({
                        doctorName: '',
                        patientName: '',
                        patientAge: '',
                        recordingDate: '',
                        soundFile: null
                    });
                    await getForm();
                }
                else {
                    alert("Couldn't upload at the moment.", {
                        position: 'top-center'
                    });
                }
            });
    };

    const getItem = async () => {
        await getForm();
    }

    useEffect(() => {
        getItem();
    },[])

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Doctor's Name:</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm leading-4 font-medium text-gray-700"
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Patient's Name:</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm leading-4 font-medium text-gray-700"
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Patient's Age:</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm leading-4 font-medium text-gray-700"
                        type="number"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Sound Recording:</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm leading-4 font-medium text-gray-700"
                        type="date"
                        name="recordingDate"
                        value={formData.recordingDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Sound File:</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm leading-4 font-medium text-gray-700"
                        type="file"
                        name="soundFile"
                        accept="audio/*"
                        onChange={handleAudio}
                        required
                    />
                </div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Submit</button>
            </form>

            {/* Display submitted data in a table */}
            {recordings.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recordings</h2>
                    <table className="w-full border-collapse">
                        {/* Table headers */}
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Doctor's Name</th>
                                <th className="border px-4 py-2">Patient's Name</th>
                                <th className="border px-4 py-2">Patient's Age</th>
                                <th className="border px-4 py-2">Recording Date</th>
                                <th className="border px-4 py-2">Audio</th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody>
                            {recordings.map((recording, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{recording.doctorName}</td>
                                    <td className="border px-4 py-2">{recording.patientName}</td>
                                    <td className="border px-4 py-2">{recording.patientAge}</td>
                                    <td className="border px-4 py-2">{new Date(recording.recordingDate).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">
                                        <audio
                                            controls
                                            src={recording.soundFile}
                                            autoPlay={false}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}>
                                        </audio>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>



    );
}

export default Interface;
