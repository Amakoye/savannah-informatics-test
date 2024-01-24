import Stack, { StackProps } from "@mui/material/Stack";
import { RHFTextField } from "components/hook-form";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
// import { MIN_PASSWORD_LEN } from "utils/constants";
import * as yup from "yup";

const RegisterForm: FunctionComponent<RegisterFormProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack spacing={2} {...props}>
      <RHFTextField
        name="name"
        label="Name"
        autoComplete="name"
        autoCapitalize="off"
        type="text"
      />
      <RHFTextField
        name="username"
        label="Username"
        autoComplete="username"
        autoCapitalize="off"
        type="username"
      />
      <RHFTextField
        name="email"
        label="Email"
        autoComplete="email"
        autoCapitalize="off"
        type="email"
      />
      <RHFPasswordField name="password" label="Password" />
      <RHFPasswordField name="re_password" label="Confirm Password" />
      {children}
    </Stack>
  );
};

const registerFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup.string().required("Password is required"),
});

const registerFormValues: RegisterFormValues = {
  username: "",
  password: "",
  email: "",
  re_password: "",
  name: "",
};

type RegisterFormValues = {
  name: string;
  username: string;
  password: string;
  email: string;
  re_password: string;
};

type RegisterFormProps = {
  children?: React.ReactNode;
} & StackProps;

export { RegisterForm, registerFormSchema, registerFormValues };
export type { RegisterFormProps, RegisterFormValues };
