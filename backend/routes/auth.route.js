import express from "express";
import { login, 
    logout, 
    signup , 
    verifyEmail, 
    forgotPassword , 
    resetPassword, 
    checkAuth,

    patientRegister,
    verifyPatientEmail,
    patientLogin,
    patientForgot,
    patientReset,
    patientLogout,
    authPatient,

    doctorRegister,
    verifyDoctorEmail,
    doctorLogin,
    doctorForgot,
    doctorReset,
    doctorLogout,
    authDoctor,

    clinicRegister,
    verifyClinicEmail,
    clinicLogin,
    clinicForgot,
    clinicReset,
    clinicLogout,
    authClinic,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../midlayer/verifyToken.js";
import { verifyPatient } from "../midlayer/verifyPatient.js";
import { verifyDoctor } from "../midlayer/verifyDoctor.js";
import { verifyClinic } from "../midlayer/verifyClinic.js";

import { bookAppointment, 
    fetchAppoinments, 
    fetchDoctors 
} from "../controllers/appointment.controller.js";


const router = express.Router();

router.get("/check-auth",verifyToken,checkAuth);

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/patient-register", patientRegister);
router.post("/patient-verify", verifyPatientEmail);
router.post("/patient-login", patientLogin);
router.post("/patient-forgot", patientForgot);
router.post("/patient-reset/:token", patientReset);
router.post("/patient-logout", patientLogout);
router.get("/patient-auth", verifyPatient,authPatient);

router.post("/doctor-register", doctorRegister);
router.post("/doctor-verify", verifyDoctorEmail);
router.post("/doctor-login", doctorLogin);
router.post("/doctor-forgot", doctorForgot);
router.post("/doctor-reset/:token", doctorReset);
router.post("/doctor-logout", doctorLogout);
router.get("/doctor-auth", verifyDoctor,authDoctor);

router.post("/clinic-register", clinicRegister);
router.post("/clinic-verify", verifyClinicEmail);
router.post("/clinic-login", clinicLogin);
router.post("/clinic-forgot", clinicForgot);
router.post("/clinic-reset/:token", clinicReset);
router.post("/clinic-logout", clinicLogout);
router.get("/clinic-auth", verifyClinic,authClinic);


router.post("/book-appointment", bookAppointment);
router.post("/fetch-doctors", fetchDoctors);
router.post("/fetch-appointments", fetchAppoinments);

export default router;