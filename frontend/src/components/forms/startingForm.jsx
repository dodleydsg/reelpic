import { Formik } from "formik";
import userResolver from "../../presentation/resolvers/user.resolver";
import userActions from "../../presentation/actions/user.actions";
import { useRouter } from "next/router";
const MAX_STEP = 2;
import { useState } from "react";

export default function StartingForm({ email }) {
  const router = useRouter();
  const [step, updateStep] = useState(1);

  function _toggleInterests(e, formik) {
    let items = formik.values.interests;
    if (e.target.dataset["selected"] === "true") {
      e.target.classList.remove(
        "ring-primary-default",
        "ring-1",
        "ring-offset-2"
      );

      e.target.dataset["selected"] = "false";
      items = items.filter((val) => {
        if (val === e.target.dataset["value"] || val === "") {
          return false;
        }
        return true;
      });
      formik.setValues({
        ...formik.values,
        interests: items,
      });
    } else {
      e.target.classList.add("ring-primary-default", "ring-1", "ring-offset-2");

      items.push(e.target.dataset["value"]);
      formik.setValues({
        ...formik.values,
        interests: items,
      });
      e.target.dataset["selected"] = "true";
    }
  }

  function _updateStep(direction) {
    if (direction === "forward") {
      if (step < MAX_STEP) {
        updateStep(step + 1);
      }
    } else {
      if (step > 1) {
        updateStep(step - 1);
      }
    }
  }

  const formValidator = (values) => {
    let errors = {};
    if (values.interests.length < 3) {
      errors.interests = "You must include at least 3 interests";
    }
    if (values.username.length < 1) {
      errors.username = "You need to select a username";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ username: "", interests: [] }}
      validate={formValidator}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        try {
          let token = localStorage.getItem("token");
          let userId = localStorage.getItem("id");
          userResolver(userActions.UPDATE, {
            token,
            data: {
              userId,
              email: email,
              username: values.username,
              interests: values.interests,
            },
          }).then(({ data }) => {
            router.push("./home");
          });
        } catch (error) {
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          {step === 1 ? (
            <div className="space-y-2">
              <p className="text-center text-subheading">Choose a username</p>

              <label htmlFor="username" className="sr-only">
                Choose a username
              </label>
              <input
                placeholder="Username"
                type="text"
                id="username"
                className={`h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark ${
                  formik.errors.username && formik.touched.username
                    ? " ring ring-danger-default/50"
                    : ""
                }`}
                {...formik.getFieldProps("username")}
              />

              {formik.errors.username && formik.touched.username ? (
                <div className="text-xs text-danger-default/50 my-2">
                  {formik.errors.username}
                </div>
              ) : (
                <span className="text-xs font-light text-dark-default">
                  This is what is going to be used as your main handle, but it
                  can be changed later
                </span>
              )}
              <button
                onClick={(e) => _updateStep("forward")}
                type="button"
                className="btn-primary col-span-1 block text-center justify-self-end hover:bg-[#4900EB] w-full px-6 mx-0 col-offset-1"
              >
                Next
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="lg:space-y-4 space-y-2">
              <p className="text-center text-subheading">
                What are you interested in ?
              </p>
              <ul className="list-none grid text-light-default font-light text-sm grid-cols-3 gap-2">
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-selected="false"
                  data-value="photography"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-red-300 p-4"
                >
                  Photography
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="tech"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#2D0F75] p-4"
                >
                  Tech
                </li>{" "}
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="design"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#3D367B] p-4"
                >
                  Design
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="architecture"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#6a83d0] p-4"
                >
                  Architecture
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="art"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#CF8E2E] p-4"
                >
                  Art
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="cinema"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#E33194] p-4"
                >
                  Cinema
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="landscapes"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#8B8110] p-4"
                >
                  Landscapes
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="cuisines"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#42A16B] p-4"
                >
                  Cuisines
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="AI"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#121283] p-4"
                >
                  AI
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="Nature"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#417E41] p-4"
                >
                  Nature
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="Automobiles"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#A2A3B8] p-4"
                >
                  Automobiles
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="Culture"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#909C22] p-4"
                >
                  Culture
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="people"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#128EED] p-4"
                >
                  People
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="Fashion"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#B2056C] p-4"
                >
                  Fashion
                </li>
                <li
                  onClick={(e) => _toggleInterests(e, formik)}
                  data-value="Hobbies"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#31DD32] p-4"
                >
                  Hobbies
                </li>
              </ul>
              {/* Error section */}

              {formik.errors.interests ? (
                <p className="bg-red-200 rounded-md p-2 text-sm text-danger-default/80">
                  {formik.errors.interests}
                </p>
              ) : null}

              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => _updateStep("backward")}
                  type="button"
                  className="link pl-4 w-full items-center col-span-1 justify-start"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary col-span-1 block text-center justify-self-end hover:bg-[#4900EB] w-full px-6 mx-0 col-offset-1"
                >
                  Get started
                </button>
              </div>
            </div>
          ) : null}
        </form>
      )}
    </Formik>
  );
}
