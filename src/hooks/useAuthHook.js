function signIn(data) {
  const currentUser = userList.find((user) => user.email === data.email);

  if (!currentUser) {
    toast.error("Email does not exist. Try again or sign up instead!");
    return;
  }

  if (currentUser.password === data.password) {
    setLoggedIn(true);
    setCurrUser(currentUser);

    toast.success("Sign In Successful!");

    // Store user information in localStorage
    window.localStorage.setItem("token", true);
    window.localStorage.setItem("index", JSON.stringify(currentUser));
    return true;
  } else {
    toast.error("Incorrect Email/Password. Please try again.");
    return false; // Indicate that the sign-in failed
  }
}

async function signUp(data) {
  const index = userList.findIndex((user) => user.email === data.email);
  if (index === -1) {
    const docRef = await addDoc(collection(db, "Users"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
    });
    toast.success("New user Created, Please LogIn to Continue !!");
    return true;
  } else {
    toast.error("Email Address already exist, Try Again or SignIn Instead!!!");
    return false;
  }
}

function logOut() {
  setLoggedIn(false);
  setCurrUser(null);
  localStorage.clear();
  toast.success("Log Out Successfully!!!!");
}
