
export const xanoConfig = {
    API_BASE_URL: 'https://x8ki-letl-twmt.n7.xano.io/api:-_Vqip5t'
    //auth/login POST
    //auth/me GET
}
 

export const createUser = async (email,password,username) => {
    try {
        
        const response = await fetch(xanoConfig.API_BASE_URL + "/auth/signup", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
          })
          if(!response) {
            throw Error;
          }
            
          const { authToken } = await response.json();
          const avatarUrl = getInitials(username);
          
          await signIn();
        //   setVariable({ 
        //     key: "AUTH_TOKEN",
        //     value: `Bearer ${authToken}`
        //   });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
   
};

export async function signIn(email,password) {
    try {
        const response = await fetch(xanoConfig.API_BASE_URL + "/auth/login", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
          });
            
          const { authToken } = await response.json();
          
          setVariable({ 
            key: "AUTH_TOKEN",
            value: `Bearer ${authToken}`
          });

    } catch (error) {
        throw new Error(error);
    }
   
};

export function getInitials(username) {
    
        const nameArr = username.split('');
    
        let initials = nameArr.filter(function(char) {
    
            return /[A-Z]/.test(char);
    
        })
    
        return initials.join('')
    
}
    