import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpAPIService } from "../../services/UserApiService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";

const schema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name should be at least 3 characters." }),
    last_name: z
      .string()
      .min(3, { message: "Last name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Confirm Password does not match Password.",
    path: ["password_confirmation"],
  });
type SchemaProps = z.infer<typeof schema>;

const Register = () => {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SchemaProps>({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (formData: SchemaProps) => {
    try {
      await signUpAPIService(formData);
      window.location.href = "/";
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <section className="flex items-center justify-center rounded-md">
      <form
        className="py-8 px-12 bg-slate-500 mt-8"
        onSubmit={handleSubmit(onsubmit)}
      >
        <h2 className="text-4xl mb-7 text-center">SignUp Form</h2>
        <div>
          <div>
            <div className="flex flex-col mb-5">
              <label htmlFor="name" className="text-base font-semibold mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("first_name")}
                placeholder="Enter your first name"
              />
              {errors.first_name && (
                <em className="text-red-600 text-base italic">
                  {errors.first_name?.message}
                </em>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="name" className="text-base font-semibold mb-1">
                Last Name
              </label>
              <input
                type="text"
                {...register("last_name")}
                placeholder="Enter your last name"
              />
              {errors.last_name && (
                <em className="text-red-600 text-base italic">
                  {errors.last_name?.message}
                </em>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="text-base font-semibold mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter your email"
              />
              {errors.email && (
                <em className="text-red-600 text-base italic">
                  {errors.email?.message}
                </em>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="password"
                className="text-base font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
              />
              {errors.password && (
                <em className="text-red-600 text-base italic">
                  {errors.password?.message}
                </em>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="confirm_password"
                className="text-base font-semibold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                {...register("password_confirmation")}
                placeholder="Confirm password"
              />
              {errors.password_confirmation && (
                <em className="text-red-600 text-base italic">
                  {errors.password_confirmation?.message}
                </em>
              )}
            </div>
          </div>
          {formError !== "" && (
            <em className="text-red-600 text-base italic">{formError}</em>
          )}
        </div>
        <button className="h-10 w-full mt-6 mb-2 bg-blue-700 text-white rounded-full cursor-pointer disabled:cursor-default disabled:bg-gray-700">
          signUp
        </button>
      </form>
    </section>
  );
};

export default Register;
