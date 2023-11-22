import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";

function Example() {
  // 用 Yup (JS的對象模式驗證器)創建了一個 validationSchema 對象，該對象定義了各種欄位
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });

  //yupResolver將Yup驗證規則與react-hook-form 進行整合
  const formOptions = { resolver: yupResolver(validationSchema) };

  // 呼叫了 useForm hook，用來創建和管理表單(用來控制表單的行為).將先前定義的 formOptions 傳遞給它
  const { register, handleSubmit, reset, formState, setValue } =
    useForm(formOptions);
  // formState 中，errors 是一個對象 包含了表單當前的所有錯誤訊息
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    toast("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  // JSON.stringify(data, null, 4))＝>將data轉為字串
  // replacer（null）：控制如何將值轉換為字符串。如果是 null，
  // 那就表示所有的屬性都需要被包含在最終的 JSON 字符串中。
  // space（ 4）：控制結果的縮進

  // 列印
  const componentRef = useRef();

  return (
    <div className="card m-3">
      <ToastContainer />
      {/* 列印 */}
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-secondary">Print / Download</button>
        )}
        content={() => componentRef.current}
      />
      <h5 className="card-header">
        React Hook Form 7 - Form Validation Example
      </h5>
      {/* 列印範圍 */}
      <div ref={componentRef} className="p-5">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col">
                <label>Title</label>
                <select
                  name="title"
                  // register()函數，讓 React Hook Form 可以追蹤和驗證它的值
                  {...register("title")}
                  // 若 errors 對象中存在 title 錯誤，則添加 "is-invalid" 類名，
                  // 否則類名為空。"form-control" 是 Bootstrap 的樣式
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                >
                  <option value=""></option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                </select>
                {/*  用於顯示錯誤訊息。如果 errors 對象中有 title 的錯誤訊息，則顯示該訊息。
              "invalid-feedback" 是 Bootstrap 的樣式，用於顯示錯誤訊息。 */}
                <div className="invalid-feedback">{errors.title?.message}</div>
              </div>
              <div className="form-group col-5">
                <label>First Name</label>
                <input
                  name="firstName"
                  type="text"
                  {...register("firstName")}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.firstName?.message}
                </div>
              </div>
              <div className="form-group col-5">
                <label>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  {...register("lastName")}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.lastName?.message}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  {...register("dob")}
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.dob?.message}</div>
              </div>
              <div className="form-group col">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <div className="form-group col">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </div>
            </div>
            <div className="form-group form-check">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
                className={`form-check-input ${
                  errors.acceptTerms ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                Accept Terms & Conditions
              </label>
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-1">
                Register
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Example;
