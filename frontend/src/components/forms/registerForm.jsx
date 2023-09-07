import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import authResolver from "../../presentation/resolvers/auth.resolver";
import authActions from "../../presentation/actions/auth.actions";
import userActions from "../../presentation/actions/user.actions";
import userResolver from "../../presentation/resolvers/user.resolver";
import { useState } from "react";
import { readCookie, setCookie } from "../../utils/cookie";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterForm() {
  const [errors, updateErrors] = useState("");
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter a valid email")
            .matches(
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              "Please enter a valid email"
            )
            .required(),
          password: Yup.string()
            .min(8, "Must be atleast 8 characters")
            .required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          userResolver(userActions.CREATE, "", {
            email: values.email,
            password: values.password,
          })
            .then(({ data }) => {
              authResolver(authActions.LOGIN, "", {
                email: values.email,
                password: values.password,
              })
                .then(({ data }) => {
                  setCookie(token, 7, data.token);
                  router.push("/getting_started");
                })
                .catch((error) => {
                  router.push("/login");
                });

              setSubmitting(false);
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                updateErrors(error.response.data.message);
                setSubmitting(false);
              } else if (error.request) {
                updateErrors("Error encountered");
              } else {
                null;
              }
            });
        }}
      >
        {(formik) => (
          <>
            {errors === "" ? null : (
              <div className="p-4 my-2 bg-danger-default/30 rounded-sm text-sm text-danger-default/80">
                {errors}
              </div>
            )}
            <form
              className="w-full grid grid-cols-1 sm:grid-cols-2  sm:min-h-[280px] sm:divide-x-2"
              onSubmit={formik.handleSubmit}
            >
              <div className="space-y-4 sm:pr-6 mb-8">
                <div className="w-full">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    onFocus={() => updateErrors("")}
                    className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                      formik.errors.email && formik.touched.email
                        ? " ring ring-danger-default/50"
                        : ""
                    }`}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-xs text-danger-default/50 my-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="w-full">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                      formik.errors.password && formik.touched.password
                        ? " ring ring-danger-default/50"
                        : ""
                    }`}
                    type="password"
                    id="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-xs text-danger-default/50 my-2">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn-primary hover:bg-[#4900EB] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Get started
                </button>
              </div>
              <div className="space-y-4 sm:pl-6">
                <button
                  onClick={async (e) => {
                    e.target.disabled = "true";
                    const provider = new GoogleAuthProvider();
                    let cred = await signInWithPopup(auth, provider);
                    const { email } = cred.user;
                    userResolver(userActions.CREATE, "", {
                      email,
                      provider: "google",
                      password: "google",
                    })
                      .then(({ data }) => {
                        authResolver(authActions.OAuthLOGIN, {
                          email, provider: 'google'
                        })
                          .then(({ data }) => {
                            setCookie("token", 7, data.token);
                            router.push("/getting_started");
                          })
                          .catch((error) => {
                            router.push("/login");
                          });

                        setSubmitting(false);
                      })
                      .catch((error) => {
                        if (error.response) {
                          console.log(error.response);
                          updateErrors(error.response.data.message);
                        } else if (error.request) {
                          updateErrors("Error encountered");
                        } else {
                          null;
                        }
                      });
                    e.target.disabled = "false";
                  }}
                  className="btn-google hover:bg-[#DA3925] disabled:opacity-30"
                >
                  Sign up with Google
                </button>
                <button className="btn-apple ">Sign up with Apple</button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </>
  );
}
