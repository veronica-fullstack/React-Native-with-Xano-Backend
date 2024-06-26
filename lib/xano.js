import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const xanoConfig = {
  endpoint: "https://x8ki-letl-twmt.n7.xano.io/api:-_Vqip5t"
}; 
const TOKEN_KEY = 'jwt-aora';
// Register user
export const createUser = async (email, password, username) => {
  try {

    const newAccount = await axios.post( xanoConfig.endpoint + "/auth/signup", { email, password, username}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }); 

    if (!newAccount) throw Error;

    // to do avatar, accountId
    //const avatarUrl = getInitials(username);
  
    await signIn(email, password);

    return newAccount;

  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    return {error: true, message: error.response.data.message}
  }
}

// Sign In
export const signIn = async(email, password) => {
  try {
 
   const result = await axios.post(xanoConfig.endpoint  + "/auth/login", {email,password}, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.authToken}`;

    await SecureStore.setItemAsync(TOKEN_KEY, result.data.authToken);
     //console.log("TOKEN",result.data.authToken);
    return result;
  } catch (error) { 
    console.log(JSON.stringify(error));
    return {error: true, message: error.response.data.message}
  }
}

// Sign Out
export async function signOut() {
  try {

    axios.defaults.headers.common['Authorization'] = '';

    await SecureStore.deleteItemAsync(TOKEN_KEY);

    return result;
  } catch (error) { 
   // console.log(JSON.stringify(error.response.data));
    return {error: true, message: error.response.data.message}
  }
}

// Get Current User
export async function getCurrentUser() {
  try {

    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    //console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const currentAccount = await axios.get( xanoConfig.endpoint + "/auth/me", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });  
    
    if (!currentAccount) throw Error;
      
     return currentAccount.data;
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    //return {error: true, message: error.response.data.message}
    return null;
  }
}

// Get all video Posts
export async function getAllPosts() {
  
}

export function getInitials(username) {
    
        const nameArr = username.split('');
    
        let initials = nameArr.filter(function(char) {
    
            return /[A-Z]/.test(char);
    
        })
    
        return initials.join('')
    
}
    