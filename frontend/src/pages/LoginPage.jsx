import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../store/slices/authSlice";
import toast from "react-hot-toast";

import { login, clearError } from "../store/slices/authSlice";
import { loginSchema } from "../schemas/authSchemas";
import styles from "../pages/LoginPage.module.css";
import { FcGoogle } from "react-icons/fc";
import signup from "../data/4.jpg";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
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
            <img src={signup} className={styles.img} alt="Login" />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h2 className={styles.loginHeading}>Login to Cartonella</h2>
          <p className={styles.loginParagraph}>Enter your details below</p>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <input
                placeholder="Email or Phone Number"
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
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <div className={styles.orContainer}>
              <div className={styles.line}></div>
              <span className={styles.or}>or</span>
              <span className={styles.line}></span>
            </div>

            <button
              type="button"
              className={styles.btngoogle}
              onClick={handleGoogleLogin}
            >
              <FcGoogle className={styles.googleIcon} />
              Sign In with Google
            </button>

            <p className={styles.alreadyParagraph}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
