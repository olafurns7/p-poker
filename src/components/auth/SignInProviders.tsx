import { Button, Grid, Text, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

import { loginWithGoogle } from "functions/firebase";

const SignInProviders = () => {
  const toast = useToast();

  const handleLoginWithGoogle = () => {
    loginWithGoogle(toast);
  };

  // const handleLoginWithGithub = () => {
  //   loginWithGithub(toast);
  // };

  useEffect(() => {
    return () => {
      toast.closeAll();
    };
  }, []);

  return (
    <Grid gap={2} textAlign="center">
      <Text>Sign In with:</Text>

      <Button
        leftIcon={<FcGoogle />}
        onClick={handleLoginWithGoogle}
        _hover={{ bgGradient: "linear(to-r, blue.100, cyan.100)" }}
      >
        Google
      </Button>
      {/* <Button leftIcon={<FaGithub />} onClick={handleLoginWithGithub}>
        Github
      </Button> */}
    </Grid>
  );
};

export default SignInProviders;