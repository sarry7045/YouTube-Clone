import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type formValues = {
  username: string;
  email: string;
  channel: string;
};

const ReactHookForm = () => {
  const form = useForm<formValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitForm = (data: formValues) => {
    console.log("Form Details", data);
  };
  renderCount++;
  return (
    <div>
      <h4> Render Count ({renderCount / 2})</h4>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username Required" })}
        />
        <p style={{ color: "red" }}> {errors?.username.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid Email Format",
            },
            validate: {
              notAdmin: (fieldVlaue) => {
                return (
                  fieldVlaue !== "admin@example.com" ||
                  "Enter a Diffrent Email Address"
                );
              },
              notBlackListed: (fieldVlaue) => {
                return (
                  !fieldVlaue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p style={{ color: "red" }}> {errors?.email.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is Required" },
          })}
        />
        <p style={{ color: "red" }}> {errors?.channel.message}</p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ReactHookForm;
