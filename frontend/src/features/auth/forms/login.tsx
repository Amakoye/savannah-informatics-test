import Stack, { StackProps } from "@mui/material/Stack";
import { RHFTextField } from "components/hook-form";
import RHFPasswordField from "components/hook-form/RHFPasswordField";
// import { MIN_PASSWORD_LEN } from "utils/constants";
import * as yup from "yup";

const LoginForm: FunctionComponent<LoginFormProps> = ({
  children,
  ...props
}) => {
  return (
    <Stack spacing={2} {...props}>
      <RHFTextField
        name="email"
        label="Email"
        autoComplete="email"
        autoCapitalize="off"
        type="email"
      />
      <RHFPasswordField name="password" label="Password" />
      {children}
    </Stack>
  );
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  // .min(
  //   MIN_PASSWORD_LEN,
  //   ({ min }) => `Password must be atleast ${min} characters`
  // ),
});

const loginFormValues: LoginFormValues = {
  email: "",
  password: "",
};

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  children?: React.ReactNode;
} & StackProps;

export { LoginForm, loginFormSchema, loginFormValues };
export type { LoginFormProps, LoginFormValues };
