import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isRejected } from "@reduxjs/toolkit";
import { FormProvider } from "components/hook-form";
import NextLink from "components/NextLink";
import Page from "components/Page";
import {
  RegisterForm,
  registerFormSchema,
  registerFormValues,
} from "features/auth/forms/register";
import { authUrls } from "features/auth/urls";
import useForm from "hooks/useForm";
import useNotifications from "hooks/useNotifications";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { useDispatch } from "store";
import { reduxRegisterUser } from "store/actions/auth";

const RegisterPage: NextPageWithLayout = () => {
  /**
   * This function retrieves the dispatch function from the Redux store, the replace and query functions from the Next.js router,
   * and the enqueueSnackbar function from the useNotifications hook.
   * @returns An object containing the dispatch, replace, and query functions, as well as the enqueueSnackbar function.
   */
  const dispatch = useDispatch();
  const { replace, query } = useRouter();
  const { enqueueSnackbar } = useNotifications();

  const nextUrl = (query.next as string) || "/auth/login/";

  const methods = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: registerFormValues,
  });

  /**
   * Handles the submission of the login form by dispatching a redux action to log in the user.
   * @param {function} methods - The useForm hook's handleSubmit function.
   * @returns None
   */
  const onSubmit = methods.handleSubmit(({ ...data }) => {
    return dispatch(reduxRegisterUser(data as any)).then((response) => {
      if (isRejected(response)) {
        enqueueSnackbar("Failed to register. Please try again", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Account created succesfully", {
          variant: "success",
        });
        replace(nextUrl);
      }
    });
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <RegisterForm spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <Typography variant="body2" component="div">
            <NextLink
              href={authUrls.login()}
              fontFamily="publicSans"
              fontWeight={500}
              color="primary.main"
            >
              Already have an account? Sign in
            </NextLink>
          </Typography>
        </Stack>

        <LoadingButton
          variant="contained"
          size="large"
          loading={methods.formState.isSubmitting}
          type="submit"
        >
          Sign up
        </LoadingButton>
      </RegisterForm>
    </FormProvider>
  );
};

RegisterPage.getLayout = (page) => (
  <Page title="Sign up" disableTitle disableContainer>
    <AuthLayout title="Sign up to Savannah-Info">{page}</AuthLayout>
  </Page>
);

export default RegisterPage;
