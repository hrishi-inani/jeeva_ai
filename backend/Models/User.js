import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    recordingDate: { type: Date, required: true},
    audioFile: { type: String, required: true},
});

const User = mongoose.model("User", userSchema);
export default User;