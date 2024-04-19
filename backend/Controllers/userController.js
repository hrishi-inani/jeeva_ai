import User from "../Models/User.js";

const recordings = async (req, res) => {
    try {
        const { doctorName, patientName, patientAge, recordingDate, audioFile } = req.body;
        const recording = await User.create({
            doctorName,
            patientName,
            patientAge,
            recordingDate,
            audioFile
        });

        res.status(200).json({ message: 'Recording saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving recording' });
    }

}

const getRecordings = async (req, res) => {
    try {
        const recordings = await User.find();
        res.status(200).json(recordings);
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export {recordings, getRecordings}