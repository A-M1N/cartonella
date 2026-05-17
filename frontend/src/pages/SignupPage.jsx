import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  register as registerUser,
  clearError,
  googleLogin,
} from "../store/slices/authSlice";
import { signupSchema } from "../schemas/authSchemas";
import styles from "../pages/LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import signup from "../data/4.jpg";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

function SignupPage() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Redux
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  // Navigation
  const navigate = useNavigate();

  // Redirect if registration successful
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Clear error when leaving page
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle form submit
  const onSubmit = (data) => {
    const name = `${data.firstName} ${data.lastName}`.trim();
    dispatch(
      registerUser({ name, email: data.email, password: data.password }),
    );
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await dispatch(googleLogin(response.access_token)).unwrap();
        navigate("/");
      } catch (error) {
        toast.error(error || "Google sign-in failed");
      }
    },
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.imgWrapper}>
            <img src={signup} className={styles.img} alt="Sign up" />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h2 className={styles.loginHeading}>Create an account</h2>
          <p className={styles.loginParagraph}>Enter your details below</p>

          {/* Server error (from Redux) */}
          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <input
                placeholder="First Name"
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className={styles.fieldError}>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                placeholder="Last Name"
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className={styles.fieldError}>
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                placeholder="Email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.fieldError}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                placeholder="Password"
                type="password"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <span className={styles.fieldError}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.btn}
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              className={styles.btngoogle}
              onClick={handleGoogleLogin}
            >
              <FcGoogle className={styles.googleIcon} />
              Sign Up with Google
            </button>

            <p className={styles.alreadyParagraph}>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
