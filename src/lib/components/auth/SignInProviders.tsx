import { Button, Grid, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import {
  loginWithGoogle,
  loginWithGithub,
} from '~/lib/services/firebase/auth/login/google';

const SignInProviders = () => {
  const toast = useToast();

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
  };

  const handleLoginWithGithub = async () => {
    await loginWithGithub();
  };

  useEffect(() => {
    return () => {
      toast.closeAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid gap={2} textAlign="center">
      <Text>Sign In with:</Text>

      <Button
        leftIcon={<FcGoogle />}
        onClick={handleLoginWithGoogle}
        _hover={{ bgGradient: 'linear(to-r, blue.100, cyan.100)' }}
      >
        Google
      </Button>
      <Button
        leftIcon={<AiFillGithub />}
        onClick={handleLoginWithGithub}
        _hover={{ bgGradient: 'linear(to-r, blue.100, cyan.100)' }}
      >
        Github
      </Button>
    </Grid>
  );
};

export default SignInProviders;
