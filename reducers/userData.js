export default function userData(userData = {}, action) {
  let updatedUserData = {};

  switch (action.type) {
    case "REQUEST":
      console.log("REQUEST");
      if(action.payload.name === "RequestError"){
        console.log("Error getting data");
      }
      return userData;
    case "LOGIN_SUCCESS":
      console.log("SUCCESS");
      console.log(action.payload);
      return userData;
    case "FAILURE":
      console.log("LOGIN_FAILURE");
      console.log(action.payload);
      return userData;
    
    default:
      return userData;
  }
}