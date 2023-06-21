import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from '~/lib/services/firebase/auth/common';
import { showErrorToast } from '~/lib/services/firebase/utils';

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

export const loginWithGoogle = async () => {
  signInWithPopup(auth, googleProvider).catch((err) => showErrorToast(err));
};

export const loginWithGithub = async () => {
  signInWithPopup(auth, githubProvider).catch((err) => showErrorToast(err));
};
