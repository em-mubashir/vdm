import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import Axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as constantsClass from "../../utils/constants";
const {
  REACT_APP_BACKEND_SERVER_URL,
  REACT_APP_FRONTEND_SERVER_URL,
  REACT_APP_W9_FORM_LINK,
  REACT_APP_NOTIFICATION_EMAIL_ADDRESS,
  REACT_APP_EMAIL_FOOTER,
} = process.env;

const Signup = ({ className = "" }) => {
  // let history = useHistory();
  const location = useLocation();
  const [depositData, setDepositData] = useState([]);
  const [identityData, setIdentityData] = useState([]);
  const [authorizedSMS, setAuthorizedSMS] = useState(1);
  const [identityType, setIdentityType] = useState(1);
  const [isNotDealer, setIsNotDealer] = useState(false);
  const [userType, setUserType] = useState("Dealer");
  const [isNotPresenter, setIsNotPresenter] = useState(true);
  const [isNotBank, setIsNotBank] = useState(false);
  const [depositID, setDepositType] = useState(1);
  const [isNotCheque, setIsNotCheque] = useState(true);
  const [isNotCrypto, setIsNotCrypto] = useState(true);
  const [isSlideActive, setIsSlideActive] = useState(false);

  const [emailVerificationSubject, setEmailVerificationSubject] = useState("");
  const [emailVerificationContent, setEmailVerificationContent] = useState("");
  const [emailUserRegistrationReceiver] = useState(
    `${REACT_APP_NOTIFICATION_EMAIL_ADDRESS}`
  );
  const [emailVerificationLink] = useState(
    `${REACT_APP_FRONTEND_SERVER_URL}/Verify/`
  );

  const [emailUserRegistrationSubject, setEmailUserRegistrationSubject] =
    useState("");
  const [emailUserRegistrationContent, setEmailUserRegistrationContent] =
    useState("");

  const files_ref_esc = useRef();
  const files_ref_gap = useRef();
  const files_ref_other = useRef();
  const files_ref_logo = useRef();
  const files_ref_front = useRef();
  const files_ref_back = useRef();
  const files_ref_w9 = useRef();
  const onChangeUserType = (e) => {
    console.log(e.target.value);
    setUserType(e.target.value);
    if (e.target.value == "Dealer") {
      setIsNotPresenter(true);
      setIsNotDealer(false);
    } else {
      setIsNotPresenter(false);
      setIsNotDealer(true);
    }
  };

  useEffect(() => {
    console.log("process .env ", process.env);
    const interval = setInterval(() => {
      setIsSlideActive((prevState) => !prevState);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onChangeDepositType = (e) => {
    setDepositType(e.target.value);
    if (e.target.value == "1") {
      setIsNotBank(false);
      setIsNotCheque(true);
      setIsNotCrypto(true);
    } else if (e.target.value == "2") {
      setIsNotCheque(false);
      setIsNotBank(true);
      setIsNotCrypto(true);
    } else {
      setIsNotCrypto(false);
      setIsNotBank(true);
      setIsNotCheque(true);
    }
  };
  const sendEmailVerify = (
    emailVerificationCode,
    email,
    firstName,
    lastName
  ) => {
    try {
      Axios.post(`${REACT_APP_BACKEND_SERVER_URL}/api/send/email`, {
        p_to_email: email,
        p_email_subject: emailVerificationSubject,
        p_email_content: `DEAR <strong>${firstName} ${lastName}</strong>, <br/><br/> ${emailVerificationContent} <br/> <a href="${emailVerificationLink}${emailVerificationCode}" target="_blank">CLICK HERE</a><br/><br/><br/>${REACT_APP_EMAIL_FOOTER}`,
      }).then((response) => {
        if (response.data.success) {
          let path = `/Greetings`;
          // history.push({
          //   pathname: path,
          //   state: {
          //     p_first_name: firstName,
          //     p_last_name: lastName,
          //     p_user_type: userType,
          //     p_email: email,
          //   },
          // });
        }
        //console.log(temp);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateUserDocuments = async (
    fieldName,
    filePath,
    newUserID,
    emailVerificationCode,
    email,
    firstName,
    lastName
  ) => {
    const response = await Axios.post(
      `${REACT_APP_BACKEND_SERVER_URL}/api/Users/UpdateDocuments`,
      {
        p_user_id: newUserID,
        p_user_type: userType,
        p_document_name: fieldName,
        p_document_path: filePath,
      }
    );
    if (response.data.success) {
      if (
        fieldName == "dealer_other_products_cost_sheet" ||
        fieldName == "presenter_w9_form"
      ) {
        sendUserRegistationNotification(firstName, lastName);
        sendEmailVerify(emailVerificationCode, email, firstName, lastName);
      }
    }
  };
  const sendUserRegistationNotification = (firstName, lastName) => {
    try {
      Axios.post(`${REACT_APP_BACKEND_SERVER_URL}/api/send/email`, {
        p_to_email: emailUserRegistrationReceiver,
        p_email_subject: emailUserRegistrationSubject,
        p_email_content: `DEAR CCD REPRESENTATIVE,<br/><br/> A NEW <strong>${userType} ${firstName} ${lastName}</strong>, ${emailUserRegistrationContent} <br/><br/><br/>${REACT_APP_EMAIL_FOOTER}`,
      }).then((response) => {});
    } catch (error) {
      console.error(error.message);
    }
  };
  const SingleFileUploadHandler = async (
    selectedFile,
    fieldName,
    newUserID,
    emailVerificationCode,
    email,
    firstName,
    lastName
  ) => {
    const data = new FormData();
    // If file selected
    if (selectedFile) {
      data.append("profileImage", selectedFile, selectedFile.name);
      await Axios.post(
        `${REACT_APP_BACKEND_SERVER_URL}/api/file/upload`,
        data,
        {
          headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      )
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              // if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
              //   OcShowAlert( 'Max size: 2MB', 'red' );
              // } else {
              //   console.log( response.data );
              //   // If not the given file type
              //  // OcShowAlert( response.data.error, 'red' );
              // }
            } else {
              // Success
              let fileName = response.data;
              updateUserDocuments(
                fieldName,
                fileName.location,
                newUserID,
                emailVerificationCode,
                email,
                firstName,
                lastName
              );
              //OcShowAlert( 'File Uploaded', '#3089cf' );
            }
          }
        })
        .catch((error) => {
          // If another error
          //OcShowAlert( error, 'red' );
        });
    } else {
      // if file not selected throw error
      //OcShowAlert( 'Please upload file', 'red' );
    }
  };

  return (
    <div className={`nc-PageSignUp    ${className}`} data-nc-id='PageSignUp'>
      <div className='xs:grid-cols-1 xs:flex-col-reverse md:grid-cols-2 flex md:flex-row  md:mt-28 xs:mt-0 '>
        <div className='w-full h-[48rem] overflow-y-scroll		'>
          <h2 className='my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
            Signup
          </h2>
          <div className='mx-24 space-y-6 '>
            <Formik
              initialValues={{
                userType: "Dealer",
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                phoneCarrier: "",
                address: "",
                pocName: "",
                accountEmail: "",
                accountContact: "",
                escCompany: "",
                escCompanyCostSheet: null,
                gapCompany: "",
                gapCostSheet: null,
                otherProducts: "",
                otherProductsCostSheet: null,
                dealerLogo: null,
                depositID: "1",
                bankAccountNumber: "",
                bankRoutingNumber: "",
                bankAddress: "",
                bankAccountTitle: "",
                addressOnBankAccount: "",
                mailingAddress: "",
                walletAddress: "",
                identityType: "",
                socialSecurityNumber: "",
                identityFrontSide: null,
                identityBackSide: null,
                w9Form: null,
                termsAccepted: true,
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .min(2, "Too Short!")
                  .max(50, "Too Long!")
                  .required("Required")
                  .matches(/^[a-zA-Z]*$/, "Can only contain letters"),
                lastName: Yup.string()
                  .min(2, "Too Short!")
                  .max(50, "Too Long!")
                  .required("Required")
                  .matches(/^[a-zA-Z]*$/, "Can only contain letters"),
                email: Yup.string()
                  .min(6, "Too Short! Min 6 characters")
                  .max(50, "Too Long!")
                  .email("Invalid email")
                  .required("Required"),
                username: Yup.string()
                  .required("Required")
                  .min(6, "Too Short! Min 6 characters")
                  .max(50, "Too Long!")
                  .matches(
                    /^[a-zA-Z0-9.]*$/,
                    "Can only contain letters, digits and ."
                  ),
                password: Yup.string()
                  .required("Required")
                  .min(6, "Too Short!")
                  .max(20, "Too Long!")
                  .matches(
                    /^[a-zA-Z0-9@]*$/,
                    "Can only contain letters, digits and @"
                  ),
                confirmPassword: Yup.string()
                  .required("Required")
                  .when("password", {
                    is: (val) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                      [Yup.ref("password")],
                      "Both password need to be the same"
                    ),
                  }),
                phoneNumber: Yup.string()
                  .required("Required")
                  .matches(/^[0-9+-]*$/, "Can only contain digits, +, and -"),
                phoneCarrier: Yup.string()
                  .required("Required")
                  .min(2, "Too Short!")
                  .max(50, "Too Long!")
                  .matches(
                    /^[a-zA-Z0-9. ]*$/,
                    "Can only contain letters, digits, spaces and ."
                  ),
                userType: Yup.string(),
                depositID: Yup.string(),
                address: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(100, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9.#/ -]*$/,
                      "Can only contain letters, digits, spaces, #, /, - and ."
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                pocName: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .matches(
                      /^[a-zA-Z ]*$/,
                      "Can only contain letters and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                accountEmail: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .email("Invalid Email"),
                  otherwise: Yup.string().nullable(true),
                }),
                accountContact: Yup.string().when(userType, {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .matches(
                      /^[a-zA-Z ]*$/,
                      "Can only contain letters and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                escCompany: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9 ]*$/,
                      "Can only contain letters, digits and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                escCompanyCostSheet: Yup.mixed().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_esc.current
                        ? files_ref_esc.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_esc.current.files[0]);
                      return value && files_ref_esc.current
                        ? constantsClass.SUPPORTED_FORMATS_EXCEL.includes(
                            files_ref_esc.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                gapCompany: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9 ]*$/,
                      "Can only contain letters, digits and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                gapCostSheet: Yup.mixed().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_gap.current
                        ? files_ref_gap.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_gap.current.files[0]);
                      return value && files_ref_gap.current
                        ? constantsClass.SUPPORTED_FORMATS_EXCEL.includes(
                            files_ref_gap.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                otherProducts: Yup.string().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.string()
                    .required("Required")
                    .min(2, "Too Short!")
                    .max(250, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9 ]*$/,
                      "Can only contain letters, digits and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                otherProductsCostSheet: Yup.mixed().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_other.current
                        ? files_ref_other.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_other.current.files[0]);
                      return value && files_ref_other.current
                        ? constantsClass.SUPPORTED_FORMATS_EXCEL.includes(
                            files_ref_other.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                dealerLogo: Yup.mixed().when("userType", {
                  is: (userType) => userType === "Dealer",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_logo.current
                        ? files_ref_logo.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_logo.current.files[0]);
                      return value && files_ref_logo.current
                        ? constantsClass.SUPPORTED_FORMATS_IMAGE.includes(
                            files_ref_logo.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                bankAccountNumber: Yup.string().when(
                  ["userType", "depositID"],
                  {
                    is: (userType, depositID) =>
                      userType === "Presenter" && depositID === "1",
                    then: Yup.string()
                      .required("Required")
                      .min(6, "Too Short!")
                      .max(50, "Too Long!")
                      .matches(/^[0-9]*$/, "Can only contain digits"),
                    otherwise: Yup.string().nullable(true),
                  }
                ),
                bankRoutingNumber: Yup.string().when(
                  ["userType", "depositID"],
                  {
                    is: (userType, depositID) =>
                      userType === "Presenter" && depositID === "1",
                    then: Yup.string()
                      .required("Required")
                      .min(6, "Too Short!")
                      .max(50, "Too Long!")
                      .matches(
                        /^[a-zA-Z0-9-]*$/,
                        "Can only contain letters, digits and -"
                      ),
                    otherwise: Yup.string().nullable(true),
                  }
                ),
                bankAddress: Yup.string().when(["userType", "depositID"], {
                  is: (userType, depositID) =>
                    userType === "Presenter" && depositID === "1",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(250, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9.#/ -]*$/,
                      "Can only contain letters, digits, spaces, #, /, - and ."
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                bankAccountTitle: Yup.string().when(["userType", "depositID"], {
                  is: (userType, depositID) =>
                    userType === "Presenter" && depositID === "1",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(250, "Too Long!")
                    .matches(
                      /^[a-zA-Z ]*$/,
                      "Can only contain letters and spaces"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                addressOnBankAccount: Yup.string().when(
                  ["userType", "depositID"],
                  {
                    is: (userType, depositID) =>
                      userType === "Presenter" && depositID === "1",
                    then: Yup.string()
                      .required("Required")
                      .min(6, "Too Short!")
                      .max(250, "Too Long!")
                      .matches(
                        /^[a-zA-Z0-9.#/ -]*$/,
                        "Can only contain letters, digits, spaces, #, /, - and ."
                      ),
                    otherwise: Yup.string().nullable(true),
                  }
                ),
                mailingAddress: Yup.string().when(["userType", "depositID"], {
                  is: (userType, depositID) =>
                    userType === "Presenter" && depositID === "2",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(250, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9.#/ -]*$/,
                      "Can only contain letters, digits, spaces, #, /, - and ."
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                walletAddress: Yup.string().when(["userType", "depositID"], {
                  is: (userType, depositID) =>
                    userType === "Presenter" &&
                    depositID !== "1" &&
                    depositID !== "2",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(100, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9]*$/,
                      "Can only contain letters and digits"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                socialSecurityNumber: Yup.string().when(["userType"], {
                  is: (userType) => userType === "Presenter",
                  then: Yup.string()
                    .required("Required")
                    .min(6, "Too Short!")
                    .max(250, "Too Long!")
                    .matches(
                      /^[a-zA-Z0-9-]*$/,
                      "Can only contain letters, digits and -"
                    ),
                  otherwise: Yup.string().nullable(true),
                }),
                identityFrontSide: Yup.mixed().when(["userType"], {
                  is: (userType) => userType === "Presenter",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_front.current
                        ? files_ref_front.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_front.current.files[0]);
                      return value && files_ref_front.current
                        ? constantsClass.SUPPORTED_FORMATS_IMAGE.includes(
                            files_ref_front.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                identityBackSide: Yup.mixed().when(["userType"], {
                  is: (userType) => userType === "Presenter",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_front.current
                        ? files_ref_front.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_front.current.files[0]);
                      return value && files_ref_front.current
                        ? constantsClass.SUPPORTED_FORMATS_IMAGE.includes(
                            files_ref_front.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),
                w9Form: Yup.mixed().when(["userType"], {
                  is: (userType) => userType === "Presenter",
                  then: Yup.mixed()
                    .test("FILE_SIZE", "Max 2MB Allowed", (value) => {
                      return value && files_ref_w9.current
                        ? files_ref_w9.current.files[0].size <=
                          constantsClass.FILE_SIZE
                          ? true
                          : false
                        : true;
                    })
                    .test("FILE_Type", "Not valid!", (value) => {
                      console.log(files_ref_w9.current.files[0]);
                      return value && files_ref_w9.current
                        ? constantsClass.SUPPORTED_FORMATS_PDF.includes(
                            files_ref_w9.current.files[0].type
                          )
                          ? true
                          : false
                        : true;
                    })
                    .required("Required"),
                  otherwise: Yup.mixed().nullable(true),
                }),

                termsAccepted: Yup.boolean(),
              })}
              onSubmit={(
                {
                  userType,
                  firstName,
                  lastName,
                  email,
                  username,
                  password,
                  confirmPassword,
                  phoneNumber,
                  phoneCarrier,
                  address,
                  pocName,
                  accountEmail,
                  accountContact,
                  escCompany,
                  escCompanyCostSheet,
                  gapCompany,
                  gapCostSheet,
                  otherProducts,
                  otherProductsCostSheet,
                  depositID,
                  bankAccountNumber,
                  bankRoutingNumber,
                  bankAddress,
                  bankAccountTitle,
                  addressOnBankAccount,
                  mailingAddress,
                  walletAddress,
                  socialSecurityNumber,
                  identityFrontSide,
                  identityBackSide,
                  w9Form,
                  termsAccepted,
                },
                { setStatus, setSubmitting }
              ) => {
                setStatus();
                //console.log(termsAccepted);
                //console.log(userType);
                if (termsAccepted == 0 && userType == "Presenter") {
                  setStatus("You must accept terms and conditions");
                  setSubmitting(false);
                  return;
                }
                // console.log("Submit");
                // setSubmitting(false);
                var flag = true;
                var statusLine = "";
                Axios.post(
                  `${REACT_APP_BACKEND_SERVER_URL}/api/Users/CheckEmail`,
                  {
                    p_email: email,
                  }
                ).then((response) => {
                  if (!response.data.success) {
                    flag = false;
                    statusLine = response.data.message + " ";
                  }
                  Axios.post(
                    `${REACT_APP_BACKEND_SERVER_URL}/api/Users/CheckUsername`,
                    {
                      p_username: username,
                    }
                  ).then((response) => {
                    if (!response.data.success) {
                      flag = false;
                      statusLine = statusLine + response.data.message;
                    }
                    if (flag) {
                      Axios.post(
                        `${REACT_APP_BACKEND_SERVER_URL}/api/Users/Register`,
                        {
                          p_first_name: firstName,
                          p_last_name: lastName,
                          p_email: email,
                          p_username: username,
                          p_password: password,
                          p_address: address,
                          p_phone_number: phoneNumber,
                          p_phone_carrier: phoneCarrier,
                          p_poc_name: pocName,
                          p_account_email: accountEmail,
                          p_account_contact: accountContact,
                          p_esc_company: escCompany,
                          p_gap_company: gapCompany,
                          p_other_products: otherProducts,
                          p_authorized_sms: authorizedSMS,
                          p_social_security_number: socialSecurityNumber,
                          p_deposit_id: depositID,
                          p_bank_account_number: bankAccountNumber,
                          p_bank_routing_number: bankRoutingNumber,
                          p_bank_address: bankAddress,
                          p_bank_account_title: bankAccountTitle,
                          p_address_on_bank_account: addressOnBankAccount,
                          p_wallet_address: walletAddress,
                          p_mailing_address: mailingAddress,
                          p_identity_type: identityType,
                          p_terms_accepted: termsAccepted,
                          p_user_type: userType,
                        }
                      ).then((response) => {
                        if (response.data.success) {
                          if (userType == "Dealer") {
                            SingleFileUploadHandler(
                              files_ref_esc.current.files[0],
                              "dealer_esc_cost_sheet",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                            SingleFileUploadHandler(
                              files_ref_gap.current.files[0],
                              "dealer_gap_cost_sheet",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                            SingleFileUploadHandler(
                              files_ref_logo.current.files[0],
                              "dealer_logo",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                            SingleFileUploadHandler(
                              files_ref_other.current.files[0],
                              "dealer_other_products_cost_sheet",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                          } else if (userType == "Presenter") {
                            SingleFileUploadHandler(
                              files_ref_front.current.files[0],
                              "presenter_identity_type_front",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                            SingleFileUploadHandler(
                              files_ref_back.current.files[0],
                              "presenter_identity_type_back",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                            SingleFileUploadHandler(
                              files_ref_w9.current.files[0],
                              "presenter_w9_form",
                              response.data.user_id,
                              response.data.email_verify_code,
                              email,
                              firstName,
                              lastName
                            );
                          }
                        } else {
                          alert(response.data.message);
                        }
                      });
                    } else {
                      setStatus(statusLine);
                      setSubmitting(false);
                    }
                  });
                });
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <div className='radio' onChange={onChangeUserType}>
                          <label>
                            <Field
                              type='radio'
                              name='userType'
                              value='Dealer'
                              defaultChecked
                              // /onValueChange = {nextValue =>onChangeUserType(nextValue)}
                            />
                            &nbsp;&nbsp;I am a Dealer
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <label>
                            <Field
                              type='radio'
                              name='userType'
                              value='Presenter'
                            />
                            &nbsp;&nbsp;I am a Presenter
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <a
                          className='btn-primary btn-block'
                          href={REACT_APP_W9_FORM_LINK}
                          target='_blank'
                        >
                          Download W-9 Form
                        </a>
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='firstName'>
                          First name
                        </label>
                        <Field
                          name='firstName'
                          type='text'
                          className={
                            "form-control" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='firstName'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='lastName'>
                          Last name
                        </label>
                        <Field
                          name='lastName'
                          type='text'
                          className={
                            "form-control" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='lastName'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='email'>
                          Email address
                        </label>
                        <Field
                          name='email'
                          type='email'
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                          //onBlur= {CheckEmail}
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='username'>
                          Username
                        </label>
                        <Field
                          name='username'
                          type='text'
                          className={
                            "form-control" +
                            (errors.username && touched.username
                              ? " is-invalid"
                              : "")
                          }
                          //onBlur={CheckUsername}
                        />
                        <ErrorMessage
                          name='username'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='password'>
                          Password
                        </label>
                        <Field
                          name='password'
                          type='password'
                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='confirmPassword'>
                          Re-enter Password
                        </label>
                        <Field
                          name='confirmPassword'
                          type='password'
                          className={
                            "form-control" +
                            (errors.confirmPassword && touched.confirmPassword
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='confirmPassword'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>
                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='phoneNumber'>
                          Phone Number
                        </label>
                        <Field
                          name='phoneNumber'
                          type='text'
                          className={
                            "form-control" +
                            (errors.phoneNumber && touched.phoneNumber
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='phoneNumber'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3'>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='phoneCarrier'>
                          Phone Carrier
                        </label>
                        <Field
                          name='phoneCarrier'
                          type='text'
                          className={
                            "form-control" +
                            (errors.phoneCarrier && touched.phoneCarrier
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='phoneCarrier'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='address'>
                          Address
                        </label>
                        <Field
                          name='address'
                          type='text'
                          className={
                            "form-control" +
                            (errors.address && touched.address
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='address'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='pocName'>
                          POC Name
                        </label>
                        <Field
                          name='pocName'
                          type='text'
                          className={
                            "form-control" +
                            (errors.pocName && touched.pocName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='pocName'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='accountEmail'>
                          Accounting Email
                        </label>
                        <Field
                          name='accountEmail'
                          type='email'
                          className={
                            "form-control" +
                            (errors.accountEmail && touched.accountEmail
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='accountEmail'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='accountContact'>
                          Accounting Contact Person
                        </label>
                        <Field
                          name='accountContact'
                          type='text'
                          className={
                            "form-control" +
                            (errors.accountContact && touched.accountContact
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='accountContact'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='escCompany'>
                          ESC Company
                        </label>
                        <Field
                          name='escCompany'
                          type='text'
                          className={
                            "form-control" +
                            (errors.escCompany && touched.escCompany
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='escCompany'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='escCompanyCostSheet'>
                          ESC Cost Sheet (.xlsx, .xls, .csv, .jpg, .png)
                        </label>
                        <Field
                          name='escCompanyCostSheet'
                          type='file'
                          accept='.xlsx, .xls, .csv,image/png, image/jpeg'
                          innerRef={files_ref_esc}
                          className={
                            "form-control" +
                            (errors.escCompanyCostSheet &&
                            touched.escCompanyCostSheet
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={warrentyChangeHandler}
                        />
                        <ErrorMessage
                          name='escCompanyCostSheet'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='gapCompany'>
                          GAP Company
                        </label>
                        <Field
                          name='gapCompany'
                          type='text'
                          className={
                            "form-control" +
                            (errors.gapCompany && touched.gapCompany
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='gapCompany'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='gapCostSheet'>
                          GAP Cost Sheet (.xlsx, .xls, .csv, .jpg, .png)
                        </label>
                        <Field
                          name='gapCostSheet'
                          type='file'
                          accept='.xlsx, .xls, .csv, image/png, image/jpeg'
                          innerRef={files_ref_gap}
                          className={
                            "form-control" +
                            (errors.gapCostSheet && touched.gapCostSheet
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={gapChangeHandler}
                        />
                        <ErrorMessage
                          name='gapCostSheet'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='otherProducts'>
                          Other Products
                        </label>
                        <Field
                          name='otherProducts'
                          type='textarea'
                          className={
                            "form-control" +
                            (errors.otherProducts && touched.otherProducts
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='otherProducts'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label
                          className='mb-1'
                          htmlFor='otherProductsCostSheet'
                        >
                          Other Cost Sheet (.xlsx, .xls, .csv, .jpg, .png)
                        </label>
                        <Field
                          name='otherProductsCostSheet'
                          type='file'
                          accept='.xlsx, .xls, .csv, image/png, image/jpeg'
                          innerRef={files_ref_other}
                          className={
                            "form-control" +
                            (errors.otherProductsCostSheet &&
                            touched.otherProductsCostSheet
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={otherProductsHandler}
                        />
                        <ErrorMessage
                          name='otherProductsCostSheet'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotDealer}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='dealerLogo'>
                          Logo (.jpg, .jpeg, .png)
                        </label>
                        <Field
                          name='dealerLogo'
                          type='file'
                          accept='image/png, image/jpeg'
                          innerRef={files_ref_logo}
                          className={
                            "form-control" +
                            (errors.dealerLogo && touched.dealerLogo
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={otherProductsHandler}
                        />
                        <ErrorMessage
                          name='dealerLogo'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1'>Deposit Type</label>
                        <div onChange={onChangeDepositType}>
                          <Field
                            as='select'
                            name='depositID'
                            className={`form-control`}
                          >
                            {depositData.map((deposit) => (
                              <option value={deposit.value}>
                                {deposit.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotBank}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='bankAccountNumber'>
                          Bank Account Number
                        </label>
                        <Field
                          id='bankAccountNumber'
                          name='bankAccountNumber'
                          type='text'
                          className={
                            "form-control" +
                            (errors.bankAccountNumber &&
                            touched.bankAccountNumber
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='bankAccountNumber'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotBank}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='bankRoutingNumber'>
                          Routing Number
                        </label>
                        <Field
                          id='bankRoutingNumber'
                          name='bankRoutingNumber'
                          type='text'
                          className={
                            "form-control" +
                            (errors.bankRoutingNumber &&
                            touched.bankRoutingNumber
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='bankRoutingNumber'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotBank}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='bankAddress'>
                          Bank Address
                        </label>
                        <Field
                          id='bankAddress'
                          name='bankAddress'
                          type='text'
                          className={
                            "form-control" +
                            (errors.bankAddress && touched.bankAddress
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='bankAddress'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotBank}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='bankAccountTitle'>
                          Bank Account Title
                        </label>
                        <Field
                          id='bankAccountTitle'
                          name='bankAccountTitle'
                          type='text'
                          className={
                            "form-control" +
                            (errors.bankAccountTitle && touched.bankAccountTitle
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='bankAccountTitle'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotBank}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='addressOnBankAccount'>
                          Address on Bank Account
                        </label>
                        <Field
                          id='addressOnBankAccount'
                          name='addressOnBankAccount'
                          type='text'
                          className={
                            "form-control" +
                            (errors.addressOnBankAccount &&
                            touched.addressOnBankAccount
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='addressOnBankAccount'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotCheque}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='mailingAddress'>
                          Mailing Address
                        </label>
                        <Field
                          id='mailingAddress'
                          name='mailingAddress'
                          type='text'
                          className={
                            "form-control" +
                            (errors.mailingAddress && touched.mailingAddress
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='mailingAddress'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div
                      className='col-md-6 mt-3'
                      hidden={isNotPresenter || isNotCrypto}
                    >
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='walletAddress'>
                          Wallet Address
                        </label>
                        <Field
                          id='walletAddress'
                          name='walletAddress'
                          type='text'
                          className={
                            "form-control" +
                            (errors.walletAddress && touched.walletAddress
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='walletAddress'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1'>Identity Type</label>
                        <div>
                          <select
                            className={`form-control`}
                            onChange={(e) => {
                              setIdentityType(e.target.value);
                            }}
                          >
                            {identityData.map((identity) => (
                              <option value={identity.value}>
                                {identity.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='socialSecurityNumber'>
                          Social Security Number
                        </label>
                        <Field
                          name='socialSecurityNumber'
                          type='text'
                          className={
                            "form-control" +
                            (errors.socialSecurityNumber &&
                            touched.socialSecurityNumber
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name='socialSecurityNumber'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='identityFrontSide'>
                          Identity Front Side (.jpg, jpeg, .png)
                        </label>
                        <Field
                          name='identityFrontSide'
                          type='file'
                          accept='image/png, image/jpeg'
                          innerRef={files_ref_front}
                          className={
                            "form-control" +
                            (errors.identityFrontSide &&
                            touched.identityFrontSide
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={identityFrontChangeHandler}
                        />
                        <ErrorMessage
                          name='identityFrontSide'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='identityBackSide'>
                          Identity Back Side (.jpg, jpeg, .png)
                        </label>
                        <Field
                          name='identityBackSide'
                          type='file'
                          accept='image/png, image/jpeg'
                          innerRef={files_ref_back}
                          className={
                            "form-control" +
                            (errors.identityBackSide && touched.identityBackSide
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={identityBackChangeHandler}
                        />
                        <ErrorMessage
                          name='identityBackSide'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <label className='mb-1' htmlFor='w9Form'>
                          Upload W-9 Form (.pdf is allowed)
                        </label>
                        <Field
                          name='w9Form'
                          type='file'
                          accept='application/pdf'
                          innerRef={files_ref_w9}
                          className={
                            "form-control" +
                            (errors.w9Form && touched.w9Form
                              ? " is-invalid"
                              : "")
                          }
                          //onChange={w9ChangeHandler}
                        />
                        <ErrorMessage
                          name='w9Form'
                          component='div'
                          className='invalid-feedback'
                        />
                      </div>
                    </div>

                    <div className='col-md-6 mt-3' hidden={isNotPresenter}>
                      <div className='form-group'>
                        <input
                          type='checkbox'
                          name='clTaxable'
                          defaultChecked
                          onChange={(e) => {
                            setAuthorizedSMS(e.target.value);
                          }}
                        />
                        <label className='mb-1'>
                          &nbsp;Allow platform to send SMS notifications?
                        </label>
                        <br />
                        <Field
                          type='checkbox'
                          name='termsAccepted'
                          defaultChecked
                          // onChange={ e=> {
                          //   setTermsAccepted(e.target.value);
                          // }}
                        />
                        <label>&nbsp;I Accept Terms & Conditions</label>
                      </div>
                    </div>

                    <div className='col-md-12 mt-4'>
                      <div className='form-group'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          disabled={isSubmitting}
                        >
                          Sign Up
                        </button>
                        {isSubmitting && (
                          <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
                        )}
                        <p className='forgot-password pull-right mt-2'>
                          Already registered? <Link to='/Login'>Sign In</Link>
                        </p>
                      </div>
                      {/* <button type="button" className="btn btn-primary btn-block" onClick={RegisterUser}>Sign Up</button> */}
                    </div>
                  </div>
                  {status && (
                    <div className={"alert alert-danger"}>{status}</div>
                  )}
                </Form>
              )}
            />
          </div>
        </div>
        <div className='w-full h-[48rem]'>
          <div
            id='carouselExampleCaptions'
            class='carousel slide relative'
            data-bs-ride='carousel'
          >
            <div class='carousel-inner relative w-full overflow-hidden '>
              <div
                class={`carousel-item relative  w-full ${
                  isSlideActive ? "active" : ""
                }`}
              >
                <img
                  src='/assets/Group 498.png'
                  class='block w-full h-[48rem]'
                  alt='...'
                />
                <div class='h-full flex flex-col justify-center carousel-caption  absolute !text-left'>
                  <h5 class='text-[3.1rem] mb-3'>Dealer (Benefits)</h5>
                  <p className='text-[1.5rem]'>
                    In today’s marketplace, it is a challenge to meet the
                    expectations for compensation and benefits from the most
                    talented candidates. However, our platform allows you to
                    only pay out commission once profit is generated.
                    <br />
                    <br /> Sign up today!
                  </p>
                </div>
              </div>
              <div
                class={`carousel-item relative float-left w-full ${
                  !isSlideActive ? "active" : ""
                }`}
              >
                <img
                  src='/assets/Group 499.png'
                  class='block w-full h-[48rem]'
                  alt='...'
                />
                <div class='h-full flex flex-col justify-center carousel-caption absolute !text-left'>
                  <h5 class='text-[3.1rem] mb-3'>Presenter’s Benefit</h5>
                  <p className='text-[1.5rem]'>
                    No more dealing with crabby office ladies, no more getting
                    harped on about your paperwork, all you have to do is sell
                    and close.
                    <br />
                    <br /> Sign up today!
                  </p>
                </div>
              </div>
            </div>
            {/* <button
              class='carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0'
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide='prev'
              onClick={() => setIsSlideActive((prevState) => !prevState)}
            >
              <span
                class='carousel-control-prev-icon inline-block bg-no-repeat'
                aria-hidden='true'
              ></span>
              <span class='visually-hidden'>Previous</span>
            </button>
            <button
              class='carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0'
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide='next'
              onClick={() => setIsSlideActive((prevState) => !prevState)}
            >
              <span
                class='carousel-control-next-icon inline-block bg-no-repeat'
                aria-hidden='true'
              ></span>
              <span class='visually-hidden'>Next</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
