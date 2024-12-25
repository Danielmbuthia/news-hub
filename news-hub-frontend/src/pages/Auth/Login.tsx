import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginAPIService } from "../../services/UserApiService";
import UserContext from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Please enter valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
type SchemaProps = z.infer<typeof schema>;

export default function Login() {
  const user = useContext(UserContext);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SchemaProps>({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (formData: SchemaProps) => {
    try {
      await loginAPIService(formData);
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
        <h2 className="text-4xl mb-7 text-center">Login Form</h2>
        <div>
          <div>
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
          </div>
          {formError !== "" && (
            <em className="text-red-600 text-base italic">{formError}</em>
          )}
        </div>
        <button className="h-10 w-full mt-6 mb-2 bg-blue-700 text-white rounded-full cursor-pointer disabled:cursor-default disabled:bg-gray-700">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
