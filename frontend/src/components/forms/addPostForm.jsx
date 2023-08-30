import { useState } from "react";
import UploadLabel from "./uploadLabel";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { Formik } from "formik";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import ErrorMessage from "./errorMessage";
import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  configureAlert,
  setAlert,
  toggleAddPostModal,
  toggleSuccessModal,
} from "../../store/features/uiSlice";
import FormCarousel from "./formCarousel";
import { readCookie } from "@/components/utils/cookie";

export default function AddPostForm() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = readCookie("token");
  const MAX_STEPS = 2;
  const [steps, updateSteps] = useState(1);
  const [files, updateFiles] = useState([]);
  const [rawFiles, updateRawFiles] = useState([]);

  const _updateSteps = (direction) => {
    if (direction === "forward") {
      if (steps < MAX_STEPS) {
        updateSteps(steps + 1);
      }
    } else {
      if (steps > 1) {
        updateSteps(steps - 1);
      }
    }
  };

  const _updateFiles = async (e, formik) => {
    e.preventDefault();
    e.stopPropagation();
    let files = e.target.files;
    updateRawFiles(files);
    if (files.length > 10) {
      alert("Helo");
      formik.setFieldError("media", "The upload limit is 10 images");
    }
    let container = [];
    for (let i = 0; i < files.length; i++) {
      let val = URL.createObjectURL(files[i]);
      container.push(val);
    }
    updateFiles(container);
    formik.setValues({
      ...formik.values,
      media: container,
    });
  };

  const formValidator = (values) => {
    let errors = {};
    if (values.media.length === 0) {
      errors.media = "Posts must contain atleast an image";
    }
    if (values.tags.length === 0) {
      errors.tags = "Please add atleast a tag";
    }
    if (values.body.length === 0) {
      errors.body = "Every post must contain a body description";
    }

    return errors;
  };
  return (
    <>
      <Formik
        initialValues={{
          body: "",
          tags: [],
          media: [],
        }}
        validate={formValidator}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let imageUrls = [];
          for (let i = 0; i < rawFiles.length; i++) {
            const itemStorageRef = ref(
              storage,
              `images/${user._id}/${rawFiles.item(i).name}`
            );
            try {
              await uploadBytes(itemStorageRef, rawFiles.item(i));
              let url = await getDownloadURL(itemStorageRef);
              imageUrls.push(url);
              console.log(imageUrls);
            } catch (error) {
              null;
            }
          }
          if (!imageUrls) {
            postResolver(postActions.CREATE_POST, token, {
              content: {
                body: values.body,
                images: imageUrls,
              },
              user: user._id,
              tags: values.tags,
            })
              .then(({ data }) => {
                console.info(data);
                dispatch(toggleAddPostModal());
                dispatch(
                  configureAlert({
                    variant: "success",
                    text: "Successfully added post, refresh to stay updated",
                    action: "refresh",
                  })
                );
                dispatch(setAlert(true));
                resetForm();
                updateFiles([]);
              })
              .catch((error) => {
                console.log(error);
                resetForm();
                updateFiles([]);
              });
          } else {
            dispatch(
              configureAlert({
                variant: "danger",
                text: "Couldn't submit post, check connection",
              })
            );
            dispatch(setAlert(true));
            dispatch(toggleAddPostModal());
          }
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto space-y-4 flex flex-col items-center h-full overflow-y-scroll no-scrollBar"
          >
            <div className="flex w-full items-center justify-between py-2">
              <h5 className="font-medium text-xl">
                {steps === 1 ? "Media" : null}
                {steps === 2 ? "Content" : null}
              </h5>
              {steps === 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    formik.validateForm().then((errors) => {
                      if (!errors.media) {
                        _updateSteps("forward");
                      }
                    });
                  }}
                  className="py-2 px-4 flex items-center border border-primary-default/80 rounded hover:bg-primary-default hover:text-white transition duration-200"
                >
                  Content
                  <IoChevronForward />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    _updateSteps("backward");
                  }}
                  className="py-2 px-4 flex items-center border border-primary-default/80 rounded hover:bg-primary-default hover:text-white transition duration-200"
                >
                  Images
                  <IoChevronBack />
                </button>
              )}
            </div>
            {steps === 1 ? (
              <>
                <FormCarousel images={files} bookmark={false} />
                <input
                  onChange={(e) => {
                    _updateFiles(e, formik);
                  }}
                  type="file"
                  multiple
                  max={10}
                  capture="environment"
                  accept="image/*"
                  maxLength={10}
                  id="media"
                  className="hidden"
                />
                <UploadLabel
                  htmlFor="media"
                  text="Add images"
                  className="mx-auto inline-block"
                  onBlur={formik.onBlur}
                />
                {formik.errors.media ? (
                  <ErrorMessage message={formik.errors.media} />
                ) : null}
              </>
            ) : null}
            {steps === 2 ? (
              <div className="w-full space-y-2 px-2">
                <label htmlFor="body">
                  Body
                  {formik.touched.body && formik.errors.body ? (
                    <ErrorMessage message={formik.errors.body} />
                  ) : null}
                </label>

                <textarea
                  id="body"
                  rows="5"
                  className="grow block w-full border p-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark resize-none"
                  placeholder="Give a useful description to your post"
                  {...formik.getFieldProps("body")}
                />

                <div>
                  <div>
                    <div className="space-y-2">
                      <label htmlFor="tag">Tags</label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            className="h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
                            id="tag"
                            type="text"
                            placeholder="Add tags"
                            onBlur={formik.onBlur}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              let tag = e.target.previousSibling.value
                                .toLowerCase()
                                .trim();
                              if (
                                !_.includes(formik.values.tags, tag) &&
                                tag !== ""
                              ) {
                                formik.setValues({
                                  ...formik.values,
                                  tags: [
                                    ...formik.values.tags,
                                    e.target.previousSibling.value.toLowerCase(),
                                  ],
                                });
                                e.target.previousSibling.value = "";
                              }
                            }}
                            className="border h-full block px-4 py-2 rounded text-primary-default bg-light-default hover:text-dark-default transition"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex w-full flex-wrap gap-2">
                          {formik.values.tags.map((val, idx) => (
                            <div
                              key={val}
                              className="flex py-2 gap-1 items-center px-4 rounded border border-dark-default/60 "
                            >
                              <span className="block">{val}</span>
                              <IoClose
                                onClick={() => {
                                  formik.setValues({
                                    ...formik.values,
                                    tags: [...formik.values.tags].filter(
                                      (item) => {
                                        if (val === item) {
                                          return false;
                                        } else {
                                          return true;
                                        }
                                      }
                                    ),
                                  });
                                }}
                                className="block text-danger-default cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-col flex gap-2">
                      <div className="w-52 lg:w-72 flex items-center gap-2">
                        <div className="flex gap-2 items-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {formik.errors.tags ? (
                    <ErrorMessage message={formik.errors.tags} />
                  ) : null}
                </div>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className={`btn-primary inline-block w-1/2   ${
                    formik.isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-[#4900EB]"
                  }`}
                >
                  {formik.isSubmitting ? (
                    <span>Submitting</span>
                  ) : (
                    <span>Add post</span>
                  )}
                </button>
              </div>
            ) : null}
          </form>
        )}
      </Formik>
    </>
  );
}
